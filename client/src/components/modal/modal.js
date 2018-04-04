import "./modal.css"
import React, {Component} from "react";
import { Link } from "react-router-dom";

class Modal extends Component {

    render(){
        const displayModal = {
            display: this.props.display ? "flex" : "none",
            justifyContent: this.props.display ? "center" : "none"
        };
        let message;
        let buttons;
        switch (this.props.type){
            case "error":
                message = <p className="modal-font">{this.props.message}</p>;
                buttons = <div className="row">
                                <div className="col s12 center-align">
                                    <button onClick={this.props.closeModal} className="btn-large bottom-btn cyan">OK</button>
                                </div>
                            </div>;
                break;
            case "confirm":
                message = <p className="modal-font">{this.props.message}</p>;
                buttons = <div className="row">
                            <div className="col s6 center-align my-8">
                                <Link to="/location-page" className="btn cyan">Yes</Link>
                            </div>
                            <div className="col s6 center-align">
                                <button onClick={this.props.closeModal} className="btn red darken-2 my-8">No</button>
                            </div>
                          </div>;
                break;
        }
        return (
            <div style={displayModal} className="homeModal valign-wrapper" onClick={this.props.closeModal}>
                <div className="row">
                    <div className="col s12 center-align">
                        <div className="card grey lighten-3" style={{padding: "24px"}}>
                            <div className="card-content center-align">
                                {message}
                            </div>
                            <div className="card-action">
                                {buttons}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Modal;