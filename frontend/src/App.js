import './App.css';
import Header from "./component/layout/Header/Header.js";
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
import Profile from "./component/User/Profile.js"

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
      {/* <Header /> */}

      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route exact path="/" Component={Home}/>
        <Route exact path="/login" Component={LoginSignUp} />
        <Route exact path="/account" Component={Profile} />
      </Routes>
      <Footer />
    </Router>
  );  
}

export default App;
