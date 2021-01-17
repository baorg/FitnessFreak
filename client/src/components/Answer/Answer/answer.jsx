import React, {useState,useEffect} from "react"
import { A, navigate } from 'hookrouter';
import { Delete, Done, VerifiedUser } from '@material-ui/icons';
import { Avatar, Paper } from '@material-ui/core';
import styled from 'styled-components';


import UpvoteDownvote from "../../UpvoteDownvote/upvoteDownvote";
import Comment from '../../Comment/Comment/comment';
import QuestionDiv from '../../Question/Question/ques';
import PostComment from "../../Comment/PostComment/postcomment";
import ajaxRequest from '../../../ajaxRequest';
import {API_DOMAIN} from '../../../config';


// Styled Components ========================================================================================

let AnswerDiv = styled(Paper)`
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 10px;
  width: 90%;
  /* border-top: 2px solid #808080;
  border-bottom: 1px solid #b8b8b8; */
  /* border-radius: 10px; */
`;


let AnswerHeadlineDiv = styled.div`
  display: flex;
  border-bottom: 1px solid #808080;

  .user-avatar{
    height: 100%;
    width: 100%;
    max-height: 50px;
    max-width: 50px;
  }

  .user-info-div{
    display: flex;

    .user-name-div{
      margin-left: 5px;
      
      .user-fullname{
        color: black;
        font-size: 1.2em;
      }

      .user-username{
        margin-top: 0;
        font-size: 0.8em;
      }
    }
  }


  .verified-check{
    margin-left: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    .satisfactory-div{
      font-size: 0.8em;
    }
  }
`;

let AnswerBodyDiv = styled.div`
  min-height: 5em;
  padding: 1em 5px 1em 5px;
  margin: 1em 5px 1em 5px;
  /* background-color: white; */
  border-radius: 10px;
`;


let AnswerBottomDiv = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 10%;
`;

let AnswerQuestion = styled.div`
`;
let StyledQuestionDiv = styled(QuestionDiv)`

`;

let StyledPostComment = styled(PostComment)`

`;
// ===========================================================================================================





function Answer({ answer, user, selectedSatisfactoryAnswer, quesId, satisfactory, type=0b00 }) {
  /*
    type -> 
      0.    no comments, no question
      1.    no comments,    question
      2.       comments, no question
      3.       comments,    question
  */
  
  let needComments = ((type & 0b10) == 0b10);
  let needQuestion = ((type & 0b01) == 0b01);


  const [comments,setComments] = useState([]);
  const [voteCount, setVoteCount] = useState(null);
  const [question, setQuestion] = useState(null);
  
  // console.log(props);

    useEffect(() => {
      const obj = { up: answer.vote_count.upvote, down: answer.vote_count.downvote }
      setVoteCount(obj);

      if (needComments) {
        ajaxRequest("get", `${API_DOMAIN}/question/get-comments-of-answer?answerId=${answer._id}`).then(({ data }) => {
          setComments(data.comments);
        });
      }
    }, [ answer ]);

  return (
    <AnswerDiv>
      <AnswerHeadlineDiv>
          <div className="user-info-div">
          {answer.user === null ?
            <><Avatar />
            <div className='user-name-div'>
              <div className='user-fullname'>[ deleted ]</div>
            </div></> :
            <><Avatar className="user-avatar" src={answer?.user.profile_image} />
            <div className='user-name-div'>
              <div className='user-fullname'>{answer.user.first_name} {answer.user.last_name}</div>
              <A href={`/profile/${answer.user._id}`} className='user-username'>@{ answer.user.username }</A>
            </div></>
          }
        </div>
        
        
        {answer.marked &&
          <div className='verified-check'>
            <VerifiedUser style={{ color: "green" }} />
            <span className="satisfactory-div">Satisfactory</span>
          </div>
        }
        { (user?._id === answer.user?._id) && user && answer.user && <Delete onClick={deleteAnswer} />}

        {satisfactory &&
          <Done onClick={() => { selectedSatisfactoryAnswer(answer._id) }} style={{ display: "inline-block", color: "green", marginLeft: "20px" }} />
        }
      </AnswerHeadlineDiv>

      <AnswerBodyDiv dangerouslySetInnerHTML={{ __html: answer.answer }} />
      

      {
        needQuestion &&
        <AnswerQuestion>
          <StyledQuestionDiv question={ answer.question }/>
        </AnswerQuestion>
      }

      <AnswerBottomDiv>
        <UpvoteDownvote quesId={answer._id} isQues={false} user={user} totalCount={voteCount} />
        <StyledPostComment answerId={answer._id} user={user} comments={comments} setComments={setComments} />
      </AnswerBottomDiv>

      
      
      


      {
        needComments &&
        <> <hr />
        <div style={{ marginLeft: "200px", borderLeft: "2px solid #B8B8B8", padding: "20px" }}>
          {comments.length !== 0 ? <h4 style={{ marginBottom: "30px" }}>Comments</h4> : null}
          <div>
            {comments.map((item, index) => <Comment key={index} comment={item} user={user} quesId={quesId} />)}
          </div>
        </div> </>
      }
    
    
    
    </AnswerDiv>
  );


  function deleteAnswer(){
    if (window.confirm("Are you sure you want to delete your answer")) {
      // txt = "You pressed OK!";
      ajaxRequest("post", `${API_DOMAIN}/question/deleteAnswer`, {
        ansId: answer._id
      }).then(({ data }) => {
        if (!data.err) {
          // console.log('data after deletion: ', data);
          window.location.reload();
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