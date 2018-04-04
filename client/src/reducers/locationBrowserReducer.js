import types from "../actions/types";
const DEFAULT_STATE = {
        mainEvent: {},
        mainFood: {},
        mainDrinks: {}
};

export default function (state = DEFAULT_STATE, action){
    switch (action.type){
        case "Events":
            return {...state, mainEvent: action.payload};
        case "Food":
            return {...state, mainFood: action.payload};
        case "Drinks":
            return {...state, mainDrinks: action.payload};
        case types.RELOAD_FINAL_PLAN:
            return {...state, mainEvent: action.payload.event, mainFood: action.payload.food, mainDrinks: action.payload.drinks};
        default:
            return state;
    }
}