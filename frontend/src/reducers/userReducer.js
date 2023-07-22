import {LOGIN_REQUEST,
        LOGIN_SUCCESS,
        LOGIN_FAIL,
        CLEAR_ERRORS,
        REGISTER_USER_REQUEST,
        REGISTER_USER_SUCCESS,
        REGISTER_USER_FAIL,
        LOAD_USER_REQUEST,
        LOAD_USER_SUCCESS,
        LOAD_USER_FAIL,
        LOGOUT_SUCCESS,
        LOGOUT_FAIL,
        UPDATE_PROFILE_REQUEST,
        UPDATE_PROFILE_SUCCESS,
        UPDATE_PROFILE_FAIL,
        UPDATE_PROFILE_RESET,
        UPDATE_PASSWORD_REQUEST,
        UPDATE_PASSWORD_SUCCESS,
        UPDATE_PASSWORD_RESET,
        UPDATE_PASSWORD_FAIL,
        FORGOT_PASSWORD_REQUEST,
        FORGOT_PASSWORD_SUCCESS,
        FORGOT_PASSWORD_FAIL,
        RESET_PASSWORD_REQUEST,
        RESET_PASSWORD_SUCCESS,
        RESET_PASSWORD_FAIL,
        MY_BALANCES_REQUEST,
        MY_BALANCES_SUCCESS,
        MY_BALANCES_FAIL,
        ALL_USERS_REQUEST,
        ALL_USERS_SUCCESS,
        ALL_USERS_FAIL,
        REMOVE_AVATAR_REQUEST,
        REMOVE_AVATAR_SUCCESS,
        REMOVE_AVATAR_FAIL,
        REMOVE_AVATAR_RESET,
        MY_TRANSACTIONS_REQUEST,
        MY_TRANSACTIONS_SUCCESS,
        MY_TRANSACTIONS_FAIL,
} from "../constants/userConstants";

//user auth
export const userReducer=(state={user:{}},action)=>{
    switch (action.type) {
        case LOGIN_REQUEST:
        case REGISTER_USER_REQUEST:
        case LOAD_USER_REQUEST:
            return {
                loading:true,
                isAuthenticated:false,
            };

        case LOGIN_SUCCESS:
        case REGISTER_USER_SUCCESS:
        case LOAD_USER_SUCCESS:
            return {
                ...state,
                loading:false,
                isAuthenticated:true,
                user:action.payload,
            };
        case LOGOUT_SUCCESS:
            return {
                loading:false,
                user:null,
                isAuthenticated:false,
            };
        case LOGIN_FAIL:
        case REGISTER_USER_FAIL:
            return {
                ...state,
                loading:false,
                isAuthenticated:false,
                user:null,
                error:action.payload,
            };
        case LOAD_USER_FAIL:
            return{
                loading:false,
                isAuthenticated:false,
                user:null,
                error:action.payload,
            }
        case LOGOUT_FAIL:
            return{
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

//my profile
export const profileReducer=(state={},action)=>{
    switch (action.type) {
        case UPDATE_PROFILE_REQUEST:
        case UPDATE_PASSWORD_REQUEST:
            return {
                ...state,
                loading:true,
            };

        case UPDATE_PROFILE_SUCCESS:
        case UPDATE_PASSWORD_SUCCESS:
            return {
                ...state,
                loading:false,
                isUpdated:action.payload,
            };
        case UPDATE_PROFILE_FAIL:
        case UPDATE_PASSWORD_FAIL:
            return {
                ...state,
                loading:false,
                error:action.payload,
            };
        case UPDATE_PROFILE_RESET:
        case UPDATE_PASSWORD_RESET:
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

//forgot password
export const forgotPasswordReducer=(state={},action)=>{
    switch (action.type) {
        case FORGOT_PASSWORD_REQUEST:
        case RESET_PASSWORD_REQUEST:
            return {
                ...state,
                loading:true,
                error:null,
            };

        case FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                loading:false,
                message:action.payload,
            };
        case RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                loading:false,
                success:action.payload,
            };
        case FORGOT_PASSWORD_FAIL:
        case RESET_PASSWORD_FAIL:
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
}

//user balances
export const myBalancesReducer=(state={myBalances:[]},action) =>{
    switch(action.type){
        case MY_BALANCES_REQUEST:
            return{
                myBalances:[],
                loading:true,
            }
        case MY_BALANCES_SUCCESS:
            return {
                loading:false,
                myBalances:action.payload,
            }
        case MY_BALANCES_FAIL:
            return {
                loading:false,
                myBalances:[],
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

//get all users
export const allUsersReducer=(state={users:[]},action)=>{
    switch (action.type) {
        case ALL_USERS_REQUEST:
            return {
                ...state,
                loading:true,
            };

        case ALL_USERS_SUCCESS:
            return {
                ...state,
                loading:false,
                users:action.payload.users,
            };
        case ALL_USERS_FAIL:
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


//remove avatar
export const removeAvatarReducer=(state={},action)=>{
    switch (action.type) {
        case REMOVE_AVATAR_REQUEST:
            return {
                ...state,
                loading:true,
            };

        case REMOVE_AVATAR_SUCCESS:
            return {
                ...state,
                loading:false,
                isAvatarRemoved:action.payload.success,
            };
        case REMOVE_AVATAR_FAIL:
            return {
                ...state,
                loading:false,
                error:action.payload,
            };
        case REMOVE_AVATAR_RESET:
            return {
                ...state,
                isAvatarRemoved:false,
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


//user transactions
export const myTransactionsReducer=(state={myTransactions:[]},action) =>{
    switch(action.type){
        case MY_TRANSACTIONS_REQUEST:
            return{
                myTransactions:[],
                loading:true,
            }
        case MY_TRANSACTIONS_SUCCESS:
            return {
                loading:false,
                myTransactions:action.payload.transactions,
            }
        case MY_TRANSACTIONS_FAIL:
            return {
                loading:false,
                myTransactions:[],
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
