import {
    MY_GROUP_REQUEST,
    MY_GROUP_SUCCESS,
    MY_GROUP_FAIL,
    CLEAR_ERRORS,
} 
from "../constants/groupConstants";

import axios from "axios";


//login
export const myGroups = () => async(dispatch)=>{
    try {
        dispatch({type:MY_GROUP_REQUEST});

        const {data}=await axios.get(`/api/v1/me/groups`);
        dispatch({
            type:MY_GROUP_SUCCESS,
            payload:data.groups,
        })

    } catch (error) {
        console.log(error.response.data);
        dispatch({
            type:MY_GROUP_FAIL,
            payload:error.response.data.message,
        })
    }
};

//clearing errors
export const clearErrors = () => async(dispatch)=>{
    dispatch({type:CLEAR_ERRORS});
};