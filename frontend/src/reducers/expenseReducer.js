import {
        CLEAR_ERRORS, 
        CREATE_EXPENSE_FAIL, 
        CREATE_EXPENSE_REQUEST,
        CREATE_EXPENSE_RESET, 
        CREATE_EXPENSE_SUCCESS,
        EXPENSE_DETAILS_REQUEST,
        EXPENSE_DETAILS_SUCCESS,
        EXPENSE_DETAILS_FAIL,
        DELETE_EXPENSE_REQUEST,
        DELETE_EXPENSE_SUCCESS,
        DELETE_EXPENSE_FAIL,
        DELETE_EXPENSE_RESET,
        UPDATE_EXPENSE_REQUEST,
        UPDATE_EXPENSE_RESET,
        UPDATE_EXPENSE_SUCCESS,
        UPDATE_EXPENSE_FAIL,
} from "../constants/expenseConstants";

export const createExpenseReducer=(state={expense:{}},action) =>{
    switch(action.type){
        case CREATE_EXPENSE_REQUEST:
            return{
                ...state,
                loading:true,
            }
        case CREATE_EXPENSE_SUCCESS:
            return {
                loading:false,
                expense:action.payload.expense,
                success:action.payload.success,
            }
        case CREATE_EXPENSE_FAIL:
            return {
                ...state,
                loading:false,
                error:action.payload,
            }
        case CREATE_EXPENSE_RESET:
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


export const expenseDetailsReducer=(state={expense:{}},action) =>{
    switch(action.type){
        case EXPENSE_DETAILS_REQUEST:
            return{
                ...state,
                loading:true,
            }
        case EXPENSE_DETAILS_SUCCESS:
            return {
                loading:false,
                expense:action.payload.expense,
                success:action.payload.success,
            }
        case EXPENSE_DETAILS_FAIL:
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


export const deleteExpenseReducer=(state={},action)=>{
    switch (action.type) {
        case DELETE_EXPENSE_REQUEST:
            return {
                ...state,
                loading:true,
            };

        case DELETE_EXPENSE_SUCCESS:
            return {
                ...state,
                loading:false,
                isDeleted:true,
            };
        case DELETE_EXPENSE_FAIL:
            return {
                ...state,
                loading:false,
                error:action.payload,
                isDeleted:false,
            };
        case DELETE_EXPENSE_RESET:
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


//update expense 
export const editExpenseReducer=(state={},action)=>{
    switch (action.type) {
        case UPDATE_EXPENSE_REQUEST:
            return {
                ...state,
                loading:true,
            };

        case UPDATE_EXPENSE_SUCCESS:
            return {
                ...state,
                loading:false,
                isUpdated:action.payload.success,
            };
        case UPDATE_EXPENSE_FAIL:
            return {
                ...state,
                loading:false,
                error:action.payload,
            };
        case UPDATE_EXPENSE_RESET:
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
