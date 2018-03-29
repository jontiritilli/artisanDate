import "./navBar.css"
import React, {Component} from "react";
import{Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut, clearIndividualDetails, unloadData } from '../../actions';
import DateLogo from "../../assets/images/DateLogo.svg";

class NavBar extends Component {
    constructor (props){
        super(props);

        this.state = {
            navStyle: {
                transform: "translateX(105%)"
            },
            dragStyle: {
                backgroundColor: "rgba(0, 0, 0, 0)",
                width: "100%",
                height: "100%",
                touchAction: "pan-y",
                visibility: "hidden",
                transition: ".3s"
            }
        };
        this.slideOutMenu = this.slideOutMenu.bind(this);
        this.returnMenu = this.returnMenu.bind(this);
        this.backButton = this.backButton.bind(this);
        this.handleSignOut = this.handleSignOut.bind(this);
        this.handleGoBack = this.handleGoBack.bind(this);
    }
    slideOutMenu(){
        this.setState({
            navStyle: {
                transform: "translateX(0%)"
            },
            dragStyle: {
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                visibility: "visible",
                transition: ".3s"
            }
        });
    }

    returnMenu(){
        this.setState({
            navStyle: {
                transform: "translateX(105%)"
            },
            dragStyle: {
                backgroundColor: "rgba(0, 0, 0, 0.0)",
                visibility: "hidden",
                opacity: "0",
                transition: ".3s"
            }
        });
    }
    backButton(){
        switch(this.props.location.pathname){
            case "/":
                return "";
            case "/location-page/":
                return "";
            default:
                return (
                    <a className="arrow" style={{cursor: 'pointer'}} onClick={this.handleGoBack}><i className = 'material-icons'>arrow_back</i></a>
                );
        }
    }

    handleGoBack(){
        switch (this.props.path) {
            case "/details-page/:id":
                this.props.history.goBack();
                this.props.clearIndividualDetails();
                return;
            default:
                return this.props.history.goBack();
        }

    }

    logOutLink(){
        if(this.props.auth){
            return [
                <li key='0'><Link to='/location-page' onClick={this.returnMenu}>Home</Link></li>,
                <li key = '1'><a type = 'button' onClick = {this.handleSignOut}>Log Out</a></li>
            ];
        }

        return [
            <li key = '0'><Link to='/' onClick={this.returnMenu}>Home</Link></li>,
            <li key = '1'><Link to='/signup-page' onClick={this.returnMenu}>Sign Up</Link></li>,
            <li key = '2'><Link to='/signin-page' onClick={this.returnMenu}>Sign In</Link></li>
        ];
    }
    handleSignOut(){
        this.props.signOut();
        this.props.history.push(`/`);
        this.returnMenu();
    }
    render() {
        return (
            <div className="navbar-fixed">
                <nav>
                    <div className="amber nav-wrapper">
                        {this.backButton()}
                        <div className="brand-logo"><img src={DateLogo} className="logo-img"/>Artisan Date</div>
                        <a href="#" className="right button-collapse" onClick={this.slideOutMenu}>
                            <i className="material-icons amber-text text-darken-3">menu</i>
                        </a>
                        <ul className="right hide-on-med-and-down">
                            {this.logOutLink()}
                            <li><Link to='/ourapp-page'>Our App</Link></li>
                            <li><Link to='/ourteam-page'>Our Team</Link></li>
                        </ul>
                        <div>
                            <ul className="side-nav right-aligned" style={this.state.navStyle}>
                                {this.logOutLink()}
                                <li><Link to='/ourapp-page' onClick={this.returnMenu}>Our App</Link></li>
                                <li><Link to='/ourteam-page' onClick={this.returnMenu}>Our Team</Link></li>
                            </ul>
                            <div onClick={this.returnMenu} className="drag-target" style={this.state.dragStyle}/>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        auth: state.user.auth,
        path: state.pagePath.path
    }
}

export default connect(mapStateToProps, { signOut, clearIndividualDetails, unloadData })(NavBar);