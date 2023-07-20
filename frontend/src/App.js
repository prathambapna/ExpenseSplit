import './App.css';
import Footer from "./component/layout/Footer/Footer.js";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WebFont from "webfontloader";
import React from 'react';
import Home from "./component/Home/Home.js";
import { LoginSignUp } from './component/User/LoginSignUp';
import store from "./store";
import { loadUser } from './actions/userAction';
import UserOptions from "./component/layout/Header/UserOptions.js";
import { useSelector } from 'react-redux';
import Profile from "./component/User/Profile.js";
import UpdateProfile from "./component/User/UpdateProfile.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.js";
import MyBalances from "./component/User/MyBalances.js";
import CreateGroup from "./component/Group/CreateGroup.js"
import GroupDetail from "./component/Group/GroupDetail.js";
import UpdateGroup from "./component/Group/UpdateGroup.js";
import AddMemberInGroup from "./component/Group/AddMemberInGroup.js";
import DeleteMemberInGroup from "./component/Group/DeleteMemberInGroup.js";
import CreateExpense from "./component/Expense/CreateExpense.js";
import ExpenseDetail from "./component/Expense/ExpenseDetail.js";
import DeleteExpense from "./component/Expense/DeleteExpense.js";
import UpdateExpense from "./component/Expense/UpdateExpense.js";
import ProtectedRoute from './component/Route/ProtectedRoute';


function App() {

  const {isAuthenticated,user}=useSelector(state=>state.user);
  React.useEffect(()=>{
    WebFont.load({
      google:{
        families:["Roboto","Droid Sans","Chilanka"],
      },
    });

    store.dispatch(loadUser());
  },[]);

  return(
    <Router>

      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/login" element={<LoginSignUp/>} />
        <Route exact path="/password/forgot" element={<ForgotPassword/>} />
        <Route exact path="/password/reset/:token" element={<ResetPassword/>} />
      </Routes>
      <ProtectedRoute exact path="/me" element={Profile} />
      <ProtectedRoute exact path="/me/update" element={UpdateProfile} />
      <ProtectedRoute exact path="/password/update" element={UpdatePassword} />
      <ProtectedRoute exact path="/me/balances" element={MyBalances} />
      <ProtectedRoute exact path="/newGroup/create" element={CreateGroup} />
      <ProtectedRoute exact path="/group/:groupId" element={GroupDetail} />
      <ProtectedRoute exact path="/group/:groupId/update" element={UpdateGroup} />
      <ProtectedRoute exact path="/group/:groupId/addUser" element={AddMemberInGroup} />
      <ProtectedRoute exact path="/group/:groupId/user/:userId" element={DeleteMemberInGroup} />
      <ProtectedRoute exact path="/group/:groupId/newExpense/create" element={CreateExpense} />
      <ProtectedRoute exact path="/group/:groupId/expense/:expenseId" element={ExpenseDetail} />
      <ProtectedRoute exact path="/group/:groupId/expense/:expenseId/delete" element={DeleteExpense} />
      <ProtectedRoute exact path="/group/:groupId/expense/:expenseId/update" element={UpdateExpense} />

      <Footer />
    </Router>
  );  
}

export default App;

