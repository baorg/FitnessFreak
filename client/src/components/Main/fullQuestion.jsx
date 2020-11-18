import React,{useState,useEffect} from "react"
import axios from "axios"
import { ENDPOINT } from "../utils";
import Answer from "./answer";
import PostAnswer from "./postAnswer";
import UpvoteDownvote from "./upvoteDownvote";
function FullQuestion(props){
    const [question, setQuestion] = useState([])
    const [answers, setAnswers] = useState([])
    useEffect(() => {
        axios.get(`${ENDPOINT}/Question/getQuestions/${props.quesId}`,{ withCredentials: true })
          .then(res => {
            console.log("res.data = " ,res.data);
            setQuestion(res.data.ques);
            setAnswers(res.data.ques.answers)
          });
      }, []);
    return (
    <div>
    <h3>{question.question}</h3>
    <UpvoteDownvote quesId = {props.quesId} />
    <PostAnswer id = {props.quesId}/>
    {answers.map((el, index) => {
      return <Answer key = {index} answer = {el.answer}/>
    })}
    </div>

    );
}


export default FullQuestion;