import {
    MY_GROUP_REQUEST,
    MY_GROUP_SUCCESS,
    MY_GROUP_FAIL,
    CREATE_GROUP_REQUEST,
    CREATE_GROUP_SUCCESS,
    CREATE_GROUP_FAIL,
    GROUP_DETAILS_REQUEST,
    GROUP_DETAILS_SUCCESS,
    GROUP_DETAILS_FAIL,
    CLEAR_ERRORS,
} 
from "../constants/groupConstants";

import axios from "axios";


//my groups
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

//create new group
export const createGroup=(groupData)=>async(dispatch)=>{
    try {
        dispatch({type:CREATE_GROUP_REQUEST});

        const config={headers :{"Content-Type":"application/json"}};
        const {data}=await axios.post(
            `/api/v1/group/create`,
            groupData,
            config,
        );
        dispatch({
            type:CREATE_GROUP_SUCCESS,
            payload:data,
        })

    } catch (error) {
        console.log(error.response.data);
        dispatch({
            type:CREATE_GROUP_FAIL,
            payload:error.response.data.message,
        })
    }
}


//group details
export const groupDetails = (groupId) => async(dispatch)=>{
    try {
        dispatch({type:GROUP_DETAILS_REQUEST});

        const {data}=await axios.get(`/api/v1/group=${groupId}`);
        dispatch({
            type:GROUP_DETAILS_SUCCESS,
            payload:data,
        })

    } catch (error) {
        console.log(error.response.data);
        dispatch({
            type:GROUP_DETAILS_FAIL,
            payload:error.response.data.message,
        })
    }
};

//clearing errors
export const clearErrors = () => async(dispatch)=>{
    dispatch({type:CLEAR_ERRORS});
};