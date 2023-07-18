import React, { Fragment ,useState, useEffect} from 'react';
import "./UpdateGroup.css";
import Loader from "../layout/Loader/Loader";
import FaceIcon from "@material-ui/icons/Face";
import {useSelector,useDispatch} from "react-redux";
import {useAlert} from "react-alert";
import { useNavigate } from 'react-router-dom';
import MetaData from '../layout/MetaData';
import { updateGroup ,clearErrors} from '../../actions/groupAction';
import { UPDATE_GROUP_RESET } from '../../constants/groupConstants';
import { useParams } from 'react-router-dom';

const UpdateGroup = () => {
    const dispatch=useDispatch();
    const alert=useAlert();
    const navigate = useNavigate();
    const {groupId}=useParams();
    const {error:groupDetailError,group}=useSelector((state)=>state.groupDetail);
    const {error,isUpdated,loading} =useSelector((state)=>state.updateGroup);

    const [name, setName] = useState("");

    const updateGroupSubmit=(e)=>{
        e.preventDefault();

        const myForm=new FormData();
        myForm.set("name", name);
        dispatch(updateGroup(groupId,myForm));
    }

    useEffect(() => {
        if(group){
            setName(group.name);
        }
        
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }

        if(groupDetailError){
            alert.error(groupDetailError);
            dispatch(clearErrors());
        }
        if(isUpdated){
            alert.success("Group updated successfully");
            navigate(`/group/${groupId}`);
            dispatch({
                type:UPDATE_GROUP_RESET
            });
        }
    }, [dispatch,error,alert,navigate,isUpdated,group,groupDetailError,groupId]);
    

    return (
        <Fragment>
        {loading===true ? (
            <Loader />
        ) : (
            <Fragment>
            <MetaData title="Update Group" />
            <div className="updateGroupContainer">
                <div className="updateGroupBox">
                <h2 className="updateGroupHeading">Update Group</h2>

                <form
                    className="updateGroupForm"
                    onSubmit={updateGroupSubmit}
                >
                    <div className="updateGroupName">
                    <FaceIcon />
                    <input
                        type="text"
                        placeholder="Group Name"
                        required
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    </div>
                    <input
                    type="submit"
                    value="Update"
                    className="updateGroupBtn"
                    />
                </form>
                </div>
            </div>
            </Fragment>
        )}
        </Fragment>
    )
}

export default UpdateGroup