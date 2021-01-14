import React  from "react"
import UpvoteDownvote from "../../UpvoteDownvote/upvoteDownvote";
import '../../styles.css'
import {A,navigate} from 'hookrouter';
import DeleteIcon from '@material-ui/icons/Delete';
import CONFIG from '../../../config';
import ajaxRequest from '../../../ajaxRequest';

function Comment({ user, comment }){
    // const [click, setClick] = useState(false);
    const obj = { up: comment.vote_count.upvote, down: comment.vote_count.downvote }
    // console.log(props);
    function deleteComment(){
        if (window.confirm("Are you sure you want to delete your comment")) {
          // txt = "You pressed OK!";
          ajaxRequest("post",`${CONFIG.API_DOMAIN}/question/deleteComment`,{
            commentId:comment._id
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
    Commented by { comment.user?
          <A href={`/profile/${comment.user._id}`}>@{comment.user.username}</A>
          :" [ deleted ]"}
        { user && comment.user && user._id === comment.user._id && <DeleteIcon onClick={deleteComment} /> }
    <div dangerouslySetInnerHTML={{__html:comment.answer}}></div>
    <UpvoteDownvote quesId = {comment._id} isQues = {2} user={user} totalCount={obj}/>
    <hr />
    </div>
    )
    
}


export default Comment;