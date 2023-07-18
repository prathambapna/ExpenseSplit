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
    CLEAR_ERRORS,
} 
from "../constants/groupConstants";


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