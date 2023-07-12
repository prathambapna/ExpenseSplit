import {
    MY_GROUP_REQUEST,
    MY_GROUP_SUCCESS,
    MY_GROUP_FAIL,
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