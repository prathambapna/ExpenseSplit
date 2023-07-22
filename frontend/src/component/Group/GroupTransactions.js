import React, { Fragment,useEffect } from 'react'
import "./GroupTransactions.css";
import MetaData from '../layout/MetaData';
import { clearErrors, groupTransactionsAction} from '../../actions/groupAction';
import {useAlert} from "react-alert";
import { useSelector,useDispatch } from 'react-redux';
import Loader from '../layout/Loader/Loader';
import { useParams } from 'react-router-dom';

const GroupTransactions = () => {
    const dispatch=useDispatch();
    const alert=useAlert();
    const {groupId}=useParams();
    const {loading,groupTransactions,error}=useSelector(state=>state.groupTransactions);

    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(groupTransactionsAction(groupId));
    }, [dispatch,error,alert,groupId])

    return (
        <Fragment>
            {loading===true?<Loader/>:
                <Fragment>
                    <MetaData title="Group Transactions"/>
                    <div className='GroupTransactionContainer'>
                        <div className='GroupTransactionBox'>
                            <h1>Group Transactions</h1>
                            {groupTransactions.length !== 0 &&
                                groupTransactions.map((transaction) => (
                                <div key={transaction._id} className='groupTransactionMessage'>
                                    {transaction.userFrom.name} paid {transaction.amount} to {transaction.userTo.name} on{' '}
                                    {String(transaction.createdAt).substring(0, 10)}
                                </div>
                            ))}
                            {groupTransactions.length===0 && <h2 className='noGroupTransactions'>No transactions performed yet !!!</h2>}
                        </div>
                    </div>
                </Fragment>
            }
        </Fragment>
    )
}

export default GroupTransactions