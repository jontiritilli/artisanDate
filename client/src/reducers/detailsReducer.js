import types from "../actions/types";

const DEFAULT_STATE = {
    data: {}
};

export default function (state = DEFAULT_STATE, action) {
    switch (action.type) {
        case types.GET_DETAILS:
            return { ...state, data : action.payload.data };
        case types.CLEAR_DETAILS:
            return {...state, data: {}};
        default:
            return state;
    }
}