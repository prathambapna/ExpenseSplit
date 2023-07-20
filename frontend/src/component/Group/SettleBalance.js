import React, { Fragment , useState,useEffect,useCallback} from 'react';
import Loader from "../layout/Loader/Loader";
import {useSelector,useDispatch} from "react-redux";
import {useAlert} from "react-alert";
import { useNavigate } from 'react-router-dom';
import MetaData from '../layout/MetaData';
import { useParams } from 'react-router-dom';
import { settleBalanceInGroup,clearErrors } from '../../actions/groupAction';
import { SETTLE_BALANCE_RESET } from '../../constants/groupConstants';


const SettleBalance = () => {
    const dispatch=useDispatch();
    const alert=useAlert();
    const navigate=useNavigate();

    const {loading,isSettled,error}=useSelector((state)=>state.settleBalance);
    const {groupId,balanceId}=useParams();
    
    const [isHandlingSettle, setIsHandlingSettle] = useState(false);

    const settleExpensesHandler = useCallback(() => {
        setIsHandlingSettle(true);
        dispatch(settleBalanceInGroup(groupId,balanceId));
    }, [dispatch, groupId, balanceId]);


    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearErrors());
            navigate(`/group/${groupId}`);
        }

        if(isSettled){
            alert.success("Cheers! Balance settled Successfully");
            navigate(`/group/${groupId}`);
            dispatch({type:SETTLE_BALANCE_RESET});
        }
        else if (!isHandlingSettle) {
            settleExpensesHandler();
        }
    }, [error,dispatch,navigate,alert,groupId,isSettled,settleExpensesHandler, isHandlingSettle])
    


    return (
        <Fragment>
            {loading?<Loader/>:
            <Fragment>
                <MetaData title="Settle Balance" />
            </Fragment>}
        </Fragment>
    )
}

export default SettleBalance