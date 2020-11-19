import React, {useState,useEffect} from "react"
import MyNav from "../navbar/navbar";
import './profile.css'
import logo from './dbo1f27-d3eff51b-1f9b-4402-b8af-1198513508a6.jpg'
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import axios from 'axios';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
import {A, navigate} from 'hookrouter';

const AnonymousUser = {
    _id:0,
    firstName: "Anonymous",
    lastName: "User",
    userName: "Anonymous",
    profileImage: logo
}

function Profile(props){
    const [follow, setFollow] = useState(false);
    const [profileUser, setProfileUser] = useState(AnonymousUser);
    const [isFollowing, setIsFollowing] = useState(false);

    useEffect(async () => {
        //axios call
        let res = await axios.post(`/Users/get-userdata-id`, { user_id: props.userId }, { withCredentials: true, });
        if (res.data.isAuthenticated)
            setProfileUser(res.data.user);
        else
            navigate('/');
        res = await axios.get(`/following/check-following?user_id=${props.userId}`, { withCredentials: true });
        setIsFollowing(res.data.is_following);
    }, []);
    
    async function handleFollow() {
        let res = await axios.post('/following/add-following', { user_id: profileUser._id }, { withCredentials: true });
        if (res.data.success) {
            setIsFollowing(true);
        } else {
            console.log("Some error occured ", res);
        }
    }
    
    async function handleUnfollow() {
        let res = await axios.post('/following/remove-following', { user_id: profileUser._id }, { withCredentials: true });
        if (res.data.success) {
            setIsFollowing(false);
        } else {
            console.log("Some error occured ", res);
        }
    }

    return (
    <div>
        <MyNav user={props.user} />
        <div style={{display:"flex"}}>
            <div className="sidebar" >
                <div>
                    <A href={`/feed/followers/${profileUser._id}`}>Followers</A>
                    <A href={`/feed/following/${profileUser._id}`}>Following</A>
                    <A href="/feed/app">Questions Asked</A>
                    <a>Answers Given</a>
                </div>
            </div>
            <div className="main" >
                <img src={profileUser.profileImage|| AnonymousUser.profileImage} alt="profilepic" className="profilepic"></img>
                <h1>{profileUser.userName}</h1>
                
                    {profileUser._id == props.user._id ?
                        <button>Edit Profile</button>:
                        (isFollowing ?
                            <button onClick={handleUnfollow}>Unfollow</button>
                        :   <button onClick={handleFollow}><PersonAddIcon /></button>)
                    }
            </div>
            <div className="right" >
            </div>
        </div>
    </div>
    )
    
}


export default Profile;