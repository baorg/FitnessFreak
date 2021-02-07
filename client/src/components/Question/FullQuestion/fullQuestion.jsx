import React,{useState,useEffect,useRef} from "react"
import axios from "axios"
import { Spinner } from "react-bootstrap";
import { A,navigate } from "hookrouter";
import { Avatar } from '@material-ui/core';
import styled from 'styled-components';

import Answer from "../../Answer/Answer/answer";
import PostAnswer from "../../Answer/PostAnswer/postAnswer";
import UpvoteDownvote from "../../UpvoteDownvote/upvoteDownvote";
import SideNavBar from "../../Navigation/SideNav/SideNav";

import '../../styles.css';
import './style.css';
import ajaxRequest from '../../../ajaxRequest';
import Attachments from './attachments';
import BookMark from "../../BookMark/MyBookMark";
import CONFIG from '../../../config';
import DeleteIcon from '@material-ui/icons/Delete';


// Styled Components =======================================================================================


let MainDiv = styled.div`
  margin: -1;
  overflow-x: hide;
  width: 100vw;
  display: grid;
  position: relative;
  top: 80px;
`;

let ContentDiv = styled.div`
  width: 80%;
  max-width: 1200px;
  place-self: center;
`;
let QuestionHeader = styled.div`
  display: flex;


  .flex-right{
    margin-left: auto;
    margin-right: 30px;
    width: fit-content;
    display: flex;
    justify-items: space-between;
  }
  .dlt-icn{
    margin-left: 10px;
  }
  .bkmrk-icn{
    margin-right: 10px;
  }
`;


// ==========================================================================================================


function FullQuestion(props) {
  const [question, setQuestion] = useState(null)
  const [answers, setAnswers] = useState([])
  const [totalCount, setTotalCount] = useState(null);
  const [satisfactory, setSatisfactory] = useState(false);
  
  useEffect(() => {
    async function fetchQuestion() {
      // console.log("in us eseffec");
      let res = await ajaxRequest("get", `${CONFIG.API_DOMAIN}/question/get-question/${props.quesId}`);
        
      // console.log("res.data = ", res.data);
      // const obj = { up: res.data.question.vote.up, down: res.data.question.vote.down }
      setTotalCount(res.data.question.vote);
      setQuestion(res.data.question);
      
      res = await ajaxRequest("get", `${CONFIG.API_DOMAIN}/question/get-answers-of-question?quesId=${props.quesId}`);

      // console.log('RESPONSE DATA: ', res.data);
      // console.log(typeof(res.data));
      setAnswers(res.data.answers);

      if (props.user !== undefined) {
        console.log(props.user);
        console.log("inside");
        ajaxRequest("post", `${CONFIG.API_DOMAIN}/question/isQuestionAskedByUser`, {
          quesId: props.quesId
        }).then(res => {
          if (res.data.err) {
            // navigate("/")
          }
          else if (res.data.data) {
            setSatisfactory(true);
          }
        });
      }
    }
    fetchQuestion();
  }, [satisfactory]);


   function selectedSatisfactoryAnswer(answerId){
    if (window.confirm("Are you sure you want to mark this answer as the Satisfactory Answer")) {
      // txt = "You pressed OK!";
      ajaxRequest("post",`${CONFIG.API_DOMAIN}/question/markAnswer`,{
        quesId:props.quesId,
        answerId:answerId
      }).then(async(res)=>{
        if(res.data){
          navigate("/")
        } else{
          await setSatisfactory(false);
          navigate(`/viewFullQuestion/${props.quesId}`)
        }
      })
    } else {
      // txt = "You pressed Cancel!";
    }
    
  }
  function deleteQuestion(){
    if (window.confirm("Are you sure you want to delete your Question")) {
      // txt = "You pressed OK!";
      ajaxRequest("post",`${CONFIG.API_DOMAIN}/question/deleteQuestion`,{
        quesId:props.quesId
      }).then(async(res)=>{
        if(!res.data.err){
          navigate("/");
        }
        else{
          console.log("error in deleting question");
        }
      })
    } else {
      // txt = "You pressed Cancel!";
    }
  }

  return (<MainDiv>
      {/* <SideNavBar user={props.user} /> */}
      {question &&
      <ContentDiv>
        <QuestionHeader >
          <Avatar alt={`${question.user?.username || 'unknown'}s_profile_image`} src={question.user?.profile_image}/>
          <p>
          <div>Asked By</div>
          <A href={`/profile/${question.user._id}`}>@{question.user.username}</A>
          </p>

          <div className="flex-right">
          <div  className="bkmrk-icn">
            <BookMark quesId={props.quesId} user={props.user} />
          </div>
          {props.user?(props.user._id===question.user._id?
          <DeleteIcon className="dlt-icn" onClick={deleteQuestion}/>:null):null}
          </div>
        </QuestionHeader>
        <div dangerouslySetInnerHTML={{ __html: question.question }} style={{marginTop:"40px"}}></div>
        <br /> <br />  
        <div className="category-container" style={{textAlign:"left",marginBottom:"40px"}}>
          {question.category.length!==0?<p style={{fontSize:"20px"}}>Categories</p>:null}
                {question.category.map(category => (
                    <span className="category-span">{category}</span>
                ))}
        </div>
        <Attachments attachments={question.attachments} />
        <UpvoteDownvote quesId={props.quesId} isQues={true} totalCount={totalCount} user={props.user} />
        <div style={{ textAlign: "left",marginTop:"40px" }} >
          <h5>Write Your Answer</h5>
          <PostAnswer id={props.quesId} user={props.user} setAnswers={setAnswers} answers={answers} />
          <br /><br /><hr/><br /><br />
          {answers.length !== 0 ? <h4 style={{ marginBottom: "30px" }}>Answers</h4> : <h4>No Answers Yet</h4>}
          {answers.map((el, index) => {
            return <Answer key={index} answer={el} user={props.user} satisfactory={satisfactory} selectedSatisfactoryAnswer={selectedSatisfactoryAnswer} quesId={props.quesId} type={2}/>
          })}
        </div>
      </ContentDiv>
     }: <Spinner />
      </MainDiv>);
}


export default FullQuestion;