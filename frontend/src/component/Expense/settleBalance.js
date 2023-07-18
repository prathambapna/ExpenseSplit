import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./Expense.css"

const SettleBalanceButton = ({group,bal}) => {
    const navigate =useNavigate();
    const settleBalanceHandler=(e)=>{
        e.preventDefault();
        navigate(`/group/${group}/settleBalance/${bal}`);
    }
    return (
        <div className='settleBalanceButton'>
            <button onClick={settleBalanceHandler}>Settle Balance</button>
        </div>
    )
}

export default SettleBalanceButton