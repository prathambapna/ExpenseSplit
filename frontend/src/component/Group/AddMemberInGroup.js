import React, { Fragment , useEffect} from 'react';
import "./AddMember.css";
import Loader from "../layout/Loader/Loader";
import {useSelector,useDispatch} from "react-redux";
import {useAlert} from "react-alert";
import { useNavigate } from 'react-router-dom';
import MetaData from '../layout/MetaData';
import { groupDetails,clearErrors, addMember } from '../../actions/groupAction';
import {allUsersDetails} from "../../actions/userAction";
import { useParams } from 'react-router-dom';
import { ADD_MEMBER_RESET } from '../../constants/groupConstants';
import SearchBar from "./SearchBar.js";

const AddMemberInGroup = () => {
    const dispatch=useDispatch();
    const alert=useAlert();
    const navigate=useNavigate();

    const {loading,success,error}=useSelector((state)=>state.addMember);
    const {error:groupDetailsError,group}=useSelector((state)=>state.groupDetail);
    const {error:allUsersError,users}=useSelector((state)=>state.allUsers);
    const {groupId}=useParams();


    useEffect(() => {

        dispatch(groupDetails(groupId));
        dispatch(allUsersDetails());

        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        if(groupDetailsError){
            alert.error(groupDetailsError);
            dispatch(clearErrors());
        }
        if(allUsersError){
            alert.error(allUsersError);
            dispatch(clearErrors());
        }
        if(success){
            alert.success(`Member added Successfully to ${group.name}!`);
            navigate(`/group/${groupId}`);
            dispatch({type:ADD_MEMBER_RESET});
        }
    }, [success,error,groupDetailsError,allUsersError,dispatch,navigate,alert,group.name,groupId])
    

    const addMemberHandler=(userId)=>{
        const myForm=new FormData();
        myForm.set("userId", userId);
        dispatch(addMember(groupId,myForm));
    }
    return(
        <Fragment>
            {loading?<Loader/>:
            <Fragment>
                <MetaData title="Add Member" />
                <div className="addMemberContainer">
                    <h1>{group.name}</h1>
                    <SearchBar allUsers={users} onAddUser={addMemberHandler} />
                </div>
            </Fragment>}
        </Fragment>
    )
}

export default AddMemberInGroup