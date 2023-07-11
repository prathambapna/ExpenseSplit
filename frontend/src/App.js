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
      </Routes>
      <ProtectedRoute exact path="/me" element={Profile} />
      <ProtectedRoute exact path="/me/update" element={UpdateProfile} />
      <Footer />
    </Router>
  );  
}

export default App;