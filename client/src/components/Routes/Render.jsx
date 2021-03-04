import React, { useState, useEffect, useContext, createContext } from "react";
import styled from 'styled-components';

import { useRoutes } from 'hookrouter';
import Auth from "../Auth";
import Feed from "./feed";
import Profile from "../Profile";
import {HTML404 } from '../ErrorPage/Error';
import FullQuestion from "../Question/FullQuestion/fullQuestion"
import Navbar from '../Navigation/navbar/navbar';
import { fetchUserData } from '../utils/fetch_user_data';

import { UserContext, UserProvider } from '../utils/UserContext';
import { NavProvider } from '../utils/NavContext';

import { responsive } from '../utils/data.json';


let PageDiv = styled.div`
  position: relative;
  top: 5em;

  @media (max-width: ${responsive.small}){
    top: 7em;
  }
`;

function getRoutes(user, setUser) {
  return {
    '/auth*': () => <Auth user={user} setUser={setUser} />,
    '/profile/:user_id': ({ user_id }) => <Profile user_id={user_id} user={user} setUser={setUser} />,
    '/*': () => <Feed user={user} setUser={setUser} />,
  }
}

function RenderedRoute(props){
  const [user, setUser] = useContext(UserContext);
  const page = useRoutes(getRoutes(user, setUser));

  useEffect(()=>{
    console.log('Fetching User data');
    fetchUserData(setUser).then(()=>console.log('user data recieved'));
  }, []);


  return (
    <>
      <Navbar />
      <PageDiv>
        {page || <HTML404 />}
      </PageDiv>
    </>
  )
}

function Render() {   
  return (
    <UserProvider>
      <NavProvider>
        <RenderedRoute />
      </NavProvider>
    </UserProvider>
  );
}

export default Render;