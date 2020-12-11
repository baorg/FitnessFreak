import React, {useState,useEffect} from "react"
import {navigate, A } from 'hookrouter';
import UpvoteDownvote from "../../UpvoteDownvote/upvoteDownvote";
import Comment from '../../Comment/Comment/comment';
import '../../styles.css'
import PostComment from "../../Comment/PostComment/postcomment";
import ajaxRequest from '../../../ajaxRequest';
import { ENDPOINT } from "../../utils";
// let comments=["Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?","Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?","Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"]

function Answer(props){
    // const [click, setClick] = useState(false);
    const [comments,setComments]=useState([]);
    const [totalCount, setTotalCount] = useState(null);
    console.log(props);

    useEffect(() => {
      const obj = { up: props.answer.vote_count.upvote, down: props.answer.vote_count.downvote }
      setTotalCount(obj);
        ajaxRequest("post", `${ENDPOINT}/Question/getCommentsByAnswerId`, {
            answerId:props.answer.answerId
          }).then(res=>{
            console.log(res.data);
            console.log(typeof(res.data));
            setComments(res.data.data);
          })
          
      }, []);
    return (
    <div style={{marginBottom:"20px",borderBottom:"2px solid #B8B8B8", padding:"10px"}}  >
    Answered by <A href={`/profile/${props.answer.user._id}`}>@{props.answer.user.username}</A>
    <div dangerouslySetInnerHTML={{__html:props.answer.answer}}></div>
    <UpvoteDownvote quesId = {props.answer._id} isQues = {false} user={props.user} totalCount={totalCount}/>
    <hr />
    <div style={{marginLeft:"200px" ,borderLeft:"2px solid #B8B8B8",padding:"20px"}}>
    {comments.length!==0?<h4 style={{marginBottom:"30px"}}>Comments</h4>:null }
    <div>
        {comments.map((item,index)=><Comment key={index} comment={item} user={props.user}/>)}
    </div>
    <h6>Add Your Comment</h6>
    <PostComment answerId = {props.answer._id} user={props.user} />
    </div>
    </div>
    )
    
}


export default Answer;