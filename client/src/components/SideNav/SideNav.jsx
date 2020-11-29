import React, { useState,useRef,useEffect } from "react"
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import {A, navigate } from 'hookrouter';
import './sideNav.css'
import ArrowRightIcon from '@material-ui/icons/ArrowRight';


const SideNavBar = function(props) {
    const categories=["Yoga","Bodybuilding","Beauty","Fashion","Health"]
    function navigateToPostQues(){
        navigate('/post-question');
    }
    function hover() {
      document.querySelector('.categorybox').style.display='inline-block';
    }
    function unhover(){
      document.querySelector('.categorybox').style.display='none';
    }
    function navigateToCategory(el){
      navigate(`/category/${el}`);
    }
    function navigateToHotQuestions(){
      navigate("/hot-questions");
    }
    function navigateToUnansweredQuestions(){
      navigate("/unanswered-questions");
    }
    function navigateToLatestQuestions(){
      navigate("/latest-questions");
    }
  return (


<div className="sidenav">
    {props.type==="profile"
    ?<div>
      <A href={`/followers/${props.profileid}`}>Followers</A>
      <A href={`/following/${props.profileid}`}>Following</A>
      {/* <A href="/feed/app">Questions Asked</A> */}
      <a>Answers Given</a>
      <A href="/" >Bookmarks</A>
    </div>
    :<div>
        <a onClick={navigateToPostQues}>Add Question</a>
        <a  style={{display: "inline-block"}} onMouseOver={hover} onMouseOut={unhover}>Categories <ArrowRightIcon /></a>
        <div className="categorybox" onMouseOver={hover} onMouseOut={unhover}>
          {categories.map((el,index)=><a key={index} onClick={()=>navigateToCategory(el)}>{el}</a>)}
        </div>
        <a onClick={navigateToHotQuestions}>Hot Questions</a>
        <a onClick={navigateToUnansweredQuestions}>Unanswered Questions</a>
        <a onClick={navigateToLatestQuestions}>Latest Questions</a>
    </div>}
</div>

  );

}

export default SideNavBar;