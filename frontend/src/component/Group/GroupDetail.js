import React, { Fragment, useRef ,useState, useEffect} from 'react';
import "./GroupDetails.css";
import Loader from "../layout/Loader/Loader";
import { Link } from 'react-router-dom';
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face";

import {useSelector,useDispatch} from "react-redux";
import {useAlert} from "react-alert";
import { useNavigate } from 'react-router-dom';
import MetaData from '../layout/MetaData';
import { groupDetails,clearErrors } from '../../actions/groupAction';
import { useParams } from 'react-router-dom';

const GroupDetail = () => {
    const dispatch=useDispatch();
    const alert=useAlert();
    const {groupId}=useParams();
    const {loading,success,error,group}=useSelector(state=>state.groupDetail);
    const navigate =useNavigate();
    const changeGroupNameHandler=(e)=>{
        e.preventDefault();
        navigate(`/group/${groupId}/update`);
    }
    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
      
        dispatch(groupDetails(groupId));
      
    }, [dispatch,alert,error,groupId])

    if (loading) {
        return <Loader />;
    }

    if (!group || !group.createdBy) {
        return null; 
    }

    const createdBy = group.createdBy;
    const createdByName = createdBy.name;
    
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
                                    </div>)
                                    }
                                </div>
                            </div>
                        </div>
                        <div className='rightSide'>
                        {/* toggle between expenses and balances */}
                        </div>
                    </div>
                </Fragment>}
                
            </Fragment>
    )
}

export default GroupDetail