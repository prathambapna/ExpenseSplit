import React, { Fragment,useEffect } from 'react'
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import Group from "./Group.js"
import MetaData from '../layout/MetaData';
import LoginButton from '../layout/Header/LoginButton';
import { myGroups,clearErrors } from '../../actions/groupAction';
import { useSelector,useDispatch } from 'react-redux';
import CreateGroupButton from './createGroupButton';
import Loader from '../layout/Loader/Loader';
import { useAlert } from 'react-alert';

const Home = () => {
  const {isAuthenticated}=useSelector(state=>state.user);
  const {loading,groups,error}=useSelector(state=>state.groups);
  const dispatch=useDispatch();
  const alert=useAlert();

  useEffect(() => {
    if(error){
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(myGroups());
  }, [dispatch,error,alert])
  

  return (
    <Fragment>
      {loading===true?<Loader/>:
            <Fragment>
              <MetaData title="FairShare"/>
              {!isAuthenticated && <LoginButton/>}
              <div className="banner">
                  <p>Welcome to FairShare</p>
                  <h1>FIND YOUR GROUPS BELOW</h1>
                  <a href="#homeHeading">
                    <button>
                      Scroll <CgMouse />
                    </button>
                  </a>
              </div>
              <h2 className="homeHeading" id='homeHeading'>My Groups</h2>
              <div className="container" id="container">
                {!isAuthenticated && <p className='noGroups'>Oops , please do Login to access your groups!!</p>}
                {isAuthenticated && groups.length===0 && <p className='noGroups'>"Looks like you're not part of any groups yet. Why not create one and start sharing expenses?"</p>}
                {isAuthenticated && groups && groups.map((group)=><Group group={group} />)}
              </div>
              <div className='createGroupBtn'>
                {isAuthenticated && <CreateGroupButton/>}
              </div>
          </Fragment>
      }
    </Fragment>
  )
}

export default Home
