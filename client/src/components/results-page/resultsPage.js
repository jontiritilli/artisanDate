import React, {Component} from 'react';
import {connect} from "react-redux";
import "./resultsPage.css"
import { getPlanner, locationDetails, reloadPlanner, giveNavPath } from "../../actions";
import { Link } from 'react-router-dom';
import LocationBrowser from "./locationBrowser";


class ResultsPage extends Component {
    constructor(props){
        super(props);

        this.url = "";
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
            this.props.reloadPlanner(sessionDateResults)
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

    updateUrl(){
        const {zip} = this.props.match.params;
        setTimeout(function(){
            console.log("Replacing URL: ", this.props);

            }, 1000);
console.log("before the timeout: ", this.props.mainEvent.id);
        this.url = `/results-page/${zip}/${this.props.mainEvent.id}/${this.props.mainFood.id}/${this.props.mainDrinks.id}`;

        window.history.replaceState("", "", this.url);

    }

    render() {
        const { history } = this.props;
        console.log("updated main", this.props);

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
                    <LocationBrowser initial={this.initialUpdate}
                                     name="Food"
                                     history={history}
                                     locations={this.props.food}
                                     locName={this.props.match.params.food}
                                     updateUrl={this.updateUrl}
                    />
                    <LocationBrowser initial={this.initialUpdate}
                                     name="Drinks"
                                     history={history}
                                     locations={this.props.drinks}
                                     locName={this.props.match.params.drinks}
                                     updateUrl={this.updateUrl}
                    />
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