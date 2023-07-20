import React from 'react'
import {Link} from "react-router-dom";
import "./Expense.css";
import DeleteIcon from "@material-ui/icons/Delete";
import { useNavigate } from 'react-router-dom';

const Expense = ({expense,group}) => {

  const navigate =useNavigate();

  const deleteExpenseHandler=(e)=>{
    
    e.preventDefault();
    const isConfirmed = window.confirm('Are you sure you want to delete this expense?');

    if (isConfirmed) {
      navigate(`/group/${group}/expense/${expense._id}/delete`);
    }
  }
  
  return (
    <Link className="expenseCard" to={`/group/${group}/expense/${expense._id}`}>
        <div>
            <h1>{expense.title}</h1>
            <p>Total Spending :{expense.amount}</p>
            <p className="noOfMembers">Total members : {expense.participants.length}</p>
            <div className='deleteExpenseButton' onClick={(e) => deleteExpenseHandler(e)}><DeleteIcon /></div>
        </div>
    </Link>
  )
}

export default Expense