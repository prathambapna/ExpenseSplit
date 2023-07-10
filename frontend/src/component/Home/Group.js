import React from 'react'
import {Link} from "react-router-dom";

const Group = ({group}) => {
  return (
    <Link className="groupCard" to={group._id}>
        <div>
            <h1>{group.name}</h1>
            <p>{group.description}</p>
            <p className="noOfMembers">Total members : {group.participants.length}</p>
        </div>
    </Link>
  )
}

export default Group