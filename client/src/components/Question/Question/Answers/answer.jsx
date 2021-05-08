import React, {useState,useEffect, useContext} from "react"
import { A, navigate } from 'hookrouter';
import moment from 'moment';

import { Avatar, Container, Paper } from '@material-ui/core';
import {
  Delete,
  Done,
  ThreeSixtySharp,
  VerifiedUser,
  CheckCircle as CheckCircleIcon
} from '@material-ui/icons';
import styled from 'styled-components';

import CommentIcon from '../../../static/comment_icon';
import VoteDiv from '../vote';
import PostComment from "./comment";
import ajaxRequest from '../../../../ajaxRequest';
import {API_DOMAIN} from '../../../../config';
import { UserContext } from "src/components/utils/UserContext";
import { PopupAgreementContext } from 'src/components/utils/PopupAgreementContext';


// Styled Components ========================================================================================

let AnswerDiv = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 10px;
  width: 100%;
  padding-left: 40px;
  box-sizing: border-box;
`;


let AnswerHeadlineDiv = styled.div`
  display: flex;
  margin-bottom: 5px;

  .dlt-icon{
    margin-left: auto;
    cursor: pointer;
  }

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
      margin-left: 20px;
      display: flex;
      flex-direction: column;

      .user-username{
        margin-left: 2px;
        text-decoration: none;
      }

      .deleted{
        color: #888;
      }

      .user-fullname-deleted{
        color: #5f5f5f;
      }

      .posted-date{

        .text{
          font-family: SF Pro;
          font-style: normal;
          font-weight: normal;
          font-size: 14px;
          line-height: 17px;
          color: rgba(66, 66, 89, 0.8);
        }
        .date{
          font-family: SF Pro;
          font-style: normal;
          font-weight: 500;
          font-size: 14px;
          line-height: 17px;
          color: #424259;
        }
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
  border-radius: 10px;
  width: 100%;
  box-sizing: border-box;
  color: #3f3f3f;


  .ans-div{
    width: 100%;
    max-width: 10em;
    /* overflow-x: auto; */
    box-sizing: border-box;
    white-space: pre-wrap;
    white-space: -moz-pre-wrap;
    white-space: -pre-wrap;
    white-space: -o-pre-wrap;
    word-wrap: break-word;
    width: 100%;
    box-sizing: border-box;
  }
`;

let AnswerContentDiv = styled.div`
  display: flex;
  width: 100%;
  box-sizing: border-box;
`;

let AnswerBottomDiv = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  .cmmnt-icon{
    margin-left: 20px; 
  }

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





function Answer({ answer }) {
  const [comments, setComments] = useState([]);
  const [voteCount, setVoteCount] = useState(null);
  const [user,] = useContext(UserContext);
  const showPopup = useContext(PopupAgreementContext);

  return (
    <AnswerDiv>
      <AnswerHeadlineDiv>
        <div className="user-info-div">
          <Avatar src={answer.user && answer.user.profile_image} />
          <div className='user-name-div'>
            {answer.user ?
                <A href={`/profile/${answer.user._id}`} className='user-username'>
                  {answer.user.username}
                  {answer.user.is_verified && <CheckCircleIcon style={{fontSize: 20}} variant="filled" color="primary" />}
                </A>
              : <div className='user-username deleted'>[ deleted ]</div>}

            <div className='posted-date'>
              <span className='text'>Posted on </span>
              <span className='date'> {moment(answer.posted_at).format('MMMM DD, YYYY')} </span>
            </div>
          </div>
        </div>
        {answer.marked &&
          <div className='verified-check'>
            <VerifiedUser style={{ color: "green" }} />
            <span className="satisfactory-div">Satisfactory</span>
          </div>
        }
        {user && answer.user && user._id === answer.user._id && <Delete className="dlt-icon" onClick={deleteAnswer} />}
      </AnswerHeadlineDiv>

      <AnswerContentDiv>
        <AnswerBodyDiv>
          <div className="ans-div" dangerouslySetInnerHTML={{ __html: answer.answer }} />
        </AnswerBodyDiv>
      </AnswerContentDiv>
        
      <AnswerBottomDiv>
        <VoteDiv vote={answer.vote} quesId={answer._id} type={0} />
        <CommentIcon className="cmmnt-icon" count={answer.comments_count} />
        {/* <PostComment answerId={answer._id} user={user} comments={comments} setComments={setComments} /> */}
      </AnswerBottomDiv>
    </AnswerDiv>
  );

  function deleteAnswer() {
    showPopup(
      { content: 'Do you want to delete this answer', title: 'Delete Answer' },
      "Cancel",
      "Delete",
      async () => { },
      del);
  
    async function del() {
      try {
        await ajaxRequest("post", `${API_DOMAIN}/question/deleteAnswer`, {
          ansId: answer._id
        });
          
      } catch (err) {
        
      } finally {
        window.location.reload();
      }
    }
  }
}

 
export default Answer;