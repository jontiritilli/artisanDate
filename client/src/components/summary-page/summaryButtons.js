import React, {Component} from 'react';
import { sendMail, loadSpinner } from "../../actions";
import { connect } from "react-redux";
import "./summaryPage.css";
import "../../helpers/loadingSpinner.css";



class SummaryButtons extends Component {
    constructor(props){
        super(props);
        this.data = {
            email: this.props.email,
            dateData: this.props.dateData,
        };
        this.page = "email";

        this.sendItinerary = this.sendItinerary.bind(this)
    }
    
    sendItinerary(){
        if (!this.props.sent){
            this.props.loadSpinner(this.page);
            this.props.sendMail(this.data);
        }
    }


    render(){
        const {status} = this.props;
        let emailButton;
        switch(status){
            case 'sending':
                emailButton = <div className="btn cyan" style={{paddingTop: "0.6rem"}}><div className="loading"/></div>;
                break;
            case 'sent':
                emailButton = <div className="btn grey">Sent</div>;
                break;
            default:
                emailButton = <div onClick={this.sendItinerary} className="btn cyan">Email</div>;
        }
         return (
            <div className="row">
                <div className="col s12 m10 offset-m1 l6 offset-l3">
                    <div className="row">
                        <div className="col s6 center-align my-8">
                            {emailButton}
                        </div>
                        {/* <div className="col s4 center">
                            <div to="/emailPage" className="btn blue">Add Calendar</div>
                        </div> */}
                        <div className="col s6 center-align my-8">
                            <div onClick={this.props.openModal} className="btn red darken-2">Start Over</div>
                        </div>
                    </div>
                </div>
            </div>
        )}
}

function mapStateToProps(state){
    return {
        email: state.user.email,
        dateData: state.datePlan,
        sent: state.mail.emailSent,
        status: state.mail.status
    }
}
export default connect(mapStateToProps, {sendMail, loadSpinner})(SummaryButtons);