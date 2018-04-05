import '../../helpers/inputCardHelper.css';
import '../../helpers/loadingSpinner.css';
import React, {Component} from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import Modal from "../modal/modal";
import Geolocation from "../geolocation/geolocation";
import { getPlanner, loadSpinner, giveNavPath } from '../../actions';

class ZipPage extends Component {
    constructor (props){
        super (props);
        this.state ={
            displayModal: false
        };

        this.page = "zip";


        this.sendData = this.sendData.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.getInnerRef = this.getInnerRef.bind(this);
        this.getLocation = this.getLocation.bind(this);
    }
    componentDidMount(){
        this.props.giveNavPath(this.props.match.path);
    }
    sendData(props){
            const location = {
                zip: props
            };
            this.props.loadSpinner(this.page);
            this.props.getPlanner(location.zip).then(() => {
                if (this.props.dataLoaded) {
                    sessionStorage.setItem("eventsResults", JSON.stringify(this.props.events));
                    sessionStorage.setItem("foodResults", JSON.stringify(this.props.food));
                    sessionStorage.setItem("drinksResults", JSON.stringify(this.props.drinks));
                    sessionStorage.setItem("loadedResults", JSON.stringify(this.props.dataLoaded));
                    this.props.history.push(`/results-page/${props.zip}/${this.props.events[0].id}/${this.props.food[0].id}/${this.props.drinks[0].id}`);
                } else {
                    this.openModal();
                }

            }).catch((error) => {
                console.log("there was an error connecting to the server", error);
            });
    }

    openModal(){
        this.setState ({
            displayModal: true,
        })
    }

    closeModal(){
        this.setState({
            displayModal: false,
        })
    }

    renderInput({ input, meta: {touched, error} }){
        const invalidInput = touched && error;
        return (
            <div className="input-field center-align">
                <input {...input}  type = 'number' className={`inputText center-align ${invalidInput ? "input-validation" : ""}`} placeholder='Zip Code'/>
                {touched ? <span className="error-msg">{error}</span> : <span/>}
            </div>
        )
    }
    innerRef;
    getInnerRef(ref) {
        this.innerRef = ref;
    }

    // getLocation() {
    //     this.innerRef && this.innerRef.getLocation();
    // }
    getLocation() {
        // let status
        console.log("clicked");
        navigator.geolocation.getCurrentPosition(this.updatePosition, this.returnGeoError, {maximumAge:60000})
    }

    updatePosition(position){
        console.log("lat", position.coords.latitude);
        console.log("long", position.coords.longitude);
    }
    returnGeoError(err){
        console.log(err)
    }

    render(){
        console.log("this.innerRef", this.innerRef);
        const {status} = this.props;
        let goButton;
        switch(status){
            case 'sending':
                goButton = <div className="btn-large bottom-btn cyan" style={{paddingTop: "15px", width: "68px"}}><div className="loading"/></div>;
                break;
            case 'sent':
                goButton = <button className="btn-large bottom-btn cyan">Go</button>;
                break;
            default:
                goButton = <button className="btn-large bottom-btn cyan">Go</button>;
        }

        return (
            <div className='grey lighten-4 valign-wrapper input-card-container'>
                <div className="row card-width">
                    <div className="col s10 offset-s1 m8 offset-m2 l6 offset-l3">
                        <div className="card white ">
                            <div className="card-content">
                                <div className="grey-text text-darken-3 center-align card-subtitle">
                                    Let us know your date location to get started.
                                </div>
                                {/*<Geolocation />*/}
                                <button onClick={this.getLocation}>get location</button>
                                <form onSubmit={this.props.handleSubmit(this.sendData)} className="center-align">
                                    <Field label='zip' name='zip' component={this.renderInput}/>
                                    {goButton}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal display={this.state.displayModal} closeModal={this.closeModal} type="error" message={this.props.errMsg}/>
            </div>
        )
    }
}
function validate(values) {
    const error ={};
    const validZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/;

    if (!values.zip){
        error.zip = 'Please enter a zip code';
    } else if (!values.zip.match(validZip)){
        error.zip = 'Please enter a valid zip code';
    }
    return error;
}

function mapStateToProps(state){
    return {
        events: state.dateResults.events,
        food: state.dateResults.food,
        drinks: state.dateResults.drinks,
        dataLoaded: state.dateResults.receivedData,
        status: state.dateResults.status,
        errMsg: state.dateResults.errMsg
    }
}

ZipPage = reduxForm({
    form: 'zip-form',
    validate: validate
})(ZipPage);

export default connect(mapStateToProps, { getPlanner, loadSpinner, giveNavPath })(ZipPage);
