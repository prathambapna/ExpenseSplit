import React, { Fragment ,useState, useEffect} from 'react';
import "./CreateExpense.css";
import Loader from "../layout/Loader/Loader";
import FaceIcon from "@material-ui/icons/Face";
import DescriptionIcon from "@material-ui/icons/Description";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import {useSelector,useDispatch} from "react-redux";
import {useAlert} from "react-alert";
import { useNavigate } from 'react-router-dom';
import MetaData from '../layout/MetaData';
import { clearErrors,createExpense } from '../../actions/expenseAction';
import { useParams } from 'react-router-dom';
import { CREATE_EXPENSE_RESET } from '../../constants/expenseConstants';
import {allUsersDetails} from "../../actions/userAction";
import SearchBarPayer from "./SearchBarPayer.js";
import SearchBarParticipants from "./SearchBarParticipants.js";

const CreateExpense = () => {
    const {loading,success,error}=useSelector((state)=>state.newExpense);
    const {error:allUsersError,users}=useSelector((state)=>state.allUsers);
    const {groupId}=useParams();
    

    const dispatch=useDispatch();
    const alert=useAlert();
    const navigate = useNavigate();

    const [payerName, setPayerName] = useState('');

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        amount: '',
        payer: {},
        participants: [],
        splitType: 'equal',
    });


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleShareChange = (e, user) => {
        const { value } = e.target;

        const participantIndex = formData.participants.findIndex((p) => p.user === user._id);

        if (participantIndex !== -1) {
            const updatedParticipants = [...formData.participants];
            updatedParticipants[participantIndex] = {
                ...updatedParticipants[participantIndex],
                share: Number(value), 
            };
            setFormData({ ...formData, participants: updatedParticipants });
        }
    };

    const createExpenseSubmit=(e)=>{
        e.preventDefault();

        dispatch(createExpense(groupId,formData));
    }


    useEffect(() => {
        dispatch(allUsersDetails());
        if(error){
            alert.error(error);
            dispatch(clearErrors());
            formData.participants=[];
            formData.payer={};
            setPayerName('');
        }
        if(allUsersError){
            alert.error(allUsersError);
            dispatch(clearErrors());
            formData.participants=[];
            formData.payer={};
            setPayerName('');
        }
        if(success){
            alert.success("Expense Created Successfully!");
            navigate(`/group/${groupId}`);
            dispatch({type:CREATE_EXPENSE_RESET});
        }
    }, [dispatch,error,alert,navigate,success,groupId,allUsersError,formData]);


    return (
        <Fragment>
            {loading?<Loader /> : <Fragment>
                <MetaData title= "Create Expense"/>
                    <div className='CreateExpenseContainer'>
                        <div className='CreateExpenseBox'>
                            <form className='createExpenseForm' onSubmit={createExpenseSubmit}>
                                <h1>Create Expense</h1>
                                <div className='expenseTitle'>
                                    <FaceIcon />
                                    <input
                                        type="text"
                                        placeholder=' Expense Title'
                                        required
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className='expenseDescription'>
                                    <DescriptionIcon />
                                    <input
                                        type="text"
                                        placeholder=' Expense Description'
                                        required
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className='expenseAmount'>
                                    <AttachMoneyIcon />
                                    <input
                                        type="number"
                                        placeholder=' Expense Amount'
                                        required
                                        name="amount"
                                        value={formData.amount}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className='expenseSplitType'>
                                    <span>Split Type:</span>
                                    <select
                                        value={formData.splitType}
                                        name="splitType"
                                        required
                                        onChange={handleInputChange}
                                    >
                                        <option value="equal">Equal</option>
                                        <option value="unequal">Unequal</option>
                                    </select>
                                </div>

                                <div className='expensePayer'>
                                    <span className='payerHeading'>Select Payer :</span>
                                    <div className='searchPayer'>
                                        <SearchBarPayer allUsers={users} onAddUser={(user) => {setFormData({ ...formData, payer: user._id });setPayerName(user.name)}} />
                                    </div>
                                </div>

                                <div className='expenseParticipants'>
                                    <span className='participantsHeading'>Select Participants : </span>
                                    <div className='searchParticipants'>
                                        <SearchBarParticipants allUsers={users} onAddUsers={(p) => setFormData({ ...formData, participants: p })}  />
                                    </div>
                                </div>


                                <div className='expenseUsersInvolved'>
                                    <div className='payerName'>Payer selected : {payerName}</div>

                                    <div className='particpantsList'>
                                        <span className='participantHeading'>Participants </span>
                                        {formData.splitType==="equal" && formData.participants && formData.participants.map((p)=>{ 
                                            const user = users.find((user) => user._id === p.user);
                                            return (
                                                <div key={p.user}>
                                                    <span>{user && user.name}</span>
                                                </div>
                                            );
                                        })}

                                        {formData.splitType==="unequal" && formData.participants  && formData.participants.map((participant) => {
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

                                <input type="submit" value="Create" className="createExpenseBtn" />
                            </form>
                        </div>
                    </div>
                </Fragment>}
        </Fragment>
    )
}

export default CreateExpense