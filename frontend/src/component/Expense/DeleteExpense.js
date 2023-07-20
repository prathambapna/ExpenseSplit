import React, { Fragment , useState,useEffect,useCallback} from 'react';
import Loader from "../layout/Loader/Loader";
import {useSelector,useDispatch} from "react-redux";
import {useAlert} from "react-alert";
import { useNavigate } from 'react-router-dom';
import MetaData from '../layout/MetaData';
import { useParams } from 'react-router-dom';
import { deleteExpense,clearErrors } from '../../actions/expenseAction';
import { DELETE_EXPENSE_RESET } from '../../constants/expenseConstants';

const DeleteExpense = () => {
  const dispatch=useDispatch();
    const alert=useAlert();
    const navigate=useNavigate();

    const {loading,isDeleted,error}=useSelector((state)=>state.deleteExpense);
    const {groupId,expenseId}=useParams();
    
    const [isHandlingDelete, setIsHandlingDelete] = useState(false);

    const deleteExpensesHandler = useCallback(() => {
        setIsHandlingDelete(true);
        dispatch(deleteExpense(groupId,expenseId));
    }, [dispatch, groupId, expenseId]);


    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearErrors());
            navigate(`/group/${groupId}`);
        }

        if(isDeleted){
            alert.success("Expense deleted Successfully from Group");
            navigate(`/group/${groupId}`);
            dispatch({type:DELETE_EXPENSE_RESET});
        }
        else if (!isHandlingDelete) {
            deleteExpensesHandler();
        }
    }, [error,dispatch,navigate,alert,groupId,isDeleted,deleteExpensesHandler, isHandlingDelete])
    


    return (
        <Fragment>
            {loading?<Loader/>:
            <Fragment>
                <MetaData title="Delete Expense" />
            </Fragment>}
        </Fragment>
    )
}

export default DeleteExpense