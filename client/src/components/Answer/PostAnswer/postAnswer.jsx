import React,{useState} from "react"
import { ENDPOINT } from "../../utils";
import axiosCall from "../../../ajaxRequest"
import {navigate} from "hookrouter"
import notLoggedIn from "../../../notloggedin";

const PostAnswer = (props) => {
    const [answer, setAnswer] = useState("")
    function postAnswer(e){
        e.preventDefault();
        const url = `${ENDPOINT}/Question/postAnswer`;
        const obj = {
            quesId : props.id,
            answer : answer
            
        }
        axiosCall('post', url, obj).then(res => {
            console.log(res.data);
            // if (res.data.isAuthenticated) {
            // } else {
            //     console.log("Not Authenticated")
            // }
            navigate(res.data);
        });
    }

    function handleChange(e){
        const ans = e.target.value;
        setAnswer(ans);
    }

    return (   
        <form onSubmit = {postAnswer} style={{display:"flex",alignItems:"center"}}>
        <textarea placeholder="Write your answer" value = {answer} onChange = {handleChange} onClick={props.user===null?notLoggedIn:null}></textarea>
        <button type="submit" onClick={props.user===null?notLoggedIn:null} >Post</button>
        </form>
    )
   
}


export default PostAnswer;