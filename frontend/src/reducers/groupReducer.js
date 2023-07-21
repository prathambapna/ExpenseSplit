import {
    MY_GROUP_REQUEST,
    MY_GROUP_SUCCESS,
    MY_GROUP_FAIL,
    CREATE_GROUP_REQUEST,
    CREATE_GROUP_SUCCESS,
    CREATE_GROUP_RESET,
    CREATE_GROUP_FAIL,
    GROUP_DETAILS_REQUEST,
    GROUP_DETAILS_SUCCESS,
    GROUP_DETAILS_FAIL,
    GROUP_BALANCES_REQUEST,
    GROUP_BALANCES_SUCCESS,
    GROUP_BALANCES_FAIL,
    UPDATE_GROUP_REQUEST,
    UPDATE_GROUP_RESET,
    UPDATE_GROUP_SUCCESS,
    UPDATE_GROUP_FAIL,
    ADD_MEMBER_REQUEST,
    ADD_MEMBER_RESET,
    ADD_MEMBER_SUCCESS,
    ADD_MEMBER_FAIL,
    DELETE_MEMBER_REQUEST,
    DELETE_MEMBER_RESET,
    DELETE_MEMBER_SUCCESS,
    DELETE_MEMBER_FAIL,
    GROUP_USERS_REQUEST,
    GROUP_USERS_SUCCESS,
    GROUP_USERS_FAIL,
    SETTLE_BALANCE_REQUEST,
    SETTLE_BALANCE_RESET,
    SETTLE_BALANCE_SUCCESS,
    SETTLE_BALANCE_FAIL,
    DELETE_GROUP_REQUEST,
    DELETE_GROUP_SUCCESS,
    DELETE_GROUP_FAIL,
    DELETE_GROUP_RESET,
    CLEAR_ERRORS,
} 
from "../constants/groupConstants";

//all groups of user
export const groupReducer=(state={groups:[]},action) =>{
    switch(action.type){
        case MY_GROUP_REQUEST:
            return{
                groups:[],
                loading:true,
            }
        case MY_GROUP_SUCCESS:
            return {
                loading:false,
                groups:action.payload,
            }
        case MY_GROUP_FAIL:
            return {
                loading:false,
                groups:[],
                error:action.payload,
            }
        case CLEAR_ERRORS:
            return{
                ...state,
                error:null,
            };
            
        default:
            return state;
    }
};

//create group
export const createGroupReducer=(state={group:{}},action) =>{
    switch(action.type){
        case CREATE_GROUP_REQUEST:
            return{
                ...state,
                loading:true,
            }
        case CREATE_GROUP_SUCCESS:
            return {
                loading:false,
                group:action.payload.group,
                success:action.payload.success,
            }
        case CREATE_GROUP_FAIL:
            return {
                ...state,
                loading:false,
                error:action.payload,
            }
        case CREATE_GROUP_RESET:
            return{
                ...state,
                success:false,
            }
        case CLEAR_ERRORS:
            return{
                ...state,
                error:null,
            };
            
        default:
            return state;
    }
};


//group details
export const groupDetailsReducer=(state={group:{}},action) =>{
    switch(action.type){
        case GROUP_DETAILS_REQUEST:
            return{
                ...state,
                loading:true,
            }
        case GROUP_DETAILS_SUCCESS:
            return {
                loading:false,
                group:action.payload.group,
                success:action.payload.success,
            }
        case GROUP_DETAILS_FAIL:
            return {
                loading:false,
                error:action.payload,
            }
        case CLEAR_ERRORS:
            return{
                ...state,
                error:null,
            };
            
        default:
            return state;
    }
};

//balances of group
export const groupBalancesReducer=(state={groupBalance:[]},action) =>{
    switch(action.type){
        case GROUP_BALANCES_REQUEST:
            return{
                ...state,
                loading:true,
            }
        case GROUP_BALANCES_SUCCESS:
            return {
                loading:false,
                groupBalance:action.payload.groupBalance,
                success:action.payload.success,
            }
        case GROUP_BALANCES_FAIL:
            return {
                loading:false,
                error:action.payload,
            }
        case CLEAR_ERRORS:
            return{
                ...state,
                error:null,
            };
            
        default:
            return state;
    }
};

//update group
export const updateGroupReducer=(state={},action)=>{
    switch (action.type) {
        case UPDATE_GROUP_REQUEST:
            return {
                ...state,
                loading:true,
            };

        case UPDATE_GROUP_SUCCESS:
            return {
                ...state,
                loading:false,
                isUpdated:action.payload,
            };
        case UPDATE_GROUP_FAIL:
            return {
                ...state,
                loading:false,
                error:action.payload,
            };
        case UPDATE_GROUP_RESET:
            return {
                ...state,
                isUpdated:false,
            }
        case CLEAR_ERRORS:
            return{
                ...state,
                error:null,
            };
            
        default:
            return state;
    }
}

//add member
export const addMemberReducer=(state={user:{}},action)=>{
    switch (action.type) {
        case ADD_MEMBER_REQUEST:
            return {
                ...state,
                loading:true,
            };

        case ADD_MEMBER_SUCCESS:
            return {
                user:action.payload.user,
                loading:false,
                success:action.payload.success,
            };
        case ADD_MEMBER_FAIL:
            return {
                ...state,
                loading:false,
                error:action.payload,
            };
        case ADD_MEMBER_RESET:
            return {
                ...state,
                success:false,
            }
        case CLEAR_ERRORS:
            return{
                ...state,
                error:null,
            };
            
        default:
            return state;
    }
}

//delete member 
export const deleteMemberReducer=(state={},action)=>{
    switch (action.type) {
        case DELETE_MEMBER_REQUEST:
            return {
                ...state,
                loading:true,
            };

        case DELETE_MEMBER_SUCCESS:
            return {
                ...state,
                loading:false,
                isDeleted:true,
            };
        case DELETE_MEMBER_FAIL:
            return {
                ...state,
                loading:false,
                error:action.payload,
                isDeleted:false,
            };
        case DELETE_MEMBER_RESET:
            return {
                ...state,
                isDeleted:false,
            }
        case CLEAR_ERRORS:
            return{
                ...state,
                error:null,
            };
            
        default:
            return state;
    }
}


//get group users
export const groupUsersReducer=(state={users:[]},action)=>{
    switch (action.type) {
        case GROUP_USERS_REQUEST:
            return {
                ...state,
                loading:true,
            };

        case GROUP_USERS_SUCCESS:
            return {
                ...state,
                loading:false,
                users:action.payload.members,
            };
        case GROUP_USERS_FAIL:
            return {
                ...state,
                loading:false,
                error:action.payload,
            };
        case CLEAR_ERRORS:
            return{
                ...state,
                error:null,
            };
            
        default:
            return state;
    }
};

//settle balance
export const settleBalanceReducer=(state={},action)=>{
    switch (action.type) {
        case SETTLE_BALANCE_REQUEST:
            return {
                ...state,
                loading:true,
            };

        case SETTLE_BALANCE_SUCCESS:
            return {
                ...state,
                loading:false,
                isSettled:action.payload.success,
            };
        case SETTLE_BALANCE_FAIL:
            return {
                ...state,
                loading:false,
                error:action.payload,
            };
        case SETTLE_BALANCE_RESET:
            return {
                ...state,
                isSettled:false,
            }
        case CLEAR_ERRORS:
            return{
                ...state,
                error:null,
            };
            
        default:
            return state;
    }
}

//delete group 
export const deleteGroupReducer=(state={},action)=>{
    switch (action.type) {
        case DELETE_GROUP_REQUEST:
            return {
                ...state,
                loading:true,
            };

        case DELETE_GROUP_SUCCESS:
            return {
                ...state,
                loading:false,
                isDeleted:true,
            };
        case DELETE_GROUP_FAIL:
            return {
                ...state,
                loading:false,
                error:action.payload,
                isDeleted:false,
            };
        case DELETE_GROUP_RESET:
            return {
                ...state,
                isDeleted:false,
            }
        case CLEAR_ERRORS:
            return{
                ...state,
                error:null,
            };
            
        default:
            return state;
    }
}