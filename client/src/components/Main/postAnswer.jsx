import React,{useState} from "react"
import { ENDPOINT } from "../utils";
import axiosCall from "../../ajaxRequest"
import {navigate} from "hookrouter"

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
        <form onSubmit = {postAnswer}>
        <textarea placeholder="Write your answer" value = {answer} onChange = {handleChange}></textarea>
        <button type="submit">Post</button>
        </form>
    )
   
}


export default PostAnswer;