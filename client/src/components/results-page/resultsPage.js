import React, {Component} from 'react';
import {connect} from "react-redux";
import "./resultsPage.css"
import { getPlanner, locationDetails, reloadPlanner, giveNavPath } from "../../actions";
import { Link } from 'react-router-dom';
import LocationBrowser from "./locationBrowser";
import types from "../../actions/types";


class ResultsPage extends Component {
    constructor(props){
        super(props);

        this.url = {
            main: "",
            event: "",
            food: "",
            drinks: ""
        };
        this.initialUpdate = {
            events: false,
            food: false,
            drinks: false,
            complete: false
        };

        this.updateUrl = this.updateUrl.bind(this);
    }

    componentDidMount(){
        this.props.giveNavPath(this.props.match.path);
        const sessionLoaded = sessionStorage.getItem("loadedResults");
        if (JSON.parse(sessionLoaded)) {
            const sessionEvents = sessionStorage.getItem("eventsResults");
            const sessionFood = sessionStorage.getItem("foodResults");
            const sessionDrinks = sessionStorage.getItem("drinksResults");

            const sessionDateResults = {
                data: {
                    reloadEvents: JSON.parse(sessionEvents),
                    reloadFood: JSON.parse(sessionFood),
                    reloadDrinks: JSON.parse(sessionDrinks)
                }
            };
            this.props.reloadPlanner(sessionDateResults);
        } else {
            this.props.getPlanner(this.props.match.params).then(() => {
                sessionStorage.setItem("eventsResults", JSON.stringify(this.props.events));
                sessionStorage.setItem("foodResults", JSON.stringify(this.props.food));
                sessionStorage.setItem("drinksResults", JSON.stringify(this.props.drinks));
                sessionStorage.setItem("loadedResults", JSON.stringify(this.props.dataLoaded));
            }).catch(() => {
                console.log("there was an error connecting to the server");
            });
        }
    }
  
    goToSummary(){
        const finalPlan = {
            event: this.props.mainEvent,
            food: this.props.mainFood,
            drinks: this.props.mainDrinks
        };
        sessionStorage.setItem("finalPlan", JSON.stringify(finalPlan));
        this.props.history.push(`/summary-page`);
    }

    updateUrl(locationId, eventType){
        const {zip} = this.props.match.params;
        this.changeUrl(locationId, eventType);
        const event = this.url.event ? this.url.event : this.props.match.params.events;
        const food = this.url.food ? this.url.food : this.props.match.params.food;
        const drinks = this.url.drinks ? this.url.drinks : this.props.match.params.drinks;
        this.url.main = `/results-page/${zip}/${event}/${food}/${drinks}`;

        window.history.replaceState("", "", this.url.main);
    }

    changeUrl(locationId, typeString){
        switch (typeString){
            case "Events":
                this.url.event = locationId;
                break;
            case "Food":
                this.url.food = locationId;
                break;
            case "Drinks":
                this.url.drinks = locationId;
                break;
            default:
                break;
        }
    }

    render() {
        console.log('props in results page:', this.props);
        const { history } = this.props;

        return (
            <div className="grey lighten-4">
                <div className="active-area">
                    <LocationBrowser initial={this.initialUpdate}
                                     name="Events"
                                     history={history}
                                     locations={this.props.events}
                                     locName={this.props.match.params.events}
                                     updateUrl={this.updateUrl}
                    />
                    <Link to={this.props.mainEvent.business_id ? `/details-page/events/${this.props.mainEvent.id}` : `/details-page/businesses/${this.props.mainEvent.id}`} className='btn thin-btn cyan'>Details</Link>
                    <LocationBrowser initial={this.initialUpdate}
                                     name="Food"
                                     history={history}
                                     locations={this.props.food}
                                     locName={this.props.match.params.food}
                                     updateUrl={this.updateUrl}
                    />
                    <Link to={`/details-page/businesses/${this.props.mainFood.id}`} className='btn thin-btn cyan'>Details</Link>
                    <LocationBrowser initial={this.initialUpdate}
                                     name="Drinks"
                                     history={history}
                                     locations={this.props.drinks}
                                     locName={this.props.match.params.drinks}
                                     updateUrl={this.updateUrl}
                    />
                    <Link to={`/details-page/businesses/${this.props.mainDrinks.id}`} className='btn thin-btn cyan'>Details</Link>
                    <div className="center-align">
                        <button onClick={this.goToSummary.bind(this)} className='btn cyan my-8'>Next</button>
                    </div>
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
        dataLoaded: state.dateResults.receivedData,
        mainEvent: state.datePlan.mainEvent,
        mainFood: state.datePlan.mainFood,
        mainDrinks: state.datePlan.mainDrinks
    }
}

export default connect(mapStateToProps, {getPlanner, reloadPlanner, locationDetails, giveNavPath})(ResultsPage);