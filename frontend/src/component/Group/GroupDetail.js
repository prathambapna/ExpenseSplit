import React, { Fragment , useEffect} from 'react';
import "./GroupDetails.css";
import Loader from "../layout/Loader/Loader";
import DeleteIcon from "@material-ui/icons/Delete";
import Expense from "../Expense/Expense.js";
import CreateExpenseButton from '../Expense/createExpenseButton.js';
import SettleBalanceButton from "../Expense/settleBalance.js";
import {useSelector,useDispatch} from "react-redux";
import {useAlert} from "react-alert";
import { useNavigate } from 'react-router-dom';
import MetaData from '../layout/MetaData';
import { groupDetails,clearErrors,groupBalances } from '../../actions/groupAction';
import { useParams } from 'react-router-dom';

const GroupDetail = () => {
    const {groupId}=useParams();
    const dispatch=useDispatch();
    const alert=useAlert();
    const {loading,error,group}=useSelector((state)=>state.groupDetail);
    const {errorGroupBalance,groupBalance}=useSelector((state)=>state.groupBalances);
    const navigate =useNavigate();


    const changeGroupNameHandler=(e)=>{
        e.preventDefault();
        navigate(`/group/${groupId}/update`);
    }

    const addMemberHandler=(e)=>{
        e.preventDefault();
        navigate(`/group/${groupId}/addUser`);
    }


    const deleteMemberHandler=(e,userId)=>{
        e.preventDefault();
        navigate(`/group/${groupId}/user/${userId}`);
    }
    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        if(errorGroupBalance){
            alert.error(errorGroupBalance);
            dispatch(clearErrors());
        }
      
        dispatch(groupDetails(groupId));
        dispatch(groupBalances(groupId));
      
    }, [dispatch,alert,error,groupId,errorGroupBalance])

    if (loading) {
        return <Loader />;
    }

    if (!group || !group.createdBy || !groupBalance) {
        return null; 
    }

    const createdBy = group.createdBy;
    const createdByName = createdBy.name;
    console.log(group);
    return (
        <Fragment>
                {loading===true?<Loader /> : <Fragment>
                <MetaData title= "FairShare"/>
                    <div className='GroupDetailContainer'>
                        <div className='leftSide'>
                            <div className='groupNameSection'>
                                <h1>{group.name}</h1>
                                <div className='changeGroupNameButton'>
                                    <button onClick={changeGroupNameHandler}>Change Group Name</button>
                                </div>
                            </div>
                            <div className='AdminSection'>
                                <p>Admin : &nbsp;</p>
                                <span> {createdByName}</span>
                            </div>
                            <div className='createdAtSection'>
                                <p>Created On : &nbsp;</p>
                                <span> {String(group.createdAt).substring(0,10)}</span>
                            </div>
                            <div className='groupMemberSection'>
                                <h2>Members</h2>
                                <div className='members'>
                                    {group && group.participants && group.participants.map((user)=>
                                    <div className='singleMember'>
                                        <img 
                                            src={(user.avatar.url && user.avatar.url!=="profile pic url") ? user.avatar.url:"/Profile.png"}
                                            alt="Profile"
                                        />
                                        <span>{user.name}</span>
                                        <span className='deleteButton' onClick={(e) => deleteMemberHandler(e, user._id)}><DeleteIcon /></span>
                                    </div>)
                                    }
                                </div>
                                <div className='addMemberButton'>
                                    <button onClick={addMemberHandler}>Add Member</button>
                                </div>
                            </div>
                        </div>
                        <div className='middleSide'>
                            <div className='middleHeading'>
                                <h1>Group Expenses</h1>
                            </div>
                            <div className='expenseContainer'>
                                {group && group.expenses.length>0 && group.expenses.map((expense)=><Expense expense={expense} group={group._id} />)}
                                {(!group || group.expenses.length===0 )&& <p className='noExpense'>No expenses yet! Create One.</p>}
                            </div>
                            <div className='createExpenseBtn'>
                                <CreateExpenseButton group={group._id}/>
                            </div>
                        </div>
                        <div className='rightSide'>
                            <div className='rightHeading'>
                                    <h1>Balances</h1>
                            </div>
                            <div className='balanceContainer'>
                                {groupBalance && groupBalance.length>0 && groupBalance.map((balance)=>
                                    <div className='singleBalanceContainer'>
                                        <div className='balanceMsg'>{balance.message}</div>
                                        <SettleBalanceButton group={group._id} bal={balance._id}/>
                                    </div>
                                
                                )}
                                {(!groupBalance || groupBalance.length===0 )&& <p className='noBalance'>Hurray , No Balances due!</p>}
                            </div>
                        </div>
                    </div>
                </Fragment>}
                
            </Fragment>
    )
}

export default GroupDetail