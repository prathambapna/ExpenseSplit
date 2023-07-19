import {
        CLEAR_ERRORS, 
        CREATE_EXPENSE_FAIL, 
        CREATE_EXPENSE_REQUEST,
        CREATE_EXPENSE_RESET, 
        CREATE_EXPENSE_SUCCESS,
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