import React, { useState, useEffect } from "react";
import { useRoutes } from 'hookrouter';
import Auth from "../Auth";
import Feed from "./feed";
import {HTML404 } from '../ErrorPage/Error';
import FullQuestion from "../Question/FullQuestion/fullQuestion"
import FirstTimeSetup from "../FirstTimeSetup/firstTimeSetup";

function getRoutes() {
  return {
    '/auth*': () =>  <Auth/>,
    '/viewFullQuestion/:quesId/:username' :({quesId, username}) => <FullQuestion quesId = {quesId} username = {username}/>,
    '/first-time-setup' : () => <FirstTimeSetup />,
    '/*' : () => <Feed />,
  }
}

function Render() {
  const page = useRoutes(getRoutes());
  return (
    page 
    || <HTML404 />
  );
}

export default Render;