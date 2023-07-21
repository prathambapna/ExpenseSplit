import React, { Fragment , useState,useEffect,useCallback} from 'react';
import Loader from "../layout/Loader/Loader";
import {useSelector,useDispatch} from "react-redux";
import {useAlert} from "react-alert";
import { useNavigate } from 'react-router-dom';
import MetaData from '../layout/MetaData';
import { removeAvatar,clearErrors, loadUser } from '../../actions/userAction';
import { REMOVE_AVATAR_RESET } from '../../constants/userConstants';

const RemoveAvatar = () => {
    const dispatch=useDispatch();
    const alert=useAlert();
    const navigate=useNavigate();

    const {loading,isAvatarRemoved,error}=useSelector((state)=>state.removeAvatar);
    
    const [isHandlingDeleteAvatar, setIsHandlingDeleteAvatar] = useState(false);

    const removeAvatarHandler = useCallback(() => {
        setIsHandlingDeleteAvatar(true);
        dispatch(removeAvatar());
    }, [dispatch]);


    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearErrors());
            navigate(`/me`);
        }

        if(isAvatarRemoved){
            alert.success("Profile Picture removed Successfully");
            navigate(`/me`);
            dispatch({type:REMOVE_AVATAR_RESET});
            dispatch(loadUser());
        }
        else if (!isHandlingDeleteAvatar) {
            removeAvatarHandler();
        }
    }, [error,dispatch,navigate,alert,isAvatarRemoved,removeAvatarHandler, isHandlingDeleteAvatar])
    


    return (
        <Fragment>
            {loading?<Loader/>:
            <Fragment>
                <MetaData title="Remove Avatar" />
            </Fragment>}
        </Fragment>
    )
}

export default RemoveAvatar