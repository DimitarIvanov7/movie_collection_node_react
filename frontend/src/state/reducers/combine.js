import { combineReducers } from "redux";
import cartReducer from "./cartReducers";
import searchReducer from "./searchReducers";

const reducers = combineReducers({
	cart: cartReducer,
	search: searchReducer,
});

export default reducers;
