import React, {Component} from 'react';
import {connect} from "react-redux";
import"./resultsPage.css"
import { getPlanner, locationDetails } from "../../actions";
import { Link } from 'react-router-dom';
import LocationBrowser from "./locationBrowser";


class ResultsPage extends Component {
    constructor(props){
        super(props);

        this.initialUpdate = {
            events: false,
            food: false,
            drinks: false,
            complete: false
        };
    }

    componentDidMount(){
        this.props.getPlanner(this.props.match.params);
    }
  
    goToSummary(){
        // const finalPlan = {
        //     event: this.props.mainEvent,
        //     food: this.props.mainFood,
        //     drinks: this.props.mainDrinks
        // };
        console.log("CONFIRM CLICK props: ", this.props);
        this.props.history.push(`/summary-page`);
    }

    render() {
        const { history } = this.props;

        return (
            <div>
                <LocationBrowser initial={this.initialUpdate} name="events" history={history} locations={this.props.events}/>
                <LocationBrowser initial={this.initialUpdate} name="food" history={history} locations={this.props.food}/>
                <LocationBrowser initial={this.initialUpdate} name="drinks" history={history} locations={this.props.drinks}/>
                <div className="center-align location-info-group">
                    <button onClick={this.goToSummary.bind(this)} className='btn'>Next</button>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        events: state.dateResults.events,
        food: state.dateResults.food,
        drinks: state.dateResults.drinks,
        mainEvent: state.datePlan.mainEvent,
        mainFood: state.datePlan.mainFood,
        mainDrinks: state.datePlan.mainDrinks
    }
}

export default connect(mapStateToProps, {getPlanner, locationDetails})(ResultsPage);