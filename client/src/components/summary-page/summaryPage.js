import React, {Component} from "react";
import {connect} from "react-redux";
import {MapComponent} from './map';
import Modal from '../modal/modal';
import SummaryEvent from "./summaryEvent";
import SummaryButtons from "./summaryButtons";
import {reloadFinalPlan, giveNavPath} from "../../actions";
import "./summaryPage.css";

class Summary extends Component{
    constructor(props) {
        super(props);

        this.state = {
            displayModal: false,
        };

        this.eventLoc = {lat: null, long: null, name: null, address: []};
        this.foodLoc = {lat: null, long: null, name: null, address: []};
        this.drinkLoc = {lat: null, long: null, name: null, address: []};

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentWillMount(){
        this.props.giveNavPath(this.props.match.path);
        const sessionLoaded = sessionStorage.getItem("loadedResults");
        if (JSON.parse(sessionLoaded)) {
            if (Object.keys(this.props.event).length !== 0){
                return;
            } else {
                const sessionFinalPlan = sessionStorage.getItem("finalPlan");
                const sessionDateResults = JSON.parse(sessionFinalPlan);
                this.props.reloadFinalPlan(sessionDateResults);
            }
        } else if(this.props.auth) {
            this.props.history.push(`/location-page/`);
        } else {
            this.props.history.push(`/`);
        }
    }

    openModal(){
        this.setState ({
            displayModal: true,
        })
    }

    closeModal(){
        this.setState({
            displayModal: false,
        })
    }

    initialMapCenterLatitude(){
        this.eventLoc.lat = this.props.event.business_id ? this.props.event.latitude : this.props.event.coordinates.latitude;
        this.foodLoc.lat = this.props.food.business_id ? this.props.food.latitude : this.props.food.coordinates.latitude;
        this.drinkLoc.lat = this.props.drinks.business_id ? this.props.drinks.latitude : this.props.drinks.coordinates.latitude;
        return ((this.eventLoc.lat + this.foodLoc.lat + this.drinkLoc.lat)/3);
    }
    initialMapCenterLongitude(){
        this.eventLoc.long = this.props.event.business_id ? this.props.event.longitude : this.props.event.coordinates.longitude;
        this.foodLoc.long = this.props.food.business_id ? this.props.food.longitude : this.props.food.coordinates.longitude;
        this.drinkLoc.long = this.props.drinks.business_id ? this.props.drinks.longitude : this.props.drinks.coordinates.longitude;
        return ((this.eventLoc.long + this.foodLoc.long + this.drinkLoc.long)/3);
    }
    calculateDistance(lat, long, midpoint1, midpoint2){
        const p = 0.017453292519943295;    // Math.PI / 180
        const c = Math.cos;
        const a = 0.5 - c((midpoint1 - lat) * p) / 2 +
            c(lat * p) * c(midpoint1 * p) *
            (1 - c((midpoint2 - long) * p)) / 2;
        return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km;
    }



    determineMapZoom() {
        let zoom = null;
        let distance = null;
        let midpointOne = null;
        let midpointTwo = null;

        //formula to calculate the midpoint of all three points
        midpointOne = ((this.eventLoc.lat + this.foodLoc.lat + this.drinkLoc.lat) / 3);
        midpointTwo = ((this.eventLoc.long + this.foodLoc.long + this.drinkLoc.long) / 3);

        //calculates the distance (in km) between the midpoint and each of the three locations on the map and determines which is the greatest distance
        let foodDistance = this.calculateDistance(this.foodLoc.lat, this.foodLoc.long, midpointOne, midpointTwo);
        let greatestDistance = foodDistance;

        let eventDistance = this.calculateDistance(this.eventLoc.lat, this.eventLoc.long, midpointOne, midpointTwo);

        if(greatestDistance < eventDistance){
            greatestDistance = eventDistance;
        }
        let drinkDistance = this.calculateDistance(this.drinkLoc.lat, this.drinkLoc.long, midpointOne, midpointTwo);

        if(greatestDistance < drinkDistance){
            greatestDistance = drinkDistance;
        }
        //calculates the value of the initial zoom on the map based on the greatest distance in (km).
        if(greatestDistance < 3){
            zoom = 13;
        }
        else if(greatestDistance >= 3 && greatestDistance <= 10){
            zoom = 10.85;
        }
        else if(greatestDistance > 10 && greatestDistance <= 20){
            zoom = 10.5;
        }
        else if(greatestDistance > 20 && greatestDistance <= 30){
            zoom = 9.25;
        }
        else if(greatestDistance > 30 && greatestDistance <=45){
            zoom = 9;
        }
        else{
            zoom = 8;
        }
        return zoom;
    }

    render() {
        console.log("props are: ", this.props);
        if (Object.keys(this.props.event).length === 0 || Object.keys(this.props.food).length === 0 || Object.keys(this.props.drinks).length === 0) {
            return(
                <div className="grey lighten-4"/>
            )
        }
        const latitude = this.initialMapCenterLatitude();
        const longitude = this.initialMapCenterLongitude();
        const initialZoom = this.determineMapZoom();
        this.eventLoc.address = this.props.event.location.display_address;
        this.foodLoc.address = this.props.food.location.display_address;
        this.drinkLoc.address = this.props.drinks.location.display_address;

        return (
                <div className="grey lighten-4">
                    <div className='row'>
                        <div className="col s12 m10 offset-m1 l6 offset-l3">
                            <SummaryEvent eventType="Event" eventName={this.props.event.name} location = {this.props.event.location.display_address}/>
                            <SummaryEvent eventType="Food" eventName={this.props.food.name} location={this.props.food.location.display_address}/>
                            <SummaryEvent eventType="Drinks" eventName={this.props.drinks.name} location={this.props.drinks.location.display_address}/>
                        </div>
                        <div className="col s12 m10 offset-m1 l6 offset-l3 nav-contain">
                            <MapComponent
                                eventLoc={this.eventLoc}
                                foodLoc={this.foodLoc}
                                drinkLoc={this.drinkLoc}
                                foodName = {this.props.food.name}
                                drinkName={this.props.drinks.name}
                                evtName = {this.props.event.name}
                                initialLat={latitude}
                                initialLong={longitude}
                                mapZoom={initialZoom}
                            />

                        </div>

                    </div>
                        <SummaryButtons openModal={this.openModal}/>
                        <Modal display={this.state.displayModal} closeModal={this.closeModal} type="confirm" message="Are You Sure You Want To Start Over?"/>
                </div>
        );
    }
}
function mapStateToProps(state){
    return {
        event: state.datePlan.mainEvent,
        food: state.datePlan.mainFood,
        drinks: state.datePlan.mainDrinks
    }
}

export default connect(mapStateToProps, {reloadFinalPlan, giveNavPath})(Summary);