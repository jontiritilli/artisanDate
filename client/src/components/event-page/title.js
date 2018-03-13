import React from 'react';
import './title.css';

function TitleImage(props){

    const picture = props.business.photos;
    const randomPic = picture.sort(function(a,b) {return 0.5 - Math.random()});
    const detailImg = {
        backgroundImage: `url("${randomPic[0]}")`,
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        height: "33vh",
        width: "100%",
        borderRadius: "10px"
    };
    const { name } = props.business;

    return (
        <div>
            <div id="title">
                <div className="row">
                    <div className="col s12">
                        <h1 className ="center-align" style={{marginTop: '25px'}}>{name}</h1>   
                    </div>
                </div>
            </div>
            <div id="jumboImg">
                <div className="row">
                    <div className="col s12 m12 l8 offset-l2">
                        <div className= 'responsive-img' style= {detailImg}></div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default TitleImage;