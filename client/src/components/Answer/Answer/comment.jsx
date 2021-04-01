import { useContext, useState }  from "react"
import {A,navigate} from 'hookrouter';

import { UserContext } from '../../utils/UserContext';

import UpvoteDownvote from "./comment_vote";
import DeleteIcon from '@material-ui/icons/Delete';
import CONFIG from '../../../config';
import ajaxRequest from '../../../ajaxRequest';

function Comment({ ansId, comment, deleteComment }){
    const [ user, ] = useContext(UserContext);
    const [ busy, setBusy ] = useState(false);

    return (
      <div style={{marginBottom:"10px"}} className="shiny">
      Commented by { comment.user?
            <A href={`/profile/${comment.user._id}`}>@{comment.user.username}</A>
            :" [ deleted ]"}
          { user && comment.user && user._id === comment.user._id && 
            <DeleteIcon style={{cursor: "pointer"}} onClick={requestDeleteComment} color={busy?"disabled":"primary"} /> }
      <div dangerouslySetInnerHTML={{__html:comment.comment}}></div>
      <UpvoteDownvote 
          ansId={ansId}
          commentId={comment._id}
          vote_count={comment.vote_count} 
          voted={comment.voted}
      />
      <hr />
      </div>
    );

    function requestDeleteComment(){
        if (!busy && window.confirm("Are you sure you want to delete your comment")) {
          // txt = "You pressed OK!";
          ajaxRequest('delete',`${CONFIG.API_DOMAIN}/answer/delete-comment`,{
            answer_id: ansId,
            comment_id:comment._id,
          }).then(async({data})=>{
              if(data.deleted){
                deleteComment();
                // window.location.reload();
                // console.log("Data after deletion: ", res.data);
            } else{
                console.log("error in deleting comment");
            }
          })
        }
    }
    
}


export default Comment;