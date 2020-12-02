import React,{useState} from "react"
import { ENDPOINT } from "../../utils";
import axiosCall from "../../../ajaxRequest"
import {navigate} from "hookrouter"

const PostComment = (props) => {
    const [comment, setComment] = useState("")
    function postComment(e){
        // e.preventDefault();
        // const url = `${ENDPOINT}/Question/postAnswer`;
        // const obj = {
        //     quesId : props.id,
        //     answer : answer
            
        // }
        // axiosCall('post', url, obj).then(res => {
        //     console.log(res.data);
        //     // if (res.data.isAuthenticated) {
        //     // } else {
        //     //     console.log("Not Authenticated")
        //     // }
        //     navigate(res.data);
        // });
    }

    function handleChange(e){
        const comm = e.target.value;
        setComment(comm);
    }

    return (   
        <form onSubmit = {postComment} style={{display:"flex",alignItems:"center"}}>
        <textarea placeholder="Write your comment" value = {comment} onChange = {handleChange}></textarea>
        <button type="submit">Post</button>
        </form>
    )
   
}


export default PostComment;