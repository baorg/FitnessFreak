import React, { useState, useEffect } from "react";
import {navigate,A } from 'hookrouter';
import axios from 'axios';
import MyNav from '../../Navigation/navbar/navbar'
import SideNavPage from '../../Navigation/SideNav/SideNav'

function Followers(props) {
    const [followersList, setFollowersList] = useState([]);

    useEffect(() => {
        async function fetchData(props){
            let res = await axios.get(`/following/get-followers-list/${props.userId}`, { withCredentials: true });
            // if (res.data.isAuthenticated)
                setFollowersList(res.data.followers);
            // else
                // navigate('/');
        }
        fetchData(props);
    }, []);

    return (
        <>
            <MyNav user={props.user} />
            <SideNavPage type="profile" profileid={props.userId} user={props.user}/>
            <div className="maindivofeverypage">
            <h1>Followers</h1>
            <br /><br /><br />
            {followersList.map(user => 
                    <div style={{textAlign:"left",borderBottom:"2px solid #B8B8B8", padding:"5px"}} className="shiny">
                        <img src={user.profile_image} style={{height:"50px",borderRadius:"1000px"}} />
                        <A href={`/profile/${user._id}`} style={{fontSize:"20px",padding:"10px",color:"black"}}>{user.username}</A>
                    </div>
            )}
            </div>
        </>
    );
}

export default Followers;