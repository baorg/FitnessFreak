import React,{useState,useEffect,useRef} from "react"
import axios from "axios"
import { ENDPOINT } from "../utils";
import Answer from "./answer";
import PostAnswer from "./postAnswer";
import UpvoteDownvote from "./upvoteDownvote";
function FullQuestion(props){
    const [question, setQuestion] = useState([])
    const [answers, setAnswers] = useState([])
    const [totalCount, setTotalCount] = useState(0);
    useEffect(() => {
        axios.get(`${ENDPOINT}/Question/getQuestions/${props.quesId}`,{ withCredentials: true })
          .then(res => {
            console.log("res.data = " ,res.data);
            setTotalCount(res.data.ques.upDownCount);
            setQuestion(res.data.ques.question);
            setAnswers(res.data.ques.answers)
          });
      }, []);
    return (
    <div style={{marginLeft:"10px",marginTop:"10px"}}>
    <h1>{question.title}</h1>
    <h3>{question.question}</h3>
    <UpvoteDownvote quesId = {props.quesId} isQues = {true} totalCount = {totalCount}/>
    <h5>Write Your Answer</h5>
    <PostAnswer id = {props.quesId}/>
    <br /><br /><br /><br />
    {answers.length!==0?<h4 style={{marginBottom:"30px"}}>Answers</h4>:null }
    {answers.map((el, index) => {
      return <Answer key = {index} answer = {el.answer} answerId = {el._id}/>
    })}
    </div>

    );
}


export default FullQuestion;