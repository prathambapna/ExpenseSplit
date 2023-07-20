import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./Expense.css"

const SettleBalanceButton = ({group,bal}) => {
    const navigate =useNavigate();

    const settleBalanceHandler=(e)=>{
        e.preventDefault();
        const isConfirmed = window.confirm('Are you sure this balance is Settled?');

        if (isConfirmed) {
            navigate(`/group/${group}/settleBalance/${bal}`);
        }
    }

    return (
        <div className='settleBalanceButton'>
            <button onClick={(e)=>settleBalanceHandler(e)}>Settle Balance</button>
        </div>
    )
}

export default SettleBalanceButton