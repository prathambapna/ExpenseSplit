import React from 'react'
import {Link} from "react-router-dom";

const Group = ({group}) => {
  return (
    <Link className="groupCard" to={`/group/${group._id}`}>
        <div>
            <h1>{group.name}</h1>
            <p>Admin :{group.createdBy.name}</p>
            <p className="noOfMembers">Total members : {group.participants.length}</p>
            {(group.balances.length>0)?<p>Unsettled Debts</p>:<p>All settled Up!!</p>}
        </div>
    </Link>
  )
}

export default Group