import React from "react";
import './summaryEvent.css';
import event from '../../assets/images/event_legend.png';
import food from '../../assets/images/food_legend.png';
import drinks from '../../assets/images/drinks_legend.png';


const SummaryEvent = props => {
    const icons = [event, food, drinks];
    let markerSelect = <div/>;
        switch(props.eventType){
            case 'Event':
                markerSelect = <div className = 'col s2 center-align marker'><img className="legend-img" src={icons[0]} alt=""/></div>;
                break;
            case 'Food':
                markerSelect = <div className='col s2 center-align marker'><img className="legend-img" src={icons[1]} alt="" /></div>;
                break;
            case 'Drinks':
                markerSelect = <div className='col s2 center-align marker'><img className="legend-img" src={icons[2]} alt="" /></div>;
                break;
            default:
                break;
        }

    return (
        <div className="row">
            <div className="col s12">
                <div className="card white">
                    <div className="event-card">
                        <div className="row">
                            <div className="col s10 event-title">
                                <div className="row">
                                    <div className="col s12">{props.eventType}</div>
                                </div>
                                <div className="row">
                                    <div className="col s6 offset-s1 event-font truncate">{props.eventName}</div>
                                    <div className = "col s5 event-font no-show">{props.location[0]}</div>
                                </div>
                            </div>
                            {markerSelect}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );
};


export default SummaryEvent;