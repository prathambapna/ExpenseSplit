import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./Header.css"

const LoginButton = () => {
    const navigate =useNavigate();
    const loginButtonHandler=(e)=>{
        e.preventDefault();
        navigate("/login");
    }
    return (
        <div className='loginButtonHomePage'>
            <button onClick={loginButtonHandler}>Login/SignUp</button>
        </div>
    )
}

export default LoginButton