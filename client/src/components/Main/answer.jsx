import React, {useState} from "react"
// import {navigate, A } from 'hookrouter';
import UpvoteDownvote from "./upvoteDownvote";
import './styles.css'

function Answer(props){
    // const [click, setClick] = useState(false);
    return (
    <div style={{marginBottom:"20px"}} className="shiny">
    <p>{props.answer}</p>
    <UpvoteDownvote quesId = {props.answerId} isQues = {false}/>
    <hr />
    </div>
    )
    
}


export default Answer;