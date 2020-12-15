import React,{useState,useEffect,useRef} from "react"
import axios from "axios"
import Answer from "../../Answer/Answer/answer";
import PostAnswer from "../../Answer/PostAnswer/postAnswer";
import UpvoteDownvote from "../../UpvoteDownvote/upvoteDownvote";
import MyNav from "../../Navigation/navbar/navbar";
import SideNavBar from "../../Navigation/SideNav/SideNav";
import '../../styles.css'
import './style.css'
import ajaxRequest from '../../../ajaxRequest';

import Attachments from './attachments';
import BookMark from "../../BookMark/MyBookMark";
import { Spinner } from "react-bootstrap";
import { A,navigate } from "hookrouter";

import CONFIG from '../../../config';

function FullQuestion(props) {
  const [question, setQuestion] = useState(null)
  const [answers, setAnswers] = useState([])
  const [totalCount, setTotalCount] = useState(null);
  const [satisfactory, setSatisfactory] = useState(false);
  
  useEffect(() => {
    console.log("in us eseffec");
    axios.get(`${CONFIG.API_DOMAIN}/Question/getQuestions/${props.quesId}`, { withCredentials: true })
      .then(res => {
        console.log("res.data = ", res.data);
        const obj = { up: res.data.ques.vote.up, down: res.data.ques.vote.down }
        setTotalCount(obj);
        setQuestion(res.data.ques);
      });
      ajaxRequest("post", `${CONFIG.API_DOMAIN}/Question/getAnswersByQuesId`, {
        quesId:props.quesId
      }).then(res=>{
        console.log(res.data);
        console.log(typeof(res.data));
        setAnswers(res.data.data);
      })
      if(props.user!==undefined){
        console.log(props.user)
        console.log("inside")
        ajaxRequest("post",`${CONFIG.API_DOMAIN}/Question/isQuestionAskedByUser`,{
          quesId:props.quesId
        }).then(res=>{
            if(res.data.err){
              // navigate("/")
            }
            else if(res.data.data){
              setSatisfactory(true)
            }
        })
      }
  }, [satisfactory]);
   function selectedSatisfactoryAnswer(answerId){
    if (window.confirm("Are you sure you want to mark this answer as the Satisfactory Answer")) {
      // txt = "You pressed OK!";
      ajaxRequest("post",`${CONFIG.API_DOMAIN}/Question/markAnswer`,{
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
    
   
  return question ?
    (<div>
      <MyNav user={props.user} />
      <SideNavBar user={props.user} />
      <div className="maindivofeverypage" >
        <div style={{ textAlign: "left" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <h1 style={{ display: "inline-block" }}>{question.title}</h1>
            <BookMark quesId={props.quesId} user={props.user} />
          </div>
          <p>Asked by <A href={`/profile/${question.user._id}`}>@{question.user.username}</A></p>
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
          <PostAnswer id={props.quesId} user={props.user} />
          <br /><br /><br /><br />
          {answers.length !== 0 ? <h4 style={{ marginBottom: "30px" }}>Answers</h4> : <h4>No Answers Yet</h4>}
          {answers.map((el, index) => {
            return <Answer key={index} answer={el}  user={props.user} satisfactory={satisfactory} selectedSatisfactoryAnswer={selectedSatisfactoryAnswer}/>
          })}
        </div>
      </div>
    </div>) : <Spinner />;
        
}


export default FullQuestion;