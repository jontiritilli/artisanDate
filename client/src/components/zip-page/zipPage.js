import '../../helpers/inputCardHelper.css';
import '../../helpers/loadingSpinner.css';
import React, {Component} from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { getPlanner, loadSpinner } from '../../actions';

class ZipPage extends Component {
    constructor (props){
        super (props);

        this.page = "zip";

        this.sendData = this.sendData.bind(this);
    }
    sendData(props){
        if (!this.props.dataLoaded){
            const location = {
                zip: props
            };
            this.props.loadSpinner(this.page);
            this.props.getPlanner(location.zip).then(() => {
                sessionStorage.setItem("eventsResults", JSON.stringify(this.props.events));
                sessionStorage.setItem("foodResults", JSON.stringify(this.props.food));
                sessionStorage.setItem("drinksResults", JSON.stringify(this.props.drinks));
                sessionStorage.setItem("loadedResults", JSON.stringify(this.props.dataLoaded));
                this.props.history.push(`/results-page/${props.zip}`);
            }).catch(() => {
                console.log("there was an error connecting to the server");
            });

        }

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
    render(){
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
                                <form onSubmit={this.props.handleSubmit(this.sendData)} className="center-align">
                                    <Field label='zip' name='zip' component={this.renderInput}/>
                                    {goButton}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
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
        status: state.dateResults.status
    }
}

ZipPage = reduxForm({
    form: 'zip-form',
    validate: validate
})(ZipPage);

export default connect(mapStateToProps, { getPlanner, loadSpinner })(ZipPage);
