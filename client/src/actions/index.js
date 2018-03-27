import axios from "axios";
import { browserHistory } from 'react-router';
import types from './types';

export function getPlanner(zip){
    return async dispatch => {
        try {
            const request = await axios.post(`/api/getEverything`, zip);
            dispatch({
                type: types.SEND_ZIP,
                payload: request
            })
        } catch (err) {
            dispatch({
                type: types.ZIP_ERR,
                payload: err.response.data
            })
        }
    }
}

export function getIndividual(id){
    console.log("get individual action", id);
    return async dispatch => {
        try {
            console.log("in the try", id);
            const request = await axios.post(`/api/getOneBusiness`, id);
            dispatch({
                type: types.GET_DETAILS,
                payload: request
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export function signUp(cred) {
    return async dispatch => {
        try {
            const request = await axios.post(`/auth/signup`, cred);
            localStorage.setItem('token', request.data.token);
            dispatch({
                type: types.SIGN_UP,
                email: cred.email
            });
            // console.log('Successful sign in')
        } catch (err) {
            if(err.response){
                return dispatch({
                    type: types.AUTH_ERROR,
                    error: err.response.data
                });
            }
            dispatch({
                type: types.AUTH_ERROR,
                error: 'Error signing up'
            });
        }
    }
}

export function signIn(cred) {
    return async dispatch => {
        try {
            const request = await axios.post(`/auth/signin`, cred);
            localStorage.setItem('token', request.data.token);
            dispatch({
                type: types.SIGN_IN,
                email: cred.email
            });
        } catch(err) {
            dispatch({
                type: types.AUTH_ERROR,
                error: 'Invalid Username and/or Password'
            });
        }
    }
}

export function signOut(){

    localStorage.removeItem('token');

    return {
        type: types.SIGN_OUT
    };
}

export function sendMail(data) {
    return dispatch => {
        axios.post(`/mailer/send`, data).then (res =>{
            dispatch({
                type: types.SEND_MAIL,
                payload: res
            })
        }).catch (err => {
            console.log('ERRORRRR: ', err);
        })
    }
}



/**********************NON AXIOS****************************/
export function locationDetails(props, name) {
    return {
        type: name,
        payload: props
    }
}

export function clearIndividualDetails(){
    return {
        type: types.CLEAR_DETAILS
    }
}

export function giveNavPath(path){
    return {
        type: types.GET_PATH,
        payload: path
    }
}

export function reloadPlanner(props){
    return {
        type: types.RELOAD_PLANNER,
        payload: props
    }
}

export function reloadFinalPlan(props){
    return {
        type: types.RELOAD_FINAL_PLAN,
        payload: props
    }
}

export function loadSpinner(pageName){
    switch (pageName){
        case "zip":
            return {type: types.ZIP_SENDING};
        case "email":
            return {type: types.EMAIL_SENDING};
    }
}