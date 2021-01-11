import React, { useState, useEffect } from "react";
import { useRoutes } from 'hookrouter';
import Auth from "../Auth";
import Feed from "./feed";
import Profile from "../Profile";
import {HTML404 } from '../ErrorPage/Error';
import FullQuestion from "../Question/FullQuestion/fullQuestion"
import Navbar from '../Navigation/navbar/navbar';
function getRoutes(user, setUser) {
  return {
    '/auth*': () => <Auth user={user} setUser={setUser} />,
    '/profile/:user_id': ({ user_id }) => <Profile user_id={user_id} user={user} setUser={setUser} />,
    '/*': () => <Feed user={user} setUser={setUser} />,
  }
}

function Render() {
  const [user, setUser] = useState(null);
  const page = useRoutes(getRoutes(user, setUser));

  return (
    <>
      <Navbar user={user}/>
      {page || <HTML404 />}
    </>
  );
}

export default Render;