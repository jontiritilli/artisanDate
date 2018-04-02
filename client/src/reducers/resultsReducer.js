import types from "../actions/types";

const DEFAULT_STATE = {
    errMsg: "",
    receivedData: false,
    status: "idle",
    events: [],
    food: [],
    drinks: []
};

export default function (state = DEFAULT_STATE, action){
    switch (action.type){
        case types.SEND_ZIP:
            const {receivedData} = state;
            const status = receivedData ? "sent" : "idle";
            const {food, events, drinks} = action.payload.data;
            return {...state, food, events, drinks, receivedData: true, status: status};
        case types.ZIP_SENDING:
            return {...state, status: "sending"};
        case types.ZIP_ERR:
            return {...state, receivedData: false, status: "idle", errMsg: action.payload.data.message};
        case types.RELOAD_PLANNER:
            const {reloadFood, reloadEvents, reloadDrinks} = action.payload.data;
            return {...state, food: reloadFood, events: reloadEvents, drinks: reloadDrinks};
        default:
            return state;
    }
}