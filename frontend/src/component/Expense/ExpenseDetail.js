import React, { Fragment , useEffect} from 'react';
import "./ExpenseDetails.css";
import Loader from "../layout/Loader/Loader";
import {useSelector,useDispatch} from "react-redux";
import {useAlert} from "react-alert";
import { useNavigate } from 'react-router-dom';
import MetaData from '../layout/MetaData';
import { groupUsersDetails } from '../../actions/groupAction';
import { useParams } from 'react-router-dom';
import { expenseDetails,clearErrors } from '../../actions/expenseAction';

const ExpenseDetail = () => {

    const dispatch=useDispatch();
    const alert=useAlert();
    const navigate =useNavigate();

    const {groupId,expenseId}=useParams();

    const {loading,error,expense}=useSelector((state)=>state.expenseDetail);
    const {error:groupMembersError,users}=useSelector((state)=>state.groupMembers);


    const editExpenseHandler=(e)=>{
        e.preventDefault();
        navigate(`/group/${groupId}/expense/${expenseId}/update`);
    }

    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        if(groupMembersError){
            alert.error(groupMembersError);
            dispatch(clearErrors());
        }
      
        dispatch(expenseDetails(groupId,expenseId));
        dispatch(groupUsersDetails(groupId));
      
    }, [dispatch,alert,error,groupId,groupMembersError,expenseId])

    const payerUser = users.find((user) => user._id === expense.payer);

    const renderExpenseDetails = () => {
        return (
             <Fragment>
                <MetaData title={ `${expense.title}`}/>
                <div className='ExpenseDetailContainer'>
                    <div className='ExpenseDetailBox'>
                        <div className='leftSideExpenseSection'>
                            <div className='expenseHeadingSection'>
                                <h1>{expense.title}</h1>
                            </div>
                            <div className='expenseDescriptionSection'>
                                <p>({expense.description})</p>
                            </div>
                            <div className='expenseAmountSection'>
                                <h2>Total Expense : {expense.amount}</h2>
                            </div>
                            <div className='expensePayerSection'>
                                {payerUser ? (<h2>Payer: {payerUser.name}</h2>) : (<h2>Payer details loading...</h2>)}
                            </div>
                            <div className='expenseSplitTypeSection'>
                                <h3>Split Type : {expense.splitType}</h3>
                            </div>
                            <div className='expenseCreatedAtSection'>
                                <h3>Created At : {String(expense.createdAt).substring(0,10)}</h3>
                            </div>
                            <div className='editExpense'>
                                <button onClick={editExpenseHandler}>Edit</button>
                            </div>
                        </div>
                        <div className='rightSideExpenseSection'>
                            {users && expense && expense.participants && expense.participants.map((participant)=>{
                                const user=users.find((u)=>u._id===participant.user);
                                return(
                                    <div className='singleParticipantSection'>
                                        <img 
                                            src={(user && user.avatar && user.avatar.url && user.avatar.url!=="profile pic url") ? user.avatar.url:"/Profile.png"}
                                            alt="Profile"
                                        />
                                        <span>{user && user.name} has Share of {participant.share}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    };


    return (
        <Fragment>
            {loading === true ? (<Loader />) :
                (
                    <Fragment>
                        {renderExpenseDetails()}
                    </Fragment>
                )
            }
        </Fragment>
    )
}

export default ExpenseDetail