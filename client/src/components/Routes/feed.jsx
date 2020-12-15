import React, { useState, useEffect } from "react";
import App from "../App/App";
import axios from "axios";
import { useRoutes } from 'hookrouter';
import {HTML404 } from '../ErrorPage/Error';
import PostQuestion from "../Question/PostQuestion/Postques";
import FullQuestion from '../Question/FullQuestion/fullQuestion';
import TypeOfPageRoutes from "./typeofpageroutes";
import ProfileRoutes from "./profileroutes";
import Ranking from '../Ranking/ranking';
import UpdateProfile from '../Profile/EditProfile';
import CONFIG from '../../config';

function getRoutes(user) {
  return {
    '/': () => <App user={user}/>,
    'app': () => <App user={user}/>,
    'post-question': ()=><PostQuestion user={user} />,
    'profile/:userId*': ({ userId }) => <ProfileRoutes user={user} userId={userId} />,
    'update-profile': ()=> <UpdateProfile />,
    'viewFullQuestion/:quesId' :({quesId}) => <FullQuestion quesId = {quesId} user={user}/>,
    'rankings/:typeofranking':({typeofranking})=><Ranking typeofranking={typeofranking} user={user}/>,
    'questions/:typeofpage*':({typeofpage}) => <TypeOfPageRoutes typeofpage={typeofpage} user={user} />
  }
}

async function getUserName(setUser){
    // console.count("getuserName");
    const res = await axios.get(`${CONFIG.API_DOMAIN}/Users/get-userdata`, {withCredentials : true})
    // console.count("getuserName");
    if(res.data.isAuthenticated===true)
        setUser(res.data.user);
    console.log(res.data);
}


function Feed() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    //isAuthenitaced
    console.count("getuserName");
    getUserName(setUser);
    console.log("User:", user, ">");
  }, [])
  const page = useRoutes(getRoutes(user)) 
  return (
    page || <HTML404 />
  );
}

export default Feed;
