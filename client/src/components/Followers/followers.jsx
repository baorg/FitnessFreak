import React, { useState, useEffect } from "react";
import {navigate } from 'hookrouter';
import axios from 'axios';

function Followers(props) {
    const [followersList, setFollowersList] = useState([]);

    useEffect(() => {
        async function fetchData(props){
            let res = await axios.get(`/following/get-followers-list/${props.userId}`, { withCredentials: true });
            if (res.data.isAuthenticated)
                setFollowersList(res.data.followers);
            else
                navigate('/');
        }
        fetchData(props);
    }, []);

    return (
        <>
            <h1>Followers</h1>
            <li>
                {followersList.map(user => 
                    <ul><a href={`/profile/${user._id}`}>{user.username}</a></ul>
                )}
            </li>
        </>
    );
}

export default Followers;