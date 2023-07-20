import {
    CLEAR_ERRORS, 
    CREATE_EXPENSE_FAIL, 
    CREATE_EXPENSE_REQUEST,
    CREATE_EXPENSE_SUCCESS,
    EXPENSE_DETAILS_REQUEST,
    EXPENSE_DETAILS_SUCCESS,
    EXPENSE_DETAILS_FAIL,
    DELETE_EXPENSE_REQUEST,
    DELETE_EXPENSE_SUCCESS,
    DELETE_EXPENSE_FAIL,
} from "../constants/expenseConstants";
import axios from "axios";

//create new expense
export const createExpense=(groupId,groupData)=>async(dispatch)=>{
    try {
        dispatch({type:CREATE_EXPENSE_REQUEST});

        const config={headers :{"Content-Type":"application/json"}};
        const {data}=await axios.post(
            `/api/v1/group/${groupId}/expense/create`,
            groupData,
            config,
        );
        dispatch({
            type:CREATE_EXPENSE_SUCCESS,
            payload:data,
        })

    } catch (error) {
        console.log(error.response.data);
        dispatch({
            type:CREATE_EXPENSE_FAIL,
            payload:error.response.data.message,
        })
    }
}


//expense details
export const expenseDetails = (groupId,expenseId) => async(dispatch)=>{
    try {
        dispatch({type:EXPENSE_DETAILS_REQUEST});

        const {data}=await axios.get(`/api/v1/group/${groupId}/expense/${expenseId}`);
        dispatch({
            type:EXPENSE_DETAILS_SUCCESS,
            payload:data,
        })

    } catch (error) {
        console.log(error.response.data);
        dispatch({
            type:EXPENSE_DETAILS_FAIL,
            payload:error.response.data.message,
        })
    }
};

//delete expense in a group
export const deleteExpense=(groupId,expenseId)=>async(dispatch)=>{
    try {
        dispatch({type:DELETE_EXPENSE_REQUEST});

        const {data}=await axios.delete(`/api/v1/group/${groupId}/expense/${expenseId}/delete`);
        dispatch({
            type:DELETE_EXPENSE_SUCCESS,
            payload:data,
        })

    } catch (error) {
        console.log(error.response.data);
        dispatch({
            type:DELETE_EXPENSE_FAIL,
            payload:error.response.data.message,
        })
    }
}


//clearing errors
export const clearErrors = () => async(dispatch)=>{
    dispatch({type:CLEAR_ERRORS});
};