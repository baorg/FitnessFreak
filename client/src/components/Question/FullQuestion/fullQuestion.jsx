import React,{useState,useEffect,useRef} from "react"
import axios from "axios"
import { Spinner } from "react-bootstrap";
import { A,navigate } from "hookrouter";
import { Avatar } from '@material-ui/core';

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

      console.log(res.data);
      console.log(typeof(res.data));
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
        }
        else{
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
        if(res.data){
          navigate("/")
        }
        else{
        }
      })
    } else {
      // txt = "You pressed Cancel!";
    }
  }

  return question ?
    (<div>
      {/* <SideNavBar user={props.user} /> */}
      <div className="maindivofeverypage" >
        <div style={{ textAlign: "left" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <h1 style={{ display: "inline-block" }}>{question.title}</h1>
            <BookMark quesId={props.quesId} user={props.user} />
          </div>
          <p>Asked by
          <A href={`/profile/${question.user._id}`}>@{question.user.username}</A></p>
          {props.user?(props.user._id===question.user._id?<DeleteIcon onClick={deleteQuestion}/>:null):null}
          <Avatar alt={`${question.user?.username || 'unknown'}s_profile_image`} src={question.user?.profile_image}/>
          <div dangerouslySetInnerHTML={{ __html: question.question }} style={{marginTop:"40px"}}></div>
          <br /> <br />
          
        </div>
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
            return <Answer key={index} answer={el}  user={props.user} satisfactory={satisfactory} selectedSatisfactoryAnswer={selectedSatisfactoryAnswer}/>
          })}
        </div>
      </div>
    </div>) : <Spinner />;
        
}


export default FullQuestion;