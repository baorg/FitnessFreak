import React, { useState, useEffect } from "react";
import {navigate } from 'hookrouter';
import axios from 'axios';

function Followers(props) {
    const [followersList, setFollowersList] = useState([]);

    
    useEffect(async () => {
        let res = await axios.get(`/following/get-followers-list/${props.userId}`, { withCredentials: true });
        if (res.data.isAuthenticated) {
            setFollowersList(res.data.followers);
        } else
            navigate('/');
    }, []);

    return (
        <>
            <h1>Followers</h1>
            <li>
                {followersList.map(user => 
                    <ul>{user.userName}</ul>
                )}
            </li>
        </>
    );
}

export default Followers;