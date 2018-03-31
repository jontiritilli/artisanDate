import React, {Component} from 'react';
import './home.css';
import { Link } from "react-router-dom";
import {connect} from "react-redux";

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    componentDidMount(){
        if(this.props.auth) {
            this.props.history.push(`/location-page/`);
        }
    }

    render(){
        return (
            <div className="full-page">
                <div className="splash-image"/>
                <div className="gradient"/>
                <div className="center-page center-align">
                    <h2 className="grey-text text-darken-3">Planning a date is hard.</h2>
                    <h3 className="white-text">Need ideas?<br/>We've got you covered.</h3>
                    <Link to='/signup-page' className="btn home-btn">Sign Up</Link>
                    <Link to='/signin-page' className="btn home-btn">Sign In</Link>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        auth: state.user.auth,
        email: state.user.email,
    }
}

export default connect(mapStateToProps)(Home);