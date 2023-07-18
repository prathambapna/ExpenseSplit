import React, { Fragment , useState,useEffect,useCallback} from 'react';
import Loader from "../layout/Loader/Loader";
import {useSelector,useDispatch} from "react-redux";
import {useAlert} from "react-alert";
import { useNavigate } from 'react-router-dom';
import MetaData from '../layout/MetaData';
import {clearErrors, deleteMember } from '../../actions/groupAction';
import { useParams } from 'react-router-dom';
import { DELETE_MEMBER_RESET } from '../../constants/groupConstants';

const DeleteMemberInGroup = () => {
    const dispatch=useDispatch();
    const alert=useAlert();
    const navigate=useNavigate();

    const {loading,isDeleted,error}=useSelector((state)=>state.deleteMember);
    const {groupId,userId}=useParams();
    
    const [isHandlingDelete, setIsHandlingDelete] = useState(false);

    const deleteMemberHandler = useCallback(() => {
        setIsHandlingDelete(true);
        dispatch(deleteMember(groupId, userId));
    }, [dispatch, groupId, userId]);


    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearErrors());
            navigate(`/group/${groupId}`);
        }

        if(isDeleted){
            alert.success("User removed Successfully from Group");
            navigate(`/group/${groupId}`);
            dispatch({type:DELETE_MEMBER_RESET});
        }
        else if (!isHandlingDelete) {
            deleteMemberHandler();
        }
    }, [error,dispatch,navigate,alert,groupId,isDeleted,deleteMemberHandler, isHandlingDelete])
    


    return (
        <Fragment>
            {loading?<Loader/>:
            <Fragment>
                <MetaData title="Delete Member" />
            </Fragment>}
        </Fragment>
    )
}

export default DeleteMemberInGroup