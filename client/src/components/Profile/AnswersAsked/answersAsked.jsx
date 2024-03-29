import React,{useState,useEffect } from "react"
import axios from "axios"
import Answer from "../../Answer/Answer/answer";
// import PostAnswer from "../../Answer/PostAnswer/postAnswer";
import UpvoteDownvote from "../../UpvoteDownvote/upvoteDownvote";
import MyNav from "../../Navigation/navbar/navbar";
import SideNavBar from "../../Navigation/SideNav/SideNav";
import '../../styles.css'
import './style.css'
import ajaxRequest from '../../../ajaxRequest';
import { navigate } from 'hookrouter'
import Attachments from './attachments';
import BookMark from "../../BookMark/MyBookMark";
import { Spinner } from "react-bootstrap";
import { Button } from 'react-bootstrap'


import CONFIG from '../../../config';


function AnswerAsked(props) {
  const [question, setQuestion] = useState(null)
  const [answers, setAnswers] = useState([])
  const [totalCount, setTotalCount] = useState(null);
  // const [user,setUser]=useState(null);
  useEffect(() => {
    axios.get(`${CONFIG.API_DOMAIN}/Question/getQuestions/${props.quesId}`, { withCredentials: true })
      .then(res => {
        console.log("res.data = ", res.data);
        const obj = { up: res.data.ques.vote_count.upvote, down: res.data.ques.vote_count.downvote }
        setTotalCount(obj);
        setQuestion(res.data.ques);
      });
      ajaxRequest("post", `${CONFIG.API_DOMAIN}/Question/getAnswersByUserOnly/${props.quesId}`,{id:props.userId})
      .then(res=>{
        console.log(res.data);
        console.log(typeof(res.data));
        setAnswers(res.data.data);
        // setUser(res.data.data.user);
      })
      
  }, []);

    console.log(props)
   
  return question && answers ?
    (<div>
      <MyNav user={props.user} />
      <SideNavBar user={props.user} />
      <div className="maindivofeverypage" >
        <div style={{ textAlign: "left" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <h1 style={{ display: "inline-block" }}>{question.title}</h1>
            <BookMark quesId={props.quesId} user={props.user} />
          </div>
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
          
          {answers.length !== 0 ? <h4 style={{ marginBottom: "30px" }}>Answers</h4> : <h4>No Answers Yet</h4>}
          {answers.map((el, index) => {
            return <Answer key={index} answer={el}  user={props.user} />
          })}
        </div>
        <Button variant="primary" onClick={()=>navigate(`/viewFullQuestion/${props.quesId}`)} style={{margin:"10px"}}>View All Answers</Button>
      </div>
    </div>) : <Spinner />;
        
}


export default AnswerAsked;