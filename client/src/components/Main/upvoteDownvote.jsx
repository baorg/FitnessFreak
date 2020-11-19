import React,{useState,useEffect, useRef} from "react"
import { ENDPOINT } from "../utils";
import axiosCall from "../../ajaxRequest"
import {navigate} from "hookrouter"

const UpvoteDownvote = (props) =>{

const [up,setUp]= useState(false);
const [down,setDown]=useState(false);
const upRef=useRef(null);
const downRef=useRef(null);

useEffect(() => {
    axiosCall('post', `${ENDPOINT}/Question/votes/byUser`, {quesId : props.quesId, isQues : props.isQues})
      .then(res => {
        console.log("upvotedata = " ,res.data);
        if(res.data.upvote)
            setUp(true);
        else
        if(res.data.downvote)
            setDown(true);
        
      });
  }, []);

function upvoted(){
    
    if(!up===true){
        upRef.current.name='arrow-up-circle';
        downRef.current.name='arrow-down-circle-outline';
    }
    else{
        upRef.current.name='arrow-up-circle-outline';
    }
     
    //if(!up===true) axios call to add upvote 
    //else axios call to remove upvote
    axiosCall('post', `${ENDPOINT}/Question/votes/editVote`, {quesId : props.quesId, up : !up, isQues : props.isQues})
      .then(() => {
          setUp(!up);
      });

}
function downvoted(){
  
    if(!down===true){
        downRef.current.name='arrow-down-circle';
        upRef.current.name='arrow-up-circle-outline';
    }
    else{
        downRef.current.name='arrow-down-circle-outline';
    }
    
    //if(!down===true) axios call to add downvote 
    //else axios call to remove downvote
    axiosCall('post', `${ENDPOINT}/Question/votes/editVote`, {quesId : props.quesId, down : !down,isQues : props.isQues})
      .then(() => {
          setDown(!down);
      });

}

  return (
    <div>
        <button type="button" onClick={upvoted} ><ion-icon name= {!up ? "arrow-up-circle-outline" : "arrow-up-circle"} className="upvote" ref={upRef} style={{fontSize:"30px"}}></ion-icon></button>
        <button type="button" onClick={downvoted}><ion-icon name={!down ? "arrow-down-circle-outline" : "arrow-down-circle"} className="downvote" ref={downRef} style={{fontSize:"30px"}}></ion-icon></button>
    </div>
  );




}


export default UpvoteDownvote;