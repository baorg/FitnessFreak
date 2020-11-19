import React, {useState} from "react"
import {navigate, A } from 'hookrouter';
import UpvoteDownvote from "./upvoteDownvote";

function Answer(props){
    const [click, setClick] = useState(false);
   
    return (
    <div>{props.answer}
    <UpvoteDownvote quesId = {props.answerId} isQues = {false}/>
    </div>
    )
    
}


export default Answer;