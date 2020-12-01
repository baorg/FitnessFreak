import React, { useState, useEffect } from "react";
import { useRoutes } from 'hookrouter';
import {HTML404 } from '../ErrorPage/Error';
import Profile from '../Profile/profile';
import Following from '../Following/following';
import Followers from '../Followers/followers';
import ProfilePrivileges from "../ProfilePrivileges/profileprivileges";


function getRoutes(props) {
  return {
    '/': () => <Profile user={props.user} userId={props.userId} />,
    '/followers': () => <Followers userId={props.userId} />,
    '/following': () => <Following userId={props.userId}/>,
    '/:privilege':({privilege})=><ProfilePrivileges user={props.user} privilege={privilege} />
  }
}

function ProfileRoutes(props) {

  const page = useRoutes(getRoutes(props)) 
  return (
    page || <HTML404 />
  );
}

export default ProfileRoutes;
