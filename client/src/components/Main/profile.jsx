import React, {useState,useEffect} from "react"
import MyNav from "../navbar/navbar";
import './profile.css'
import logo from './dbo1f27-d3eff51b-1f9b-4402-b8af-1198513508a6.jpg'
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
import {A} from 'hookrouter';

function Profile(props){
    const [follow,setFollow]=useState(false);
    // useEffect(() => {
    //     //axios call
    //     //if res.data.follow===true  setFollow=true
    //   }, []);
    function togglefollow(){
        if(!follow===true){
            //axios call to add follow
        }
        else{
            //axios call to remove follow
        }
        setFollow(!follow);
    }
    return (
    <div>
        <MyNav user={props.user} />
        <div style={{display:"flex"}}>
            <div className="sidebar" >
                <div>
                    <a>Followers</a>
                    <a>Following</a>
                    <A href="/feed/app">Questions Asked</A>
                    <a>Answers Given</a>
                </div>
            </div>
            <div className="main" >
                <img src={logo} alt="profilepic" className="profilepic"></img>
                <h1>AV</h1>
                {/* {props.self?<button>Edit Profile</button>:} */}
                <button onClick={togglefollow}>
                    {/* {follow?<PersonAddIcon />:<PersonAddDisabled />} */}
                    <PersonAddIcon /></button>
            </div>
            <div className="right" >
            </div>
        </div>    
    </div>
    )
    
}


export default Profile;