import React, {useState} from "react"
// import {navigate, A } from 'hookrouter';
import UpvoteDownvote from "../../UpvoteDownvote/upvoteDownvote";
import Comment from '../../Comment/Comment/comment';
import '../../styles.css'
import PostComment from "../../Comment/PostComment/postcomment";

function Answer(props){
    // const [click, setClick] = useState(false);
    return (
    <div style={{marginBottom:"20px"}} className="shiny">
    <p>{props.answer}</p>
    <UpvoteDownvote quesId = {props.answerId} isQues = {false} user={props.user}/>
    <hr />
    {/* {props.answers.comments.length!==0?<h4 style={{marginBottom:"30px"}}>Comments</h4>:null }
    <div>
        {props.answer.comments.map((item,index)=><Comment key={index} comment={item} user={props.user}/>)}
    </div> */}
    <h6>Add Your Comment</h6>
    <PostComment answerId = {props.answerId} user={props.user} />
    </div>
    )
    
}


export default Answer;