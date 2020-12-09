import React, {useState} from "react"
// import {navigate, A } from 'hookrouter';
import UpvoteDownvote from "../../UpvoteDownvote/upvoteDownvote";
import Comment from '../../Comment/Comment/comment';
import '../../styles.css'
import PostComment from "../../Comment/PostComment/postcomment";
let comments=["Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?","Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?","Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"]

function Answer(props){
    // const [click, setClick] = useState(false);
    console.log(props)
    return (
    <div style={{marginBottom:"20px",borderBottom:"2px solid #B8B8B8", padding:"10px"}}  >
    <h6>Answered by @username</h6>
    <div dangerouslySetInnerHTML={{__html:props.answer}}></div>
    <UpvoteDownvote quesId = {props.answerId} isQues = {false} user={props.user}/>
    <hr />
    {/* {props.answers.comments.length!==0?<h4 style={{marginBottom:"30px"}}>Comments</h4>:null }
    <div>
        {props.answer.comments.map((item,index)=><Comment key={index} comment={item} user={props.user}/>)}
    </div> */}
    <div style={{marginLeft:"200px" ,borderLeft:"2px solid #B8B8B8",padding:"20px"}}>
    {comments.length!==0?<h4 style={{marginBottom:"30px"}}>Comments</h4>:null }
    <div>
        {comments.map((item,index)=><p><Comment key={index} comment={item} user={props.user}/></p>)}
    </div>
    <h6>Add Your Comment</h6>
    <PostComment answerId = {props.answerId} user={props.user} />
    </div>
    </div>
    )
    
}


export default Answer;