import React,{useState,useEffect,useRef} from "react"
import axios from "axios"
import { ENDPOINT } from "../../utils";
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



function FullQuestion(props) {
  const [question, setQuestion] = useState(null)
  const [answers, setAnswers] = useState([])
  const [totalCount, setTotalCount] = useState(null);
  useEffect(() => {
    axios.get(`${ENDPOINT}/Question/getQuestions/${props.quesId}`, { withCredentials: true })
      .then(res => {
        console.log("res.data = ", res.data);
        const obj = { up: res.data.ques.upCount, down: res.data.ques.downCount }
        setTotalCount(obj);
        setQuestion(res.data.ques.question);
        setAnswers(res.data.ques.answers)
        console.log(res.data.ques);
      });
      ajaxRequest("GET", `${ENDPOINT}/Question/getAnswersByQuesId`, {
        quesId:props.quesId
      }).then(res=>{
        console.log(res.data);
      })
      
  }, []);

    
   
  return question ?
    (<div>
      < MyNav user={props.user} />
      <SideNavBar user={props.user} />
      <div className="maindivofeverypage" >
        <div style={{ textAlign: "left" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <h1 style={{ display: "inline-block" }}>{question.title}</h1>
            <BookMark quesId={props.quesId} user={props.user} />
          </div>
          <div dangerouslySetInnerHTML={{ __html: question.question }}></div>
          <br /> <br />
          <UpvoteDownvote quesId={props.quesId} isQues={true} totalCount={totalCount} user={props.user} />
        </div>
        <Attachments attachments={question.attachments} />
        <div style={{ textAlign: "left" }} >
          <h5>Write Your Answer</h5>
          <PostAnswer id={props.quesId} user={props.user} />
          <br /><br /><br /><br />
          {answers.length !== 0 ? <h4 style={{ marginBottom: "30px" }}>Answers</h4> : <h4>No Answers Yet</h4>}
          {answers.map((el, index) => {
            return <Answer key={index} answer={el.answer} answerId={el._id} user={props.user} />
          })}
        </div>
      </div>
    </div >) : <Spinner />;
        
}


export default FullQuestion;