import React,{useState,useEffect, useRef} from "react"
import { ENDPOINT } from "../utils";
import axiosCall from "../../ajaxRequest"
import {navigate} from "hookrouter"

const UpvoteDownvote = (props) =>{

const [up,setUp]= useState(false);
const [down,setDown]=useState(false);
const upRef=useRef(null);
const downRef=useRef(null);
// useEffect(() => {
//     axios.get(`${ENDPOINT}/`,{ withCredentials: true })
//       .then(res => {
//         console.log("res.data = " ,res.data);
//         if(res.upvote){
//             setUp(true);
//             document.querySelector('.upvote').name="arrow-up-circle";
//         }
//         else{
//             setUp(false);
//         }
//         if(res.downvote){
//             setDown(true);
//             document.querySelector('.downvote').name="arrow-down-circle";
//         }
//         else{
//             setDown(false);
//         }
//       });
//   }, []);

function upvoted(){
    setUp(!up);
    if(!up===true){
        upRef.current.name='arrow-up-circle';
    }
    else{
        upRef.current.name='arrow-up-circle-outline';
    }
    //if(!up===true) axios call to add upvote else axios call to remove upvote

}
function downvoted(){
    setDown(!down);
    if(!down===true){
        downRef.current.name='arrow-down-circle';
    }
    else{
        downRef.current.name='arrow-down-circle-outline';
    }
    //if(!down===true) axios call to add downvote else axios call to remove downvote

}

  return (
    <div>
        <button type="button" onClick={upvoted} ><ion-icon name="arrow-up-circle-outline" className="upvote" ref={upRef} style={{fontSize:"30px"}}></ion-icon></button>
        <button type="button" onClick={downvoted}><ion-icon name="arrow-down-circle-outline" className="downvote" ref={downRef} style={{fontSize:"30px"}}></ion-icon></button>
    </div>
  );




}


export default UpvoteDownvote;