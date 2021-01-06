import React, {useState,useEffect} from "react"
import { A } from 'hookrouter';
import UpvoteDownvote from "../../UpvoteDownvote/upvoteDownvote";
import Comment from '../../Comment/Comment/comment';
import '../../styles.css'
import PostComment from "../../Comment/PostComment/postcomment";
import ajaxRequest from '../../../ajaxRequest';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import DoneIcon from '@material-ui/icons/Done';

import CONFIG from '../../../config';

function Answer(props){
    // const [click, setClick] = useState(false);
    const [comments,setComments]=useState([]);
    const [totalCount, setTotalCount] = useState(null);
    console.log(props);

    useEffect(() => {
      const obj = { up: props.answer.vote_count.upvote, down: props.answer.vote_count.downvote }
      setTotalCount(obj);
        ajaxRequest("get", `${CONFIG.API_DOMAIN}/question/get-comments-of-answer?answerId=${props.answer._id}`).then(res=>{
            console.log(res.data);
            console.log(typeof(res.data));
            setComments(res.data.comments);
          })
      }, [ props.answer, ]);
    return (
    <div style={{marginBottom:"20px",borderBottom:"2px solid #B8B8B8", padding:"10px"}}  >
      {props.answer.marked?<VerifiedUserIcon style={{color:"green"}}/>:null}
      Answered by
        {props.answer.user
          ? <A href={`/profile/${props.answer.user._id}`} style={{ display: "inline-block" }}>@{props.answer.user.username}</A>
          : "  [deleted]"}
        
      {props.satisfactory?<DoneIcon onClick={()=>{props.selectedSatisfactoryAnswer(props.answer._id)}} style={{display:"inline-block",color:"green",marginLeft:"20px"}}/>:null}
      <div style={{marginTop:"20px"}} dangerouslySetInnerHTML={{__html:props.answer.answer}}></div>

      <UpvoteDownvote quesId = {props.answer._id} isQues = {false} user={props.user} totalCount={totalCount}/>
      <hr />
      <div style={{marginLeft:"200px" ,borderLeft:"2px solid #B8B8B8",padding:"20px"}}>
        {comments.length!==0?<h4 style={{marginBottom:"30px"}}>Comments</h4>:null }
        <div>
          {comments.map((item,index)=><Comment key={index} comment={item} user={props.user}/>)}
        </div>
        <h6>Add Your Comment</h6>
        <PostComment answerId = {props.answer._id} user={props.user} comments={comments} setComments={setComments} />
      </div>
    </div>
    )
    
}


export default Answer;