import React,{useState,useEffect, useRef} from "react"
import { ENDPOINT } from "../utils";
import axiosCall from "../../ajaxRequest"
import {navigate} from "hookrouter"
import notLoggedIn from "../../notloggedin";

const UpvoteDownvote = (props) =>{

const [up,setUp]= useState(false);
const [down,setDown]=useState(false);
const upRef=useRef(null);
const downRef=useRef(null);
const totalUpRef=useRef(null);
const totalDownRef=useRef(null);
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
        const num = Number(totalUpRef.current.innerText) + 1;
        totalUpRef.current.innerText = num
        if(down){
          const num = Number(totalDownRef.current.innerText) - 1;
          totalDownRef.current.innerText = num
        }
    }
    else{
        upRef.current.name='arrow-up-circle-outline';
        const num = Number(totalUpRef.current.innerText) - 1;
        totalUpRef.current.innerText = num
    }
     
    //if(!up===true) axios call to add upvote 
    //else axios call to remove upvote
    axiosCall('post', `${ENDPOINT}/Question/votes/editVote`, {quesId : props.quesId, up : !up, isQues : props.isQues})
      .then(() => {
        // setUp false in downvoted function ensures that whatever is the state of upvote whether clicked or unclicked
        // so that we always downvote if downvote button gets clicked.
        // what will happen if we don't do this
        // U represents up
        // D represent down
        // consider the scenario -
        // U->D->U
        // the upstate == true then downstate == true then as upstate == true we will again decrement the
        // vote thinking that someone is removing its upvote rather increment the votes
        // so that's why we need to set state setUp false in downvoted function
        
        setDown(false);
          setUp(!up);
      });

}
function downvoted(){
  
    if(!down===true){
        downRef.current.name='arrow-down-circle';
        upRef.current.name='arrow-up-circle-outline';
        const num = Number(totalDownRef.current.innerText) + 1;
        totalDownRef.current.innerText = num
        //means upvoted
        if(up){
          const num = Number(totalUpRef.current.innerText) - 1;
          totalUpRef.current.innerText = num
        }

    }
    else{
        downRef.current.name='arrow-down-circle-outline';
        const num = Number(totalDownRef.current.innerText) - 1;
        totalDownRef.current.innerText = num
    }
    
    //if(!down===true) axios call to add downvote 
    //else axios call to remove downvote
    axiosCall('post', `${ENDPOINT}/Question/votes/editVote`, {quesId : props.quesId, down : !down,isQues : props.isQues})
      .then(() => {
          // same as above
          setUp(false)
          setDown(!down);
      });

}

  return (
    <div style={{display:"flex",alignItems:"center"}}>
        <p style={{display:"inline-block"}} >Upvotes/Downvotes</p> &nbsp;&nbsp;&nbsp;&nbsp;
        <span ref = {totalUpRef}>{props.totalCount ? props.totalCount.up : null}</span>
        <button type="button" onClick={props.user===null?notLoggedIn:upvoted} ><ion-icon name= {!up ? "arrow-up-circle-outline" : "arrow-up-circle"} className="upvote" ref={upRef} style={{fontSize:"20px"}}></ion-icon></button>
        <span ref = {totalDownRef}>{props.totalCount ? props.totalCount.down : null}</span>
        <button type="button" onClick={props.user===null?notLoggedIn:downvoted}><ion-icon name={!down ? "arrow-down-circle-outline" : "arrow-down-circle"} className="downvote" ref={downRef} style={{fontSize:"20px"}}></ion-icon></button>
    </div>
  );




}


export default UpvoteDownvote;