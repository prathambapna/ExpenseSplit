import React, { Fragment } from 'react'
import "./Header.css"
import {SpeedDial,SpeedDialAction} from "@material-ui/lab";
import { useState } from 'react';
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import HomeIcon from "@material-ui/icons/Home";
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import Backdrop from '@material-ui/core/Backdrop';
import {useNavigate} from "react-router-dom";
import { useAlert } from 'react-alert';
import {logout} from "../../../actions/userAction";
import { useDispatch} from 'react-redux';

const UserOptions = ({user}) => {

    const [open, setOpen] = useState(false);
    const dispatch=useDispatch();
    const navigate = useNavigate();
    const alert=useAlert();

    const options=[
        {icon:<HomeIcon/>, name:"Home",func:home},
        {icon:<PersonIcon/>, name:"Profile",func:me},
        {icon:<AccountBalanceIcon/>, name:"Balances",func:balance},
        {icon:<ExitToAppIcon/>, name:"Logout",func:logoutUser},
    ];

    function home(){
        navigate("/");
    }
    
    function me(){
        navigate("/me");
    }

    function logoutUser(){
        dispatch(logout());
        alert.success("Logout Successfully");
    }

    function balance(){
        navigate("/me/balances");
    }

    return (
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
        </Fragment>
    )
}

export default UserOptions