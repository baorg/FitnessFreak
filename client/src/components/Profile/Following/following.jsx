import React, { useState, useEffect } from "react"
import {navigate } from 'hookrouter'
import axios from 'axios'
import MyNav from '../../Navigation/navbar/navbar'
import SideNavPage from '../../Navigation/SideNav/SideNav'


function Following(props) {
    const [followingList, setfollowingList] = useState([]);

    useEffect(async () => {
        let res = await axios.get(`/following/get-following-list/${props.userId}`, { withCredentials: true });
        if (res.data.isAuthenticated) {
            setfollowingList(res.data.following);
        } else
            navigate('/');
    }, []);

    return (
        <>
            <MyNav user={props.user} />
            <SideNavPage type="profile" profileid={props.userId} user={props.user}/>
            <div className="maindivofeverypage">
            <h1>Following</h1>
            <li>
                {followingList.map(user => 
                    <ul><a href={`/profile/${user._id}`}>{user.username}</a></ul>
                )}
            </li>
            </div>
        </>
    );
}

export default Following;