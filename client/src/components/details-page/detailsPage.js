import React, { Component } from 'react';
import './title.css';
import { connect } from 'react-redux';
import { getIndividual, giveNavPath } from '../../actions';
import TitleImage from './title';
import Info from './info';


class DetailsPage extends Component{

    componentDidMount(){
        console.log("The props Did mount: ", this.props);
        this.props.getIndividual(this.props.match.params);
        this.props.giveNavPath(this.props.match.path);
    }
    render(){
        console.log("The props in render Deatails: ", this.props);
        if (Object.keys(this.props.details).length === 0){
            return(
                <div className='incoming'>
                    <div className="loading-center">
                        <div className="data-loading"/>
                    </div>
                </div>
            );
        }
        return (
            <div className = 'structure container'>
                <TitleImage business = {this.props.details}/>
                <Info business={this.props.details}/>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        details: state.detail.data
    }
}

export default connect(mapStateToProps, { getIndividual, giveNavPath })(DetailsPage);

