import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./Home.css"

const CreateGroupButton = () => {
    const navigate =useNavigate();
    const createGroupHandler=(e)=>{
        e.preventDefault();
        navigate("/newGroup/create");
    }
    return (
        <div className='createGroupButton'>
            <button onClick={createGroupHandler}>Create New Group</button>
        </div>
    )
}

export default CreateGroupButton