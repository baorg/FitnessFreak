import React, { useState, useEffect } from "react";
import { useRoutes } from 'hookrouter';
import Auth from "../Auth";
import Feed from "./feed";
import Profile from "../Profile";
import {HTML404 } from '../ErrorPage/Error';
import FullQuestion from "../Question/FullQuestion/fullQuestion"

function getRoutes(user, setUser) {
  return {
    '/auth*': () => <Auth user={user} setUser={setUser} />,
    '/profile/:user_id': ({ user_id }) => <Profile user_id={user_id} user={user} setUser={setUser} />,
    // '/viewFullQuestion/:quesId' :({quesId}) => <FullQuestion quesId = {quesId} />,
    '/*': () => <Feed user={user} setUser={setUser} />,
  }
}

function Render() {
  const [user, setUser] = useState(null);
  const page = useRoutes(getRoutes(user, setUser));

  return ( page || <HTML404 /> );
}

export default Render;