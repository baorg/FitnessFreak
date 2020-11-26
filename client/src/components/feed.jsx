import React, { useState, useEffect } from "react";
import App from "./Main/App";
import axios from "axios";
import { useRoutes } from 'hookrouter';
import {HTML404 } from './ErrorPage/Error';
import PostQuestion from "./Main/Postques";
import Profile from "./Main/profile";
import Followers from './Main/followers';
import Following from './Main/following';
import FullQuestion from './Main/fullQuestion';
import TypeOfPage from "./Main/typeofpage";
import TypeOfPageRoutes from "./typeofpageroutes";


function getRoutes(user) {
  return {
    '/': () => <App user={user}/>,
    'app': () => <App user={user}/>,
    'post-question':()=><PostQuestion user={user} />,
    'profile/:userId': ({ userId }) => <Profile user={user} userId={userId} />,
    'followers/:userId': ({ userId }) => <Followers userId={userId} />,
    'following/:userId': ({ userId }) => <Following userId={userId}/>,
    'viewFullQuestion/:quesId' :({quesId}) => <FullQuestion quesId = {quesId} user={user}/>,
    ':typeofpage*':({typeofpage}) => <TypeOfPageRoutes typeofpage={typeofpage} user={user} />
  }
}

async function getUserName(setUser){
  console.count("getuserName");
    const res = await axios.get("/Users/get-userdata", {withCredentials : true})
    console.count("getuserName");
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
