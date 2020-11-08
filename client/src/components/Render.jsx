import React, { useState, useEffect } from "react";
// import App from "./Main/App";
// import User from './User/User';
import { useRoutes } from 'hookrouter';
// import {HTML404 } from './ErrorPage/Error';
import Login from "./Login/Login";
// import axios from "axios";
// import Feed from "./feed";

// import SetUsername from './SetUsername/SetUsername';


function getRoutes() {
  return {
    '/' : () => <Login />,
    // '/feed*': () =>  <Feed/>,
  }
}

function Render() {
  
  
  const page = useRoutes(getRoutes());
  return (
    page 
    // || <HTML404 />
  );
}

export default Render;