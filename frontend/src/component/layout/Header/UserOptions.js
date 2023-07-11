import React, { Fragment } from 'react'
import "./Header.css"
import {SpeedDial,SpeedDialAction} from "@material-ui/lab";
import { useState } from 'react';
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import HomeIcon from "@material-ui/icons/Home";
import Backdrop from '@material-ui/core/Backdrop';
import {useNavigate} from "react-router-dom";
import { useAlert } from 'react-alert';
import {logout} from "../../../actions/userAction";
import { useDispatch ,useSelector} from 'react-redux';
import Loader from '../Loader/Loader';

const UserOptions = ({user}) => {

    const [open, setOpen] = useState(false);
    const dispatch=useDispatch();
    const navigate = useNavigate();
    const alert=useAlert();

    const options=[
        {icon:<HomeIcon/>, name:"Home",func:home},
        {icon:<PersonIcon/>, name:"Profile",func:account},
        {icon:<ExitToAppIcon/>, name:"Logout",func:logoutUser},
    ];
    const {loading}=useSelector(state=>state.user);

    function home(){
        navigate("/");
    }
    
    function account(){
        navigate("/account");
    }

    function logoutUser(){
        dispatch(logout());
        alert.success("Logout Successfully");
    }

    return (
        <Fragment>
            {loading ?
                <Loader/>:
                    <Fragment>
                    <Backdrop open={open} style={{zIndex:10}}/>
                    <SpeedDial
                        className='speedDial'
                        ariaLabel="SpeedDial tooltip example"
                        onClose={()=>setOpen(false)}
                        onOpen={()=>setOpen(true)}
                        open={open}
                        direction='down'
                        icon={<img 
                            className='speedDialIcon'
                            src={(user.avatar.url && user.avatar.url!=="profile pic url") ? user.avatar.url:"/Profile.png"}
                            alt="Profile"
                        />}
                    >

                    {options.map((item)=>(
                        <SpeedDialAction key={item.name} icon={item.icon} tooltipTitle={item.name} onClick={item.func}/>
                    ))}

                    </SpeedDial>
                </Fragment>}
        </Fragment>
       
    )
}

export default UserOptions