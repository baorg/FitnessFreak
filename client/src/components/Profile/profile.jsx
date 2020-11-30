import React, {useState,useEffect} from "react"
import MyNav from "../navbar/navbar";
import './profile.css'
import logo from '../download (1).jpg'
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import axios from 'axios';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
import {A, navigate} from 'hookrouter';
import SideNavBar from "../SideNav/SideNav";

const AnonymousUser = {
    _id:0,
    first_name: "Anonymous",
    last_name: "User",
    username: "Anonymous",
    profile_image: logo
}

function Profile(props){
    const [follow, setFollow] = useState(false);
    const [profileUser, setProfileUser] = useState(AnonymousUser);
    const [isFollowing, setIsFollowing] = useState(false);

    useEffect(async () => {
        //axios call
        console.log("User:", props.user, profileUser);
        let res = await axios.post(`/Users/get-userdata-id`, { user_id: props.userId }, { withCredentials: true, });
        console.log(res.data);
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
    console.log("User:", props.user, profileUser);

    return (
        <>
            <MyNav user={props.user} />
            <SideNavBar type="profile" profileid={profileUser._id} />
                <div className="maindivofeverypage" >
                    <img src={profileUser.profile_image || AnonymousUser.profile_image} alt="profilepic" className="profilepic"></img>
                    <h1>{profileUser.username}</h1>
                    {props.user && profileUser._id === props.user._id ?
                        <button>Edit Profile</button> :
                        (isFollowing ?
                            <button onClick={handleUnfollow}>Unfollow <PersonAddDisabledIcon /></button>
                            : <button onClick={handleFollow}>Follow <PersonAddIcon /></button>)
                    }
                </div>
        </>
    );
    
}


export default Profile;