import React, { Fragment } from 'react'
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import Group from "./Group.js"
import MetaData from '../layout/MetaData';

const group={
    name:"Travel",
    description:"First day cab to office",
    participants:[],
    balances:[],
    expenses:[],
    createdBy:"4567890456789",
    createdAt:"23456789",
    _id:"pratham",
}

const Home = () => {
  return (
    <Fragment>
        <MetaData title="FairShare"/>
        <div className="banner">
            <p>Welcome to FairShare</p>
            <h1>FIND YOUR GROUPS BELOW</h1>
            <a href="#homeHeading">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
        </div>
        <h2 className="homeHeading" id='homeHeading'>My Groups</h2>
        <div className="container" id="container">
            <Group group={group} />
            <Group group={group} />
            <Group group={group} />
            <Group group={group} />
            <Group group={group} />
            <Group group={group} />
            <Group group={group} />
            <Group group={group} />
        </div>
    </Fragment>
  )
}

export default Home
