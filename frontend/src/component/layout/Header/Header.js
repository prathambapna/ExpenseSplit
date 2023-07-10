import React from 'react'
import profile from "../../../images/Profile.png";
import "./Header.css";
import { Link } from 'react-router-dom';
const Header = () => {
  return <header>
    <span>
      <Link className="toHome" to="/">
        Home
      </Link>
    </span>
    <span>
      <Link className="toProfile" to="/me">
        <img src={profile} alt='profile'></img>
      </Link>
    </span>
  </header>
}

export default Header