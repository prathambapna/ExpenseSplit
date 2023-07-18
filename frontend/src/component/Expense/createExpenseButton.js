import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./Expense.css"

const CreateExpenseButton = ({group}) => {
    const navigate =useNavigate();
    const createExpenseHandler=(e)=>{
        e.preventDefault();
        navigate(`/group/${group}/newExpense/create`);
    }
    return (
        <div className='createExpenseButton'>
            <button onClick={createExpenseHandler}>Create New Expense</button>
        </div>
    )
}

export default CreateExpenseButton