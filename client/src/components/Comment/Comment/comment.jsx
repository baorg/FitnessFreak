import React, {useState} from "react"
import UpvoteDownvote from "../../UpvoteDownvote/upvoteDownvote";
import '../../styles.css'

function Comment(props){
    // const [click, setClick] = useState(false);
    return (
    <div style={{marginBottom:"10px"}} className="shiny">
    <h6>Comment by @username</h6>
    <p>{props.comment}</p>
    <UpvoteDownvote quesId = {props.answerId} isQues = {false} user={props.user}/>
    <hr />
    </div>
    )
    
}


export default Comment;