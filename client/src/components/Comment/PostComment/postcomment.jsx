import React,{useState} from "react"
import { ENDPOINT } from "../../utils";
import axiosCall from "../../../ajaxRequest"
import {navigate} from "hookrouter"

const PostComment = (props) => {
    const [comment, setComment] = useState("")
    function postComment(e){
        e.preventDefault();
        const url = `${ENDPOINT}/Question/postComment`;
        const obj = {
            answerId : props.answerId,
            comment : comment
            
        }
        axiosCall('post', url, obj).then(res => {
            console.log("postComment response ",res.data);
            if (res.data.isAuthenticated) {
                console.log("succesfully added")
            } else {
                console.log("Not Authenticated")
            }
            // navigate("/");
        });
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