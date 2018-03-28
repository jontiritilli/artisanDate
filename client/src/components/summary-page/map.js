import React from "react";
import { compose, withProps, withStateHandlers } from "recompose";
// import FaAnchor from 'react-icons/lib/fa/anchor';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";
import { MarkerWithLabel } from "react-google-maps/lib/components/addons/MarkerWithLabel";
import DrinkMarker from "../../assets/images/drink_marker.png";
import FoodMarker from "../../assets/images/food_marker.png";
import EventMarker from "../../assets/images/event_marker.png";
import eventPage from "../details-page/detailsPage";
import "./summaryPage.css";

export class MapComponent extends React.PureComponent {
    state = {
        isMarkerShown: false,
    };

    SummaryMap(){
        // console.log("maps props", this.props);
        const labelBg = {
            background: 'linear-gradient(#fff, #fafafa)',
            boxShadow: "2px 2px 10px 2px rgba(0, 0, 0, 0.5)",
            borderRadius: "3px",
            fontSize: "10px",
            padding: "0.5em",
            marginLeft: "0",
            width: "120px",
            opacity: .8,
        };
        const { eventLoc, foodLoc, drinkLoc, initialLat, initialLong, mapZoom } = this.props;
        return compose(
            withStateHandlers(() => ({
                isOpen: false,
            }), {
                    onToggleOpen: ({ isOpen }) => () => ({
                        isOpen: !isOpen,
                    })
                }),
            withProps({
                googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAl82-QVgSS43dlCQqr6flx8BaCbREVOTA&v=3.exp&libraries=geometry,drawing,places",
                loadingElement: <div style={{ height: `100%` }} />,
                containerElement: <div className="map-container"/>,
                mapElement: <div style={{ height: `100%` }} />,
            }),
            withScriptjs,
            withGoogleMap
        )((props) =>

            <GoogleMap
                defaultZoom={mapZoom}
                defaultCenter={{ lat: initialLat, lng: initialLong }}
            >
                <MarkerWithLabel
                    position={{ lat: eventLoc.lat, lng: eventLoc.long }}
                    icon={EventMarker}
                    labelAnchor={new google.maps.Point(0,0)}
                    zIndex = {1000}
                    labelStyle={labelBg}
                >
                    <div className="route-container">
                         <span>{this.props.evtName}</span>
                        {eventLoc.address.map((item,index) => {
                            return (<p key={index} className="address-line">{item}</p>);
                        })}
                    </div>
                </MarkerWithLabel>

                <MarkerWithLabel
                    position={{ lat: foodLoc.lat, lng: foodLoc.long }}
                    icon={FoodMarker}
                    labelAnchor={new google.maps.Point(0, 0)}
                    zIndex = {1001}
                    labelStyle={labelBg}
                >
                    <div className="route-container">
                         <span>{this.props.foodName}</span>
                        {foodLoc.address.map((item,index) => {
                            return (<p key={index} className="address-line">{item}</p>);
                        })}
                    </div>
                </MarkerWithLabel>

                <MarkerWithLabel
                    position={{ lat: drinkLoc.lat, lng: drinkLoc.long }}
                    icon={DrinkMarker}
                    labelAnchor={new google.maps.Point(120, 0)}
                    labelStyle={labelBg}
                    zIndex = {1002}
                >
                    <div className="route-container">
                         <span>{this.props.drinkName}</span>
                        {drinkLoc.address.map((item,index) => {
                            return (<p key={index} className="address-line">{item}</p>);
                        })}
                    </div>
                </MarkerWithLabel>
            </GoogleMap>
        );
    }

    componentDidMount() {
        this.delayedShowMarker()
    }

    delayedShowMarker = () => {
        setTimeout(() => {
            this.setState({ isMarkerShown: true });
        }, 3000)
    };

    handleMarkerClick = () => {
        this.setState({ isMarkerShown: false });
        this.delayedShowMarker();
    };

    render() {
        const SummaryMap = this.SummaryMap();

        return (
            <SummaryMap
                isMarkerShown={this.state.isMarkerShown}
                onMarkerClick={this.handleMarkerClick}
            />
        );
    }
}
