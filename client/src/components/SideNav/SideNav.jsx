import React, { useState,useRef,useEffect } from "react"
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import { navigate } from 'hookrouter';
import './sideNav.css'
import ArrowRightIcon from '@material-ui/icons/ArrowRight';


const SideNavBar = function(props) {
    const categories=["Yoga","Bodybuilding","Beauty","Fashion","Health"]
    function navigateToPostQues(){
        navigate('/feed/post-question');
    }
    function hover() {
      document.querySelector('.categorybox').style.display='inline-block';
    }
    function unhover(){
      document.querySelector('.categorybox').style.display='none';
    }
    function navigateToCategory(el){
      navigate(`/feed/category/${el}`);
    }
    function navigateToHotQuestions(){
      navigate("/feed/hot-questions");
    }
    function navigateToBookmarks(){
      navigate("/feed/bookmarks");
    }
  return (


<div className="sidenav">
    <div>
        <a onClick={navigateToPostQues}>Add Question</a>
        <a  style={{display: "inline-block"}} onMouseOver={hover} onMouseOut={unhover}>Categories <ArrowRightIcon /></a>
        <div className="categorybox" onMouseOver={hover} onMouseOut={unhover}>
          {categories.map((el,index)=><a key={index} onClick={()=>navigateToCategory(el)}>{el}</a>)}
        </div>
        <a onClick={navigateToHotQuestions}>Hot Questions</a>
        <a onClick={navigateToBookmarks}>Bookmarks</a>
    </div>
</div>

  );

}

export default SideNavBar;