import React, { useState, useEffect } from "react"
import {A, navigate } from 'hookrouter';
import './sideNav.css'
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import axiosCall from '../../../ajaxRequest'
import notLoggedIn from '../../../notloggedin'

import CONFIG from '../../../config';


const SideNavBar = function(props) {
    const [categories,setCategories]=useState([]);
    const [ranking,setRanking]=useState([]);
    useEffect(() => {
      let url=`${CONFIG.API_DOMAIN}/Question/getCategory`
      async function fun(){
      await axiosCall('GET', url)
            .then(function (resp) {
                    let b=JSON.parse(JSON.stringify(resp.data));
                    setCategories(b);
                    let a=resp.data;
                     a.push("Total","Followers");
                    setRanking(a);
                  }
            )
      }
      fun(); 
    },[])
    function hover() {
      document.querySelector('.categorybox').style.display='inline-block';
    }
    function unhover(){
      document.querySelector('.categorybox').style.display='none';
    }
    function hover2() {
      document.querySelector('.rankingbox').style.display='inline-block';
    }
    function unhover2(){
      document.querySelector('.rankingbox').style.display='none';
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
        <A href="" onClick={props.user===undefined?notLoggedIn:()=>navigate("/post-question")}>Add Question</A>
        <a style={{display: "inline-block"}} onMouseOver={hover} onMouseOut={unhover} href="#">Categories <ArrowRightIcon /></a>
        <div className="categorybox" onMouseOver={hover} onMouseOut={unhover}>
          {categories.map((el,index)=><A key={index} href={`/questions/category/${el}`}>{el}</A>)}
        </div>
        <a style={{display: "inline-block"}} onMouseOver={hover2} onMouseOut={unhover2}>Rankings <ArrowRightIcon /></a>
        <div className="rankingbox" onMouseOver={hover2} onMouseOut={unhover2}>
          {ranking.map((el,index)=><A key={index} href={`/rankings/${el}`}>{el}</A>)}
        </div>
        <A href="" onClick={()=>navigate("/questions/hot-questions")}>Hot Questions</A>
        <A href="" onClick={()=>navigate("/questions/unanswered-questions")}>Unanswered Questions</A>
        <A href="" onClick={()=>navigate("/questions/latest-questions")}>Latest Questions</A>
    </div>}
</div>

  );

}

export default SideNavBar;