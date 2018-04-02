import React, { Component } from 'react';
import './info.css';
import fourstar from '../../assets/images/4-star.png';
import fourhalfstar from '../../assets/images/4-2-star.png';
import fivestar from '../../assets/images/5-star.png';

class Info extends Component{
    stars(rating){
        switch(rating){
            case 4:
                return <img className = 'responseive-img' src = {fourstar} alt = 'Stars'/>;
            case 4.5:
                return <img className='responseive-img' src={fourhalfstar} alt='Stars' />;
            case 5:
                return <img className='responseive-img' src={fivestar} alt='Stars' />;
            default:
                return <h4>Ratings Not Provided</h4>;
        }
    }
    open(is_closed){
        if(is_closed){
            return <p className= 'red accent-4'>CURRENTLY CLOSED</p>
        }else{
            return <p className = 'pSize'>CURRENTLY OPEN</p>
        }
    }

    convertTime(time){
        let standardTime = '';
        let newTime = time.substring(11, time.length);
        let timeParst = parseInt(newTime);
        let newFormat = new Date(time);
        let dateToRender = newFormat.toDateString();
        let finalDateToRender = dateToRender.substring(0, 10);
        let minutes = time.substring(13, time.length);
        if (timeParst > 12) {
            let newHour = timeParst - 12;
            standardTime = `Event Begins at ${newHour}${minutes} PM`;
        }else{
            standardTime = `Event Begins at ${timeParst}${minutes} AM on ${finalDateToRender}`;
        }
        return (
            <div className = 'eventTime'>
                <span>{standardTime}</span>
                <span>on</span>
                <span>{finalDateToRender}</span>
            </div>
        );
    }
    render(){
        const { rating, price, is_closed, display_phone,description, attending_count, time_start } = this.props.business;
        let newFormat = new Date(time_start);
        let dateToRender = newFormat.toDateString();
        if(this.props.business.business_id || this.props.business.business_id === null){
            return (
                <div>
                    <div className = 'descriptionEvent'>
                        <div className = 'description__text-box'>
                            <p className = 'description__text'>{description}</p>
                        </div>
                        <div className = 'attendee-box'>
                            <p>rsvp count: <span className = 'amber-text'>{attending_count}</span></p>
                        </div>
                        {this.convertTime(time_start)}
                    </div>
                </div>
            );
        }

        return (
            <div>
                <div className='descriptionEvent'>
                    <div className='description__text-box'>
                        {this.open(is_closed)}
                    </div>
                    <div className='attendee-box'>
                        {this.stars(rating)}
                    </div>
                    <div>
                        <p>for more information please contact:</p>
                        <span>{<a href={`tel:${display_phone}`}>{display_phone}</a>}</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default Info;