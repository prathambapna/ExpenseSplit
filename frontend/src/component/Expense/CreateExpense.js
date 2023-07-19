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

const CreateExpense = () => {
    const {loading,success,error}=useSelector((state)=>state.newExpense);
    const {error:allUsersError,users}=useSelector((state)=>state.allUsers);
    const {groupId}=useParams();
    

    const dispatch=useDispatch();
    const alert=useAlert();
    const navigate = useNavigate();

    const [payer, setPayer] = useState('');
    const [payerName, setPayerName] = useState('');

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        amount: null,
        payer: payer ? payer._id : null,
        participants: [],
        splitType: 'equal',
    });


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    useEffect(() => {
        dispatch(allUsersDetails());
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        if(allUsersError){
            alert.error(allUsersError);
            dispatch(clearErrors());
        }
        if(success){
            alert.success("Expense Created Successfully!");
            navigate(`/group/${groupId}`);
            dispatch({type:CREATE_EXPENSE_RESET});
        }
    }, [dispatch,error,alert,navigate,success,groupId,allUsersError]);


    return (
        <Fragment>
            {loading?<Loader /> : <Fragment>
                <MetaData title= "Create Expense"/>
                    <div className='CreateExpenseContainer'>
                        <div className='CreateExpenseBox'>
                            <form >
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
                                    <span>Select Payer</span>
                                    <SearchBarPayer allUsers={users} onAddUser={(user) => {setPayer(user._id);setPayerName(user.name)}} />
                                    <span>{payerName}</span>
                                </div>
                            </form>
                        </div>
                    </div>
                </Fragment>}
        </Fragment>
    )
}

export default CreateExpense