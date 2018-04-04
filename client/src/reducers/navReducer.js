import types from "../actions/types";

const DEFAULT_STATE = {
    path: ""
};

export default function (state = DEFAULT_STATE, action) {
    switch (action.type){
        case types.GET_PATH:
            return {...state, path: action.payload};
        default:
            return state;
    }
}