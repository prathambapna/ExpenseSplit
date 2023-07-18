import React from 'react'
import {Link} from "react-router-dom";
import "./Expense.css";

const Expense = ({expense,group}) => {
  return (
    <Link className="expenseCard" to={`/group/${group}/expense/${expense._id}`}>
        <div>
            <h1>{expense.title}</h1>
            <p>Total Spending :{expense.amount}</p>
            <p className="noOfMembers">Total members : {expense.participants.length}</p>
        </div>
    </Link>
  )
}

export default Expense