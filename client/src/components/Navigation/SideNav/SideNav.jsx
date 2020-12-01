import React, { useState,useRef,useEffect } from "react"
import {A, navigate } from 'hookrouter';
import './sideNav.css'
import ArrowRightIcon from '@material-ui/icons/ArrowRight';


const SideNavBar = function(props) {
    const categories=["Yoga","Bodybuilding","Beauty","Fashion","Health"]
    function hover() {
      document.querySelector('.categorybox').style.display='inline-block';
    }
    function unhover(){
      document.querySelector('.categorybox').style.display='none';
    }
  return (


<div className="sidenav">
    {props.type==="profile"
    ?<div>
      <A href={`/profile/${props.profileid}/followers`}>Followers</A>
      <A href={`/profile/${props.profileid}/following`}>Following</A>
      {/* <A href="/feed/app">Questions Asked</A> */}
      <A href={`/profile/${props.profileid}/bookmarks`} >Bookmarks</A>
      <A href={`/profile/${props.profileid}/question`} >Question</A>
      <A href={`/profile/${props.profileid}/answer`} >Answer</A>
    </div>
    :<div>
        <A href='/post-question'>Add Question</A>
        <a  style={{display: "inline-block"}} onMouseOver={hover} onMouseOut={unhover}>Categories <ArrowRightIcon /></a>
        <div className="categorybox" onMouseOver={hover} onMouseOut={unhover}>
          {categories.map((el,index)=><A key={index} href={`/category/${el}`}>{el}</A>)}
        </div>
        <A href="/hot-questions">Hot Questions</A>
        <A href="/unanswered-questions">Unanswered Questions</A>
        <A href="/latest-questions">Latest Questions</A>
    </div>}
</div>

  );

}

export default SideNavBar;