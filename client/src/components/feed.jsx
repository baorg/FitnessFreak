import React, { useState, useEffect } from "react";
import App from "./Main/App";
import axios from "axios";
import { useRoutes } from 'hookrouter';
import {HTML404 } from './ErrorPage/Error';
import PostQuestion from "./Main/Postques";
import Profile from "./Main/profile";
import Followers from './Main/followers';
import Following from './Main/following';

const tmpUser = {
  userName: 'Anonymous',
  userProfile: 'https://cdn-images-1.medium.com/max/1200/1*8OkdLpw_7VokmSrzwXLnbg.jpeg',
  userBackground: 'https://i.ytimg.com/vi/f600WUNFMYI/maxresdefault.jpg'
}

function getRoutes(user) {
  return {
    '/': () => <App user={user}/>,
    '/app': () => <App user={user}/>,
    '/post-question':()=><PostQuestion user={user} />,
    '/profile/:userId': ({ userId }) => <Profile user={user} userId={userId} />,
    '/followers/:userId': ({ userId }) => <Followers userId={userId} />,
    '/following/:userId': ({ userId }) => <Following userId={userId}/>
  }
}

async function getUserName(setUser){
    const res = await axios.get("/Users/get-userdata", {withCredentials : true})
    console.log(res.data);
    setUser(res.data);
}


function Feed() {
  const [user, setUser] = useState(tmpUser)
  useEffect(() => {
    getUserName(setUser);
  }, [])
  const page = useRoutes(getRoutes(user)) 
  return (
    page || <HTML404 />
  );
}

export default Feed;
