import {combineReducers,applyMiddleware} from "redux";
import { legacy_createStore as createStore} from 'redux'
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import { forgotPasswordReducer, myBalancesReducer, profileReducer, userReducer } from "./reducers/userReducer";
import { createGroupReducer, groupDetailsReducer, groupReducer } from "./reducers/groupReducer";


const reducer=combineReducers({
    user:userReducer,
    profile:profileReducer,
    forgotPassword:forgotPasswordReducer,
    groups:groupReducer,
    myBalances:myBalancesReducer,
    newGroup:createGroupReducer,
    groupDetail:groupDetailsReducer,
});

let initialState={
    myBalances:{
        myBalances:localStorage.getItem("balances")
            ? JSON.parse(localStorage.getItem("balances"))
            : [],
    }
};


const middleware=[thunk];

const store=createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)));

export default store;