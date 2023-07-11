import {combineReducers,applyMiddleware} from "redux";
import { legacy_createStore as createStore} from 'redux'
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import { profileReducer, userReducer } from "./reducers/userReducer";

const reducer=combineReducers({
    user:userReducer,
    profile:profileReducer
});

let initialState={};

const middleware=[thunk];

const store=createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)));

export default store;