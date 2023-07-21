import React from 'react'
import {Link} from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import { useNavigate } from 'react-router-dom';
import "./Home.css";

const Group = ({group}) => {
  const navigate =useNavigate();

  const deleteGroupHandler=(e)=>{
    
    e.preventDefault();
    const isConfirmed = window.confirm('Are you sure you want to delete this group?');

    if (isConfirmed) {
      navigate(`/group/${group._id}/delete`);
    }
  }

  return (
    <Link className="groupCard" to={`/group/${group._id}`}>
        <div>
            <h1>{group.name}</h1>
            <p>Admin :{group.createdBy.name}</p>
            <p className="noOfMembers">Total members : {group.participants.length}</p>
            {(group.balances.length>0)?<p>Unsettled Debts</p>:<p>All settled Up!!</p>}
            <div className='deleteGroupButton' onClick={(e) => deleteGroupHandler(e)}><DeleteIcon /></div>
        </div>
    </Link>
  )
}

export default Group