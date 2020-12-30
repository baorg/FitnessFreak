import React, { useState, useEffect } from "react";
import App from "../App/App";
import axios from "axios";
import { useRoutes, navigate } from 'hookrouter';
import {HTML404 } from '../ErrorPage/Error';
import PostQuestion from "../Question/PostQuestion";
import FullQuestion from '../Question/FullQuestion/fullQuestion';
import TypeOfPageRoutes from "./typeofpageroutes";
import ProfileRoutes from "./profileroutes";
import Ranking from '../Ranking/ranking';
import UpdateProfile from '../Profile/EditProfile';
import CONFIG from '../../config';
import VerifyEmail from '../VerifyEmail';

function getRoutes(user) {
  return {
    '/': () => <App user={user}/>,
    'app': () => <App user={user}/>,
    'post-question': ()=><PostQuestion user={user} />,
    'profile/:userId*': ({ userId }) => <ProfileRoutes user={user} userId={userId} />,
    'update-profile': ()=> <UpdateProfile />,
    'viewFullQuestion/:quesId' :({quesId}) => <FullQuestion quesId = {quesId} user={user}/>,
    'rankings/:typeofranking':({typeofranking})=><Ranking typeofranking={typeofranking} user={user}/>,
    'questions/:typeofpage*': ({ typeofpage }) => <TypeOfPageRoutes typeofpage={typeofpage} user={user} />,
    'verify-email/*': () => <VerifyEmail />
  }
}

async function getUserName(user, setUser){
    // console.count("getuserName");
    if (user) {
      
    } else {
      const res = await axios.get(`${CONFIG.API_DOMAIN}/Users/get-userdata`, {withCredentials : true})
      // console.count("getuserName");
      if (res.data.isAuthenticated === true)
        setUser(res.data.user);
    }
}


function Feed(props) {
  useEffect(() => {

    //isAuthenitaced
    // console.count("getuserName");
    getUserName(props.user, props.setUser);

  }, []);

  const page = useRoutes(getRoutes(props.user));
    return ( page || <HTML404 /> );
}

export default Feed;
