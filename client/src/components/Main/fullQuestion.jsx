import React,{useState,useEffect} from "react"
import axios from "axios"
import { ENDPOINT } from "../utils";
import Answer from "./answer";

function FullQuestion(props){
    const [question, setQuestion] = useState([])
    
    useEffect(() => {
        axios.get(`${ENDPOINT}/Question/getQuestions/${props.quesId}`,{ withCredentials: true })
          .then(res => {
            console.log("res.data = " ,res.data);
            setQuestion(res.data.ques);
          });
      }, []);
    return (
    <div>
    <h3>{question.question}</h3>
    <textarea placeholder="Write your answer"></textarea>
    <button type="submit">Post</button>
    {/* {question.answers.map((item, index) => {
        <Answer answer = {item} />
    })} */}
   
    
    </div>

    );
}


export default FullQuestion;