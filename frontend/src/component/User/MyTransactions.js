import React, { Fragment,useEffect } from 'react'
import "./MyTransactions.css";
import MetaData from '../layout/MetaData';
import { clearErrors, myTransactionsAction} from '../../actions/userAction';
import {useAlert} from "react-alert";
import { useSelector,useDispatch } from 'react-redux';
import Loader from '../layout/Loader/Loader';


const MyTransactions = () => {
    const {loading,myTransactions,error}=useSelector(state=>state.myTransactions);
    const {user}=useSelector(state=>state.user);
    const dispatch=useDispatch();
    const alert=useAlert();

    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(myTransactionsAction());
    }, [dispatch,error,alert])

    return (
        <Fragment>
            {loading===true?<Loader/>:
                <Fragment>
                    <MetaData title="My Transactions"/>
                    <div className='myTransactionContainer'>
                        <div className='myTransactionBox'>
                            <h1>My Transactions</h1>
                            {myTransactions.length !== 0 &&
        myTransactions.map((transaction) => (
          <div key={transaction._id} className='myTransactionMessage'>
            {transaction.userFrom._id === user._id ? (
              <span>
                Paid {transaction.amount} to {transaction.userTo.name} on{' '}
                {String(transaction.createdAt).substring(0, 10)}
              </span>
            ) : (
              <span>
                Received {transaction.amount} from {transaction.userFrom.name} on{' '}
                {String(transaction.createdAt).substring(0, 10)}
              </span>
            )}
          </div>
        ))}
                            {myTransactions.length===0 && <h2 className='noTransactions'>No transactions performed yet !!!</h2>}
                        </div>
                    </div>
                </Fragment>
            }
        </Fragment>
    )
}

export default MyTransactions