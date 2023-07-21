import {combineReducers,applyMiddleware} from "redux";
import { legacy_createStore as createStore} from 'redux'
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import { allUsersReducer, forgotPasswordReducer, myBalancesReducer, profileReducer, removeAvatarReducer, userReducer } from "./reducers/userReducer";
import { addMemberReducer, createGroupReducer, deleteGroupReducer, deleteMemberReducer, groupBalancesReducer, groupDetailsReducer, groupReducer, groupUsersReducer, settleBalanceReducer, updateGroupReducer } from "./reducers/groupReducer";
import { createExpenseReducer, deleteExpenseReducer, editExpenseReducer, expenseDetailsReducer } from "./reducers/expenseReducer";


const reducer=combineReducers({
    user:userReducer,
    profile:profileReducer,
    forgotPassword:forgotPasswordReducer,
    groups:groupReducer,
    myBalances:myBalancesReducer,
    newGroup:createGroupReducer,
    groupDetail:groupDetailsReducer,
    groupBalances:groupBalancesReducer,
    updateGroup:updateGroupReducer,
    addMember:addMemberReducer,
    allUsers:allUsersReducer,
    deleteMember:deleteMemberReducer,
    newExpense:createExpenseReducer,
    expenseDetail:expenseDetailsReducer,
    groupMembers:groupUsersReducer,
    deleteExpense:deleteExpenseReducer,
    editExpense:editExpenseReducer,
    settleBalance:settleBalanceReducer,
    deleteGroup:deleteGroupReducer,
    removeAvatar:removeAvatarReducer,
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