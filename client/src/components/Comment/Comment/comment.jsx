import React, {useState} from "react"
import UpvoteDownvote from "../../UpvoteDownvote/upvoteDownvote";
import '../../styles.css'
import {A} from 'hookrouter';

function Comment(props){
    // const [click, setClick] = useState(false);
    console.log(props);
    return (
    <div style={{marginBottom:"10px"}} className="shiny">
    {/* <h6>Comment by @username</h6> */}
    Commented by <A href={`/profile/${props.comment.user._id}`}>@{props.comment.user.username}</A>
    <div dangerouslySetInnerHTML={{__html:props.comment.answer}}></div>
    <UpvoteDownvote quesId = {props.answerId} isQues = {false} user={props.user}/>
    <hr />
    </div>
    )
    
}


export default Comment;