import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Github from 'react-icons/lib/fa/github';
import LinkedIn from 'react-icons/lib/fa/linkedin';
import User from 'react-icons/lib/fa/user';
import Team from '../../assets/images/artisan-date-team.jpg';
import './ourTeam.css';

export default class OurTeam extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        // const containerStyle = {
        //     'height': 'auto',
        //     'width': '100vw'
        // };
        return (
            <div className="grey lighten-4 valign-wrapper team-container">
                <div className="row">
                    <div className="col s12">
                        <div className="card white">
                            <div className="card-content">
                                <h3 className='card-title center-align dev-team'>Meet Our Dev Team</h3>
                                <div className="row">
                                    <div className="col s12 center-align">
                                        <div className="col s12">
                                            <img className='responsive-img' src={Team} alt="Team Picture"/>
                                            <p className="left-to-right">(from left to right)</p>
                                        </div>
                                        <div>
                                            <div className="col s12 m5 offset-m1 center-align">
                                                <div className="row">
                                                    <div className="col s12">
                                                        <h4>Eric Wong</h4>
                                                    </div>
                                                    <div className="col s4">
                                                        <a href="https://github.com/wrongeric" target='_blank' rel="noopener noreferrer">
                                                            <h3><Github /></h3>
                                                        </a>
                                                    </div>
                                                    <div className="col s4">
                                                        <a href="https://www.linkedin.com/in/ericsookinwong/" target='_blank' rel="noopener noreferrer">
                                                            <h3><LinkedIn /></h3>
                                                        </a>
                                                    </div>
                                                    {/* <div className="col s4">
                                                        <a href="" target='_blank' rel="noopener noreferrer">
                                                            <h3><User /></h3>
                                                        </a>
                                                    </div> */}
                                                </div>
                                                <div className="divider"></div>
                                                <div className="row center-align">
                                                    <div className="col s12">
                                                        <h4>Matt Norkaitis</h4>
                                                    </div>
                                                    <div className="col s4">
                                                        <a href="https://github.com/gamesmartz" target='_blank' rel="noopener noreferrer">
                                                            <h3><Github /></h3>
                                                        </a>
                                                    </div>
                                                    <div className="col s4">
                                                        <a href="https://www.linkedin.com/in/matthew-norkaitis-8a0a0831/" target='_blank' rel="noopener noreferrer">
                                                            <h3><LinkedIn /></h3>
                                                        </a>
                                                    </div>
                                                    <div className="col s4">
                                                        <a href="http://mattnorkaitis.com/" target='_blank' rel="noopener noreferrer">
                                                            <h3><User /></h3>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="divider"></div>
                                                <div className="row center-align">
                                                    <div className="col s12">
                                                        <h4>Sean Bae</h4>
                                                    </div>
                                                    <div className="col s4">
                                                        <a href="https://github.com/seanbae115" target='_blank' rel="noopener noreferrer">
                                                            <h3><Github /></h3>
                                                        </a>
                                                    </div>
                                                    <div className="col s4">
                                                        <a href="https://www.linkedin.com/in/sean-bae-628b85127/" target='_blank' rel="noopener noreferrer">
                                                            <h3><LinkedIn /></h3>
                                                        </a>
                                                    </div>
                                                    {/* <div className="col s4">
                                                        <a href="" target='_blank' rel="noopener noreferrer">
                                                            <h3><User /></h3>
                                                        </a>
                                                    </div> */}
                                                </div>
                                                <div className="divider"></div>
                                                <div className="row center-align">
                                                    <div className="col s12">
                                                        <h4>Jonathan Tiritilli</h4>
                                                    </div>
                                                    <div className="col s4">
                                                        <a href="https://github.com/jontiritilli" target='_blank' rel="noopener noreferrer">
                                                            <h3><Github/></h3>
                                                        </a>
                                                    </div>
                                                    <div className="col s4">
                                                        <a href="https://linkedin.com/in/jontiritilli" target='_blank' rel="noopener noreferrer">
                                                            <h3><LinkedIn/></h3>
                                                        </a>
                                                    </div>
                                                    <div className="col s4">
                                                        <a href="http://jonathantiritilli.com" target='_blank' rel="noopener noreferrer">
                                                            <h3><User /></h3>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col s12 m5 center-align">
                                                <div className="divider"></div>
                                                <div className="row center-align">
                                                    <div className="col s12">
                                                        <h4>Marcos Gonzalez</h4>
                                                    </div>
                                                    <div className="col s4">
                                                        <a href="https://github.com/marc-gonzalez" target='_blank' rel="noopener noreferrer">
                                                            <h3><Github /></h3>
                                                        </a>
                                                    </div>
                                                    <div className="col s4">
                                                        <a href="https://www.linkedin.com/in/marcos-gonzalez-86773215a/" target='_blank' rel="noopener noreferrer">
                                                            <h3><LinkedIn /></h3>
                                                        </a> 
                                                    </div>
                                                    <div className="col s4">
                                                        <a href="http://mgonzalez.io" target='_blank' rel="noopener noreferrer">
                                                            <h3><User /></h3>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="divider"></div>
                                                <div className="row center-align">
                                                    <div className="col s12">
                                                        <h4>Aaron Guillen</h4>
                                                    </div>
                                                    <div className="col s4">
                                                        <a href="https://github.com/ShaggyMunky" target='_blank' rel="noopener noreferrer">
                                                            <h3><Github /></h3>
                                                        </a>
                                                    </div>
                                                    <div className="col s4">
                                                        <a href="https://www.linkedin.com/in/aaron-guillen-5357b316/" target='_blank' rel="noopener noreferrer">
                                                            <h3><LinkedIn /></h3>
                                                        </a>
                                                    </div>
                                                     <div className="col s4">
                                                        <a href="https://a-a-ron.tech/" target='_blank' rel="noopener noreferrer">
                                                            <h3><User /></h3>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="divider"></div>
                                                <div className="row center-align">
                                                    <div className="col s12">
                                                        <h4>Justin Morinaka</h4>
                                                    </div>
                                                    <div className="col s4">
                                                        <a href="https://github.com/Jmorinaka" target='_blank' rel="noopener noreferrer">
                                                            <h3><Github /></h3>
                                                        </a>
                                                    </div>
                                                    <div className="col s4">
                                                        <a href="https://linkedin.com/in/j-morinaka" target='_blank' rel="noopener noreferrer">
                                                            <h3><LinkedIn /></h3>
                                                        </a>
                                                    </div>
                                                    {/* <div className="col s4">
                                                        <a href="" target='_blank' rel="noopener noreferrer">
                                                            <h3><User /></h3>
                                                        </a>
                                                    </div> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}