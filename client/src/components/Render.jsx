import React, { useState, useEffect } from "react";
import { useRoutes } from 'hookrouter';
import Auth from "./Auth";
import Feed from "./feed";
import {HTML404 } from './ErrorPage/Error';
import FullQuestion from "./Main/fullQuestion"
import FirstTimeSetup from "./FirstTimeSetup/firstTimeSetup";

function getRoutes() {
  return {
    '/auth*': () =>  <Auth/>,
    '/viewFullQuestion/:quesId' :({quesId}) => <FullQuestion quesId = {quesId}/>,
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