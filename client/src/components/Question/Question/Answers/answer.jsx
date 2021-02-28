import React, {useState,useEffect} from "react"
import { A, navigate } from 'hookrouter';
import { Delete, Done, VerifiedUser } from '@material-ui/icons';
import { Avatar, Paper } from '@material-ui/core';
import styled from 'styled-components';


import UpvoteDownvote from "../../../UpvoteDownvote/upvoteDownvote";
import VoteDiv from '../vote';
import PostComment from "./comment";
import ajaxRequest from '../../../../ajaxRequest';
import {API_DOMAIN} from '../../../../config';


// Styled Components ========================================================================================

let AnswerDiv = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 10px;
  width: 100%;
  padding-left: 40px;
`;


let AnswerHeadlineDiv = styled.div`
  display: flex;
  margin-bottom: 5px;

  .ans-prompt{
    font-size: 0.8em;
    color: #808080;
    align-self: center;
  }
  
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
      display: flex;
      align-items: center;

      .user-username{
          margin-left: 2px;
      }

      .deleted{
        color: #888;
      }

      .user-fullname-deleted{
        color: #5f5f5f;
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
  margin: 1em 20px 1em 20px;
  border-radius: 10px;
  width: 90%;
  color: #3f3f3f;

  div{
    white-space: pre-wrap;
    white-space: -moz-pre-wrap;
    white-space: -pre-wrap;
    white-space: -o-pre-wrap;
    word-wrap: break-word;
  }
`;

let AnswerContentDiv = styled.div`
  display: flex;
  width: 40em;
`;

let AnswerBottomDiv = styled.div`
  width: 100%;
  
  .comment-form{
    width: 100%;
    display: flex;
    
    .inpt{
      width: 80%;
    }
    .submit-btn{
      margin-left: auto;

    }
  }
`;

let PostedDate = styled.div`
    font-size: 1.1em;
    color: #666;
    margin-left: auto;
    text-align: right;
`;


// ===========================================================================================================





function Answer({ answer, user }) {
  const [comments,setComments] = useState([]);
  const [voteCount, setVoteCount] = useState(null);

  // useEffect(() => {
  //     fetchComments();
  // }, [ answer ]);

  return (
    <AnswerDiv>
      <AnswerHeadlineDiv>
          <div className="user-info-div">
          <Avatar src={answer.user&&answer.user.profile_image}/>
          <div className='user-name-div'>
            <div className='ans-prompt'>Answered by </div>
              {answer.user ?
                <A href={`/profile/${answer.user._id}`} className='user-username'>{ answer.user.username }</A>
                : <div className='user-username deleted'>[ deleted ]</div>}
            </div>
          </div>
        {answer.marked &&
          <div className='verified-check'>
            <VerifiedUser style={{ color: "green" }} />
            <span className="satisfactory-div">Satisfactory</span>
          </div>
        }
        { (user?._id === answer.user?._id) && user && answer.user && <Delete onClick={deleteAnswer} />}
      </AnswerHeadlineDiv>

        <AnswerContentDiv>
          <VoteDiv vote={answer.vote} quesId={answer._id} type={0} />
          <AnswerBodyDiv>
            <div dangerouslySetInnerHTML={{ __html:answer.answer}} />
          </AnswerBodyDiv>

        </AnswerContentDiv>
        
        {/* <PostedDate>
            - { new Date(answer.posted_at).toLocaleString('en-US', {day: 'numeric', year: 'numeric', month: 'long'}) }
          </PostedDate>  */}

        <AnswerBottomDiv>
            <PostComment answerId={answer._id} user={user} comments={comments} setComments={setComments} />
        </AnswerBottomDiv>
        <hr />
    </AnswerDiv>
  );
    
    /*
    async function fetchComments(){
        const obj = { up: answer.vote_count.upvote, down: answer.vote_count.downvote };
        setVoteCount(obj);
        let res = await ajaxRequest("get", `${API_DOMAIN}/question/get-comments-of-answer?answerId=${answer._id}`);
        setComments(res.data.comments);
    }
    */

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