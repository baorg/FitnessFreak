import React  from "react"
import UpvoteDownvote from "../../UpvoteDownvote/upvoteDownvote";
import '../../styles.css'
import {A,navigate} from 'hookrouter';
import DeleteIcon from '@material-ui/icons/Delete';
import CONFIG from '../../../config';
import ajaxRequest from '../../../ajaxRequest';

function Comment(props){
    // const [click, setClick] = useState(false);
    const obj = { up: props.comment.vote_count.upvote, down: props.comment.vote_count.downvote }
    console.log(props);
    function deleteComment(){
        if (window.confirm("Are you sure you want to delete your comment")) {
          // txt = "You pressed OK!";
          ajaxRequest("post",`${CONFIG.API_DOMAIN}/question/deleteComment`,{
            commentId:props.comment._id
          }).then(async(res)=>{
            if(!res.data.err){
                window.location.reload()
            }
            else{
                console.log("error in deleting comment");
            }
          })
        }
      }
    return (
    <div style={{marginBottom:"10px"}} className="shiny">
    {/* <h6>Comment by @username</h6> */}
    Commented by <A href={`/profile/${props.comment.user._id}`}>@{props.comment.user.username}</A>
    {props.user?(props.user._id===props.comment.user._id?<DeleteIcon onClick={deleteComment}/>:null):null}
    <div dangerouslySetInnerHTML={{__html:props.comment.answer}}></div>
    <UpvoteDownvote quesId = {props.comment._id} isQues = {2} user={props.user} totalCount={obj}/>
    <hr />
    </div>
    )
    
}


export default Comment;