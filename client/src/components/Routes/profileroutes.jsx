import React, { useState, useEffect } from "react";
import { useRoutes } from 'hookrouter';
import {HTML404 } from '../ErrorPage/Error';
import Profile from '../Profile';
// import Following from '../Profile/Following/following';
// import Followers from '../Profile/Followers/followers';
// import ProfilePrivileges from "../Profile/ProfilePrivileges/profileprivileges";
// import AnswerAsked from "../Profile/AnswersAsked/answersAsked";
// import UpdateProfile from "../Profile/EditProfile";

function getRoutes(props) {
  return {
    '/': () => <Profile user={props.user} userId={props.userId} setUser={props.setUser}/>,
    // '/followers': () => <Followers userId={props.userId} user={props.user}/>,
    // '/following': () => <Following userId={props.userId} user={props.user}/>,
    // '/answer-asked/:quesId':({quesId})=><AnswerAsked userId={props.userId} user={props.user} quesId={quesId}/>,
    // '/:privilege': ({ privilege }) => <ProfilePrivileges user={props.user} privilege={privilege} userId={props.userId} />,
    // '/update-profile': ()=> <UpdateProfile />
  }
}

function ProfileRoutes(props) {

  const page = useRoutes(getRoutes(props)) 
  return (
    page || <HTML404 />
  );
}

export default ProfileRoutes;
