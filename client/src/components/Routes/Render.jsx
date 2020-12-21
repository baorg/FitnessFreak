import React, { useState, useEffect } from "react";
import { useRoutes } from 'hookrouter';
import Auth from "../Auth";
import Feed from "./feed";
import Profile from "../Profile";
import {HTML404 } from '../ErrorPage/Error';
import FullQuestion from "../Question/FullQuestion/fullQuestion"

function getRoutes() {
  return {
    '/auth*': () => <Auth />,
    '/profile/:user_id': ({user_id})=><Profile user_id={user_id} />,
    // '/viewFullQuestion/:quesId' :({quesId}) => <FullQuestion quesId = {quesId} />,
    '/*' : () => <Feed />,
  }
}

function Render() {
  const page = useRoutes(getRoutes());
  return ( page || <HTML404 /> );
}

export default Render;