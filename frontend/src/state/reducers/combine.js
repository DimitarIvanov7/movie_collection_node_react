import { combineReducers } from "redux";
import searchReducer from "./searchReducers";
import { loginOpenReducer, userReducer } from "./userReducer";

const reducers = combineReducers({
	loginOpen: loginOpenReducer,
	search: searchReducer,
	user: userReducer,
});

export default reducers;
