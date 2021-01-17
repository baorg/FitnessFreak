import React, {useState,useEffect} from "react"
import { A,navigate } from 'hookrouter';
import UpvoteDownvote from "../../UpvoteDownvote/upvoteDownvote";
import Comment from '../../Comment/Comment/comment';
import '../../styles.css'
import PostComment from "../../Comment/PostComment/postcomment";
import ajaxRequest from '../../../ajaxRequest';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import DoneIcon from '@material-ui/icons/Done';
import DeleteIcon from '@material-ui/icons/Delete';
import {API_DOMAIN} from '../../../config';

function Answer({ answer, user, selectedSatisfactoryAnswer, quesId, satisfactory, type=0 }) {
  /*
    type -> 
              0.    no comments, no question
              1.    no comments,    question
              2.       comments, no question
              3.       comments,    question
  */
  const [comments,setComments] = useState([]);
  const [question, setQuestion] = useState(null);
  const [voteCount, setVoteCount] = useState(null);
  
  // console.log(props);

    useEffect(() => {
      const obj = { up: answer.vote_count.upvote, down: answer.vote_count.downvote }
      setVoteCount(obj);
      ajaxRequest("get", `${API_DOMAIN}/question/get-comments-of-answer?answerId=${answer._id}`).then(({ data }) => {
        // console.log(res.data);
        // console.log(typeof (res.data));
        setComments(data.comments);
      });
      }, [ answer ]);

  return (
    <div style={{ marginBottom: "20px", borderBottom: "2px solid #B8B8B8", padding: "10px" }}  >
      { answer.marked ? <VerifiedUserIcon style={{ color: "green" }} /> : null }
      Answered by
      { answer.user === null
        ? " [deleted]"
        : <A href={`/profile/${answer.user._id}`} style={{ display: "inline-block" }}>@{ answer.user.username }</A>
      }
      { (user?._id === answer.user?._id) && user && answer.user && <DeleteIcon onClick={deleteAnswer} />}
      {satisfactory ? <DoneIcon onClick={() => { selectedSatisfactoryAnswer(answer._id) }} style={{ display: "inline-block", color: "green", marginLeft: "20px" }} /> : null}
      <div style={{ marginTop: "20px" }} dangerouslySetInnerHTML={{ __html: answer.answer }}></div>

      <UpvoteDownvote quesId={answer._id} isQues={false} user={user} totalCount={voteCount} />
      <hr />
      <div style={{ marginLeft: "200px", borderLeft: "2px solid #B8B8B8", padding: "20px" }}>
        <PostComment answerId={answer._id} user={user} comments={comments} setComments={setComments} />
        {comments.length !== 0 ? <h4 style={{ marginBottom: "30px" }}>Comments</h4> : null}
        <div>
          {comments.map((item, index) => <Comment key={index} comment={item} user={user} quesId={quesId} />)}
        </div>
      </div>
    </div>
  );


  function deleteAnswer(){
    if (window.confirm("Are you sure you want to delete your answer")) {
      // txt = "You pressed OK!";
      ajaxRequest("post", `${API_DOMAIN}/question/deleteAnswer`, {
        ansId: answer._id
      }).then(({ data }) => {
        if (!data.err) {
          window.location.reload()
        } else {
          console.log("error in deleting answer");
        }
      });
    } else {
      // txt = "You pressed Cancel!";
    }
  }

}

 
export default Answer;