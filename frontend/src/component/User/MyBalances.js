import React, { Fragment,useEffect } from 'react'
import "./MyBalances.css";
import MetaData from '../layout/MetaData';
import { myBalancesAction ,clearErrors} from '../../actions/userAction';
import {useAlert} from "react-alert";
import { useSelector,useDispatch } from 'react-redux';
import Loader from '../layout/Loader/Loader';

const MyBalances = () => {
    const {loading,myBalances,error}=useSelector(state=>state.myBalances);
    const dispatch=useDispatch();
    const alert=useAlert();

    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(myBalancesAction());
    }, [dispatch,error,alert])

    return (
        <Fragment>
            {loading?<Loader/>:
                <Fragment>
                    <MetaData title="My Balances"/>
                    <div className='myBalanceContainer'>
                        <div className='myBalanceBox'>
                            <h1>My Balances</h1>
                            {myBalances.length!==0 && myBalances.map((balance)=><div className='myBalanceMessage'>{balance.message}</div>)}
                            {myBalances.length!==0 && <h2>Hope We Clear This Soon !!!</h2>}
                            {myBalances.length===0 && <h2 className='noBalances'>Hurray , No Balances due!</h2>}
                        </div>
                    </div>
                </Fragment>
            }
        </Fragment>
    )
}

export default MyBalances