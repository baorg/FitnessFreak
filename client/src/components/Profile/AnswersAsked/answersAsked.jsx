import React,{useState,useEffect,useRef} from "react"
import axios from "axios"
import { ENDPOINT } from "../../utils";
import Answer from "../../Answer/Answer/answer";
import PostAnswer from "../../Answer/PostAnswer/postAnswer";
import UpvoteDownvote from "../../UpvoteDownvote/upvoteDownvote";
import MyNav from "../../Navigation/navbar/navbar";
import SideNavBar from "../../Navigation/SideNav/SideNav";
import '../../styles.css'
import BookMark from "../../BookMark/MyBookMark"
function FullQuestion(props){
    const [question, setQuestion] = useState([])
    const [answers, setAnswers] = useState([])
    const [totalCount, setTotalCount] = useState(null);
    useEffect(() => {
        axios.get(`${ENDPOINT}/Question/getQuestions/${props.quesId}`,{ withCredentials: true })
          .then(res => {
            console.log("res.data = " ,res.data);
            const obj = {up : res.data.ques.upCount, down : res.data.ques.downCount}
            setTotalCount(obj);
            setQuestion(res.data.ques.question);
            setAnswers(res.data.ques.answers)
          });
      }, []);

    
   
    return (
    <div>
    <MyNav user={props.user} />
    <SideNavBar user={props.user}/>
    <div className="maindivofeverypage" >
    <h1>{question.title}</h1>
    <div dangerouslySetInnerHTML={{__html:question.question}}></div>
    <br /> <br />
    <UpvoteDownvote quesId = {props.quesId} isQues = {true} totalCount = {totalCount} user={props.user}/>
    <BookMark quesId = {props.quesId} user={props.user}/>
    <h5>Write Your Answer</h5>
    <PostAnswer id = {props.quesId} user={props.user}/>
    <br /><br /><br /><br />
    {answers.length!==0?<h4 style={{marginBottom:"30px"}}>Username's answer</h4>:<h4>No Answers Yet</h4> }
    {answers.map((el, index) => {
      return <Answer key = {index} answer = {el.answer} answerId = {el._id} user={props.user}/>
    })}
    <button>view other answers</button>
    </div>
    </div>
    );
}


export default FullQuestion;