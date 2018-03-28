import types from "../actions/types";

const DEFAULT_STATE = {
    data: {}
};

export default function (state = DEFAULT_STATE, action) {
    switch (action.type) {
        case types.GET_DETAILS:
            const { data } = action.payload;
            return { ...state, data };
        case types.CLEAR_DETAILS:
            return {...state, data: DEFAULT_STATE.data};
        default:
            return state;
    }
}