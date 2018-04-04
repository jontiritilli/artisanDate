import React, {Component} from 'react';
import { Route } from "react-router-dom";
import "../results-page/resultsPage.css";

class Header extends Component {
    constructor(props){
        super(props);

        this.locationId = this.props;
       this.goToDetails = this.goToDetails.bind(this);
    }



    goToDetails(){
        console.log("GO TO DETAILS",this.locationId);
        // console.log('History:', history);
        // console.log('From Header Location ID:', locationId);

        this.props.history.push(`/event-page/${this.locationId}`);
    }

    render(){
        console.log("HEADER LOCATION ID: ", this.locationId);
        return (
            <div className="row valign-wrapper bottom-pad">
                <div className="col s4 offset-s2">
                    {/*<button onClick={this.getDetails.bind(this)} className='btn thin-btn'>Details</button>*/}
                    <button onClick={this.goToDetails} className='btn thin-btn'>Details</button>
                </div>
                {/*toggle switch */}
                <div className="col s5">
                    <div className="switch">
                        <label>
                            Omit
                            <input type="checkbox"/>
                            <span className="lever"/>
                            Include
                        </label>
                    </div>
                </div>
            </div>
        )
    }
}

export default Header;