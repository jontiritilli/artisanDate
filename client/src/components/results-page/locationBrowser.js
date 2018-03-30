import React, {Component} from 'react';
import "./carousel.css"
import"./resultsPage.css"
import {connect} from "react-redux";
import Body from './resultBody';
import {locationDetails, getIndividual} from "../../actions";
import {Carousel} from "react-responsive-carousel";


class LocationBrowser extends Component {
    constructor(props){
        super(props);

        this.index = 0;
        this.locationId = "";
        this.details = {};
        this.updateLocation = this.updateLocation.bind(this);
        this.goToDetails = this.goToDetails.bind(this);
    }
  
    componentWillReceiveProps(nextProps){
        // console.log("in location browser", this.props);
        if(!this.props.initial.complete){
            this.updateLocation(0, nextProps.locations);
            this.props.initial[nextProps.name] = true;

            if(this.props.initial.events && this.props.initial.food && this.props.initial.drinks){
                this.props.initial.complete = true;
            }
        }
    }

    updateLocation(index, locations){
        if(this.props.locations.length === 0){
            this.locationId = locations[index].id;
            this.props.locationDetails(locations[index], this.props.name);
            return;
        }
        this.index = index;
        this.locationId = this.props.locations[index].id;
        this.details = this.props.locations[index];
        this.props.locationDetails(this.details, this.props.name);
        console.log("updating", this.props);
        if (this.props.mainDrinks !== undefined) {
            this.props.updateUrl();
        }
    }

    goToDetails(){
        if (this.details.business_id){
            let type = "events";
            this.props.history.push(`/details-page/${type}/${this.locationId}`);
        } else {
            let type = "businesses";
            this.props.history.push(`/details-page/${type}/${this.locationId}`);
        }
    }


    render() {
        const { locations, name, locName } = this.props;


        if(!locations.length){
            return (
                <div className="row">
                    <div className="col s12 content-list">
                        <div className="card">
                            <div className="card-content center-align">
                                <div style={{height: "165.39px", position: "relative"}}>
                                    <div className="loading-center">
                                        <div className="data-loading"/>
                                    </div>
                                </div>
                            </div>
                            <div className="card-action">
                                <div className="row valign-wrapper bottom-pad">
                                    <div className="col s3 offset-s7 center-align">
                                        <div style={{height: "21px"}}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        console.log("Locations name: ", locName, "locations URL: ", locations[this.index].id);
        while (locName !== locations[this.index].id){
            this.index++;
        }
        const result = locations.map((item, index) => {
            const {image_url, name, location, display_phone, id} = item;
            return (
                <Body key={index} name={name} image={image_url} address={location} phone={display_phone} id={id}/>
            )
        });

// console.log("finished", this.index)
        return (
            <div className="row valign-wrapper">
                <div className="col s12 content-list">
                    <div className="card">
                        <div className="card-content no-pad">
                            <div className="row">
                                <div className="col s12">
                                    <span className="card-title my-8">{name}</span>
                                    <Carousel showThumbs={false}
                                              selectedItem={this.index}
                                              showStatus={false}
                                              showArrows={true}
                                              infiniteLoop={true}
                                              showIndicators={false}
                                              swipeScrollTolerance={20}
                                              onChange={this.updateLocation}>
                                        {result}
                                    </Carousel>
                                </div>
                            </div>
                        </div>
                        <div className="card-action">
                            <div className="row valign-wrapper bottom-pad">
                                <div className="col s3 offset-s7 center-align">
                                    <button onClick={this.goToDetails} className='btn thin-btn cyan'>Details</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
function mapStateToProps(state){
    return {
        mainEvent: state.datePlan.mainEvent,
        mainFood: state.datePlan.mainFood,
        mainDrinks: state.datePlan.mainDrinks
    }
}

export default connect(mapStateToProps, {locationDetails})(LocationBrowser);