import React, { useState, useEffect } from "react";
import {navigate,A } from 'hookrouter';
import axios from 'axios';
import MyNav from '../../Navigation/navbar/navbar'
import SideNavPage from '../../Navigation/SideNav/SideNav'
import axiosCall from '../../../ajaxRequest';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import { ENDPOINT } from "../../utils";
import { Spinner } from "react-bootstrap";

function Followers(props) {
    const [followersList, setFollowersList] = useState([]);
    const [userDetails,setUserDetails] = useState("");
    const [defaultMessage,setDefaultMessage] = useState("");
    useEffect(() => {
        async function fetchData(props){
            let res = await axios.get(`/following/get-followers-list/${props.userId}`, { withCredentials: true });
            // if (res.data.isAuthenticated)
                if(!res.data.followers.length){
                    setDefaultMessage("No Followers Yet")
                }
                else{
                setFollowersList(res.data.followers);
                }
            // else
                // navigate('/');
        }
        fetchData(props);
        let url2=`${ENDPOINT}/Users/get-userdata-id`
        axiosCall('post', url2, {user_id: props.userId})
        .then((res) => {
            // console.log("resOfTypeOfpage = ", res.data)
            //setQues(res.data.questions);
            setUserDetails(res.data.user);
        })
    }, []);

    return (followersList && userDetails?
       ( <>
            <MyNav user={props.user} />
            <SideNavPage type="profile" profileid={props.userId} user={props.user}/>
            <div className="maindivofeverypage">
            <h2 style={{marginBottom:"40px"}}>Followers  of <A href={`/profile/${userDetails._id}`}>{userDetails.username}</A></h2>
            <h5>{defaultMessage} {defaultMessage!==""?<SentimentVeryDissatisfiedIcon />:null }</h5>
            <br /><br /><br />
            {followersList.map(user => 
                    <div style={{textAlign:"left", padding:"5px"}} className="shiny">
                        <img src={user.profile_image} style={{height:"50px",borderRadius:"1000px"}} />
                        <A href={`/profile/${user._id}`} style={{fontSize:"20px",padding:"10px",color:"black"}}>{user.username}</A>
                        <hr />
                    </div>
            )}
            </div>
        </>):<Spinner />
    );
}

export default Followers;