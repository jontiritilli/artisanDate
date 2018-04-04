import {combineReducers} from "redux";
import { reducer as formReducer } from 'redux-form';
import resultsReducer from "./resultsReducer";
import browserReducer from './locationBrowserReducer';
import detailReducer from './detailsReducer';
import user from './user_reducer';
import summaryButtonsReducer from "./summaryButtonsReducer";
import navReducer from "./navReducer";

export default combineReducers({
    dateResults: resultsReducer,
    datePlan: browserReducer,
    form: formReducer,
    user: user,
    detail: detailReducer,
    mail: summaryButtonsReducer,
    pagePath: navReducer
});

