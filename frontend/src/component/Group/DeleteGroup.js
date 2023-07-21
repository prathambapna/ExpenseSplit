import React, { Fragment , useState,useEffect,useCallback} from 'react';
import Loader from "../layout/Loader/Loader";
import {useSelector,useDispatch} from "react-redux";
import {useAlert} from "react-alert";
import { useNavigate } from 'react-router-dom';
import MetaData from '../layout/MetaData';
import { useParams } from 'react-router-dom';
import { deleteGroup ,clearErrors} from '../../actions/groupAction';
import { DELETE_GROUP_RESET } from '../../constants/groupConstants';


const DeleteGroup = () => {
    const dispatch=useDispatch();
    const alert=useAlert();
    const navigate=useNavigate();

    const {loading,isDeleted,error}=useSelector((state)=>state.deleteGroup);
    const {groupId}=useParams();
    
    const [isHandlingDeleteGroup, setIsHandlingDeleteGroup] = useState(false);

    const deleteGroupHandler = useCallback(() => {
        setIsHandlingDeleteGroup(true);
        dispatch(deleteGroup(groupId));
    }, [dispatch, groupId]);


    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearErrors());
            navigate(`/`);
        }

        if(isDeleted){
            alert.success("Group deleted Successfully");
            navigate(`/`);
            dispatch({type:DELETE_GROUP_RESET});
        }
        else if (!isHandlingDeleteGroup) {
            deleteGroupHandler();
        }
    }, [error,dispatch,navigate,alert,isDeleted,deleteGroupHandler, isHandlingDeleteGroup])
    


    return (
        <Fragment>
            {loading?<Loader/>:
            <Fragment>
                <MetaData title="Delete Group" />
            </Fragment>}
        </Fragment>
    )
}

export default DeleteGroup