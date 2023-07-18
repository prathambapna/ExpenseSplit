import React, { Fragment ,useState, useEffect} from 'react';
import "./CreateGroup.css";
import Loader from "../layout/Loader/Loader";
import FaceIcon from "@material-ui/icons/Face";
import {useSelector,useDispatch} from "react-redux";
import {useAlert} from "react-alert";
import { useNavigate } from 'react-router-dom';
import MetaData from '../layout/MetaData';
import { clearErrors, createGroup } from '../../actions/groupAction';
import { CREATE_GROUP_RESET } from '../../constants/groupConstants';

const CreateGroup = () => {

    const {loading,success,error}=useSelector((state)=>state.newGroup);
    const [name, setName] = useState("");

    const dispatch=useDispatch();
    const alert=useAlert();
    const navigate = useNavigate();


    const createGroupSubmit=(e)=>{
        e.preventDefault();

        const myForm=new FormData();
        myForm.set("name", name);
        dispatch(createGroup(myForm));
    }

    useEffect(() => {
      if(error){
        alert.error(error);
        dispatch(clearErrors());
      }
      if(success){
        alert.success("Group Created Successfully!");
        navigate("/");
        dispatch({type:CREATE_GROUP_RESET});
      }
    }, [dispatch,error,alert,navigate,success]);

    return (
        <Fragment>
                {loading?<Loader /> : <Fragment>
                <MetaData title= "CreateGroup"/>
                    <div className='CreateGroupContainer'>
                        <div className='CreateGroupBox'>
                            <form className='createGroupForm' onSubmit={createGroupSubmit}>
                                <h1>Enter Group Name</h1>
                                <div className='groupName'>
                                    <FaceIcon />
                                    <input
                                        type="text"
                                        placeholder=' Group Name'
                                        required
                                        name="name"
                                        value={name}
                                        onChange={(e)=>setName(e.target.value)}
                                    />
                                </div>
                                <input type="submit" value="Create" className="createGrpBtn" />
                            </form>
                        </div>
                    </div>
                </Fragment>}
        </Fragment>
    )
}

export default CreateGroup