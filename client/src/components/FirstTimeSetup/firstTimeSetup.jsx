import React , {useEffect,useState}  from "react";
import axiosCall from "../../ajaxRequest"
import EditProfile from "../EditProfile/editProfile";
import { ENDPOINT } from "../utils";
import {navigate} from 'hookrouter'

const FirstTimeSetup = () => {

    const [username,setUsername]=useState("");
    const [isUnique,setIsUnique]=useState(false);
    useEffect(()=>{
          async function fun(){
            let url=`${ENDPOINT}/auth/google/allow-access`
            await axiosCall('GET', url)
            .then(function (response) {
                // console.log(response.data);
                if (response.data === false) {
                    navigate(`${ENDPOINT}/feed/app`)
                }
            })
        } 
        fun();
    })
    async function uniqueness(e){
        setUsername(e.target.value)
        let url=`${ENDPOINT}/auth/google/uniqueness`
        let obj={userName:e.target.value}
        await axiosCall('POST', url,obj).then(res => {
            console.log("hi"+res.data);
            if(res.data===true){
                setIsUnique(true);
            }
            else if(res.data===false){
                setIsUnique(false);
            }
        });
    }

    return(
        <div>
            <form method="POST" action="/auth/google/first-time-setup" >
                <h1>Enter Details for your profile</h1>
                <h2>Username</h2>
                <input type="text" placeholder="Enter your username" name="username" value={username} onChange={uniqueness} autoComplete="off"  required></input>
                {username!==""?<p style={{color:isUnique?"green":"red"}}>This username is {isUnique?"valid":"not valid"}</p>:null}
                <EditProfile />
                <button type="submit">Post</button>
            </form>
        </div>

    )
}


export default FirstTimeSetup;