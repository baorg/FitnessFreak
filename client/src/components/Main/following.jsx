import React, { useState, useEffect } from "react";
import {navigate } from 'hookrouter';
import axios from 'axios';

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
            <h1>Following</h1>
            <li>
                {followingList.map(user => 
                    <ul>{user.userName}</ul>
                )}
            </li>
        </>
    );
}

export default Following;