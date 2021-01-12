import React,{useState,useEffect, useRef} from "react"
import axiosCall from "../../ajaxRequest"
import {navigate} from "hookrouter"
import notLoggedIn from "../../notloggedin";
// import ExpandLessIcon from '@material-ui/icons/ExpandLess';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import styled from 'styled-components';
import CONFIG from '../../config';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';



function UpvoteDownvote(props) {
  const [up,setUp]= useState(false);
  const [down,setDown]=useState(false);
  const[clicked, setClicked] = useState(false)
  const totalUpRef=useRef(null);
  const totalDownRef = useRef(null);
  useEffect(() => {
    axiosCall('post', `${CONFIG.API_DOMAIN}/Question/votes/byUser`, {quesId : props.quesId, isQues : props.isQues})
      .then(res => {
        // console.log("upvotedata = " ,res.data);
        if(res.data.upvote)
            setUp(true);
        else
        if(res.data.downvote)
            setDown(true);
      });
  }, []);

  function upvoted(){
    if(!clicked){
    setClicked(true);
    if(!up===true){
        // upRef.current.name='arrow-up-circle';
        // downRef.current.name='arrow-down-circle-outline';
        const num = Number(totalUpRef.current.innerText) + 1;
        totalUpRef.current.innerText = num
        if(down){
          const num = Number(totalDownRef.current.innerText) - 1;
          totalDownRef.current.innerText = num
        }
    }
    else{
        // upRef.current.name='arrow-up-circle-outline';
        const num = Number(totalUpRef.current.innerText) - 1;
        totalUpRef.current.innerText = num
    }
     
    //if(!up===true) axios call to add upvote 
    //else axios call to remove upvote
    axiosCall('post', `${CONFIG.API_DOMAIN}/Question/votes/editVote`, {quesId : props.quesId, up : !up, isQues : props.isQues})
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
        setClicked(false);
      });

  }
}
  function downvoted(){
    if(!clicked){
      setClicked(true);
    // downRef.current.disabled = true;
    // upRef.current.disabled = true;
      if(!down===true){
          // downRef.current.name='arrow-down-circle';
          // upRef.current.name='arrow-up-circle-outline';
          const num = Number(totalDownRef.current.innerText) + 1;
          totalDownRef.current.innerText = num
          //means upvoted
          if(up){
            const num = Number(totalUpRef.current.innerText) - 1;
            totalUpRef.current.innerText = num
          }

      }
      else{
          // downRef.current.name='arrow-down-circle-outline';
          const num = Number(totalDownRef.current.innerText) - 1;
          totalDownRef.current.innerText = num
      }

      //if(!down===true) axios call to add downvote 
      //else axios call to remove downvote
      axiosCall('post', `${CONFIG.API_DOMAIN}/Question/votes/editVote`, {quesId : props.quesId, down : !down,isQues : props.isQues})
        .then(() => {
         
            // same as above
            setUp(false)
            setDown(!down);
            setClicked(false);
        });

  }
}
  
  return (
    <div style={{display:"flex",alignItems:"center",marginTop:"20px"}}>
      
    <span ref={totalUpRef} style={{ fontSize: 20 }}>{props.totalCount ? props.totalCount.up : null}</span>
      <ThumbUpAltIcon
        up={up}
        onClick={!props.user ? notLoggedIn : upvoted}
        color={clicked ? "disabled" : up ? "primary" : ""}
        fontSize="large"
    />

    <span ref={totalDownRef} style={{ fontSize: 20 }}>{props.totalCount ? props.totalCount.down : null}</span>
    <ThumbDownAltIcon
        down = {down}
        onClick={!props.user ? notLoggedIn : downvoted}
        color={clicked ? "disabled" : down ? "secondary" : ""}
        fontSize="large"
    />
  
  
</div>
    
  
  )
}


export default UpvoteDownvote;


