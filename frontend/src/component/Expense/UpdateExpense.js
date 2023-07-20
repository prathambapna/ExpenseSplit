import React, { Fragment ,useState, useEffect} from 'react';
import "./UpdateExpense.css";
import Loader from "../layout/Loader/Loader";
import FaceIcon from "@material-ui/icons/Face";
import DescriptionIcon from "@material-ui/icons/Description";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import {useSelector,useDispatch} from "react-redux";
import {useAlert} from "react-alert";
import { useNavigate } from 'react-router-dom';
import MetaData from '../layout/MetaData';
import { clearErrors, editExpense, expenseDetails } from '../../actions/expenseAction';
import { useParams } from 'react-router-dom';
import { UPDATE_EXPENSE_RESET } from '../../constants/expenseConstants';
import {allUsersDetails} from "../../actions/userAction";
import SearchBarPayer from "./SearchBarPayer.js";
import SearchBarParticipants from "./SearchBarParticipants.js";

const UpdateExpense = () => {

    const dispatch=useDispatch();
    const alert=useAlert();
    const navigate = useNavigate();
    const {groupId,expenseId}=useParams();

    const {loading,isUpdated,error}=useSelector((state)=>state.editExpense);
    const {error:allUsersError,users}=useSelector((state)=>state.allUsers);
    const {error:expenseDetailsError,expense}=useSelector((state)=>state.expenseDetail);

    const [payerName, setPayerName] = useState('');

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [payer, setPayer] = useState('');
    const [participants, setParticipants] = useState([]);
    const [splitType, setSplitType] = useState('');


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'title':
                setTitle(value);
                break;
            case 'description':
                setDescription(value);
                break;
            case 'amount':
                setAmount(value);
                break;
            case 'splitType':
                setSplitType(value);
                break;
            default:
                break;
        }
    };

    const handlePayerChange = (user) => {
        setPayer(user._id);
        setPayerName(user.name);
    };

    const handleParticipantsChange = (p) => {
        setParticipants(p);
    };

    const handleShareChange = (e, user) => {
        const { value } = e.target;

        const participantIndex = participants.findIndex((p) => p.user === user._id);

        if (participantIndex !== -1) {
            const updatedParticipants = [...participants];
            updatedParticipants[participantIndex] = {
                ...updatedParticipants[participantIndex],
                share: Number(value),
            };
            setParticipants(updatedParticipants);
        }
    };

    const editExpenseSubmit=(e)=>{
        e.preventDefault();

        const formData=({
            title: title,
            description: description,
            amount: amount,
            payer: payer,
            participants: participants,
            splitType: splitType,
        });

        dispatch(editExpense(groupId,expenseId,formData));
    }


    useEffect(() => {
        if(users.length===0){
            dispatch(allUsersDetails());
        }

        if(expense && expense._id !== expenseId){
            dispatch(expenseDetails(groupId,expenseId));
        }
        else if (expense) {
            setTitle(expense.title);
            setDescription(expense.description);
            setAmount(expense.amount);
            setPayer(expense.payer);
            setParticipants(expense.participants);
            setSplitType(expense.splitType);
        }

        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        if(allUsersError){
            alert.error(allUsersError);
            dispatch(clearErrors());
        }

        if(expenseDetailsError){
            alert.error(expenseDetailsError);
            dispatch(clearErrors());
        }


        if(isUpdated){
            alert.success("Expense Updated Successfully!");
            navigate(`/group/${groupId}/expense/${expenseId}`);
            dispatch({type:UPDATE_EXPENSE_RESET});
        }

    }, [dispatch,error,alert,navigate,isUpdated,expenseId,expense,groupId,allUsersError,expenseDetailsError,users]);


    return (
        <Fragment>
            {loading?<Loader /> : <Fragment>
                <MetaData title= "Edit Expense"/>
                    <div className='EditExpenseContainer'>
                        <div className='EditExpenseBox'>
                            <form className='editExpenseForm' onSubmit={editExpenseSubmit}>
                                <h1>Edit Expense</h1>
                                <div className='editExpenseTitle'>
                                    <FaceIcon />
                                    <input
                                        type="text"
                                        placeholder=' Expense Title'
                                        required
                                        name="title"
                                        value={title}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className='editExpenseDescription'>
                                    <DescriptionIcon />
                                    <input
                                        type="text"
                                        placeholder=' Expense Description'
                                        required
                                        name="description"
                                        value={description}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className='editExpenseAmount'>
                                    <AttachMoneyIcon />
                                    <input
                                        type="number"
                                        placeholder=' Expense Amount'
                                        required
                                        name="amount"
                                        value={amount}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className='editExpenseSplitType'>
                                    <span>Split Type:</span>
                                    <select
                                        value={splitType}
                                        name="splitType"
                                        required
                                        onChange={handleInputChange}
                                    >
                                        <option value="equal">Equal</option>
                                        <option value="unequal">Unequal</option>
                                    </select>
                                </div>

                                <div className='editExpensePayer'>
                                    <span className='editPayerHeading'>Select Payer :</span>
                                    <div className='editSearchPayer'>
                                        <SearchBarPayer allUsers={users} onAddUser={(user) => {handlePayerChange(user)}} />
                                    </div>
                                </div>

                                <div className='editExpenseParticipants'>
                                    <span className='editParticipantsHeading'>Select Participants : </span>
                                    <div className='editSearchParticipants'>
                                        <SearchBarParticipants allUsers={users} onAddUsers={(p) => {handleParticipantsChange(p)}}  />
                                    </div>
                                </div>


                                <div className='editExpenseUsersInvolved'>
                                    <div className='editPayerName'>Payer selected : {payerName}</div>

                                    <div className='editParticpantsList'>
                                        <span className='editParticipantHeading'>Participants </span>
                                        {splitType==="equal" && participants && participants.map((p)=>{ 
                                            const user = users.find((user) => user._id === p.user);
                                            return (
                                                <div key={p.user}>
                                                    <span>{user && user.name}</span>
                                                </div>
                                            );
                                        })}

                                        {splitType==="unequal" && participants  && participants.map((participant) => {
                                            const user = users.find((user) => user._id === participant.user);
                                            return (
                                                <div key={participant.user}>
                                                    <span>{user && user.name}</span>
                                                    <input
                                                        type="number"
                                                        value={participant.share}
                                                        placeholder="Particpant's Share"
                                                        onChange={(e) => handleShareChange(e, user)}
                                                    />
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                <input type="submit" value="Edit" className="editExpenseBtn" />
                            </form>
                        </div>
                    </div>
                </Fragment>}
        </Fragment>
    )
}

export default UpdateExpense