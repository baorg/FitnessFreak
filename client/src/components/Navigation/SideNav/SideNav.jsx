import React, { useState, useEffect } from "react"
import {A, navigate } from 'hookrouter';
import './sideNav.css'
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import axiosCall from '../../../ajaxRequest'
import notLoggedIn from '../../../notloggedin'

import CONFIG from '../../../config';

{/* <div className="sidenav">
    {props.type==="profile"
    ?<div>
      <A href={`/profile/${props.profileid}/followers`}>Followers</A>
      <A href={`/profile/${props.profileid}/following`}>Following</A>
      <A href="/feed/app">Questions Asked</A>
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
</div> */}

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



<div className="sidebar-container">
  <br/><br/><br/>
  <div className="sidebar-logo">
    Categories
  </div>
  <ul className="sidebar-navigation">
    {/* <li className="header">Navigation</li> */}
    <li style={{display:"flex"}}>
      <a href="#">
        <i className="fa fa-home" aria-hidden="true"></i> Beauty
        <img style={{marginLeft:"20px",marginTop:"-5px"}} width="30" height="30" src="https://www.flaticon.com/svg/static/icons/svg/599/599560.svg" alt="Nail polish" title="Nail polish" class="loaded"></img>
      </a>
    </li>
    <li>
      <a href="#">
        <i className="fa fa-tachometer" aria-hidden="true"></i> Fashion
        <img style={{marginLeft:"20px",marginTop:"-5px"}} width="30" height="30" src="https://www.flaticon.com/svg/static/icons/svg/3050/3050253.svg" alt="Dress free icon" title="Dress free icon" class="loaded"></img>
      </a>
    </li>
    {/* <li className="header">Another Menu</li> */}
    <li>
      <a href="#">
        <i className="fa fa-users" aria-hidden="true"></i> Fitness
        <img style={{marginLeft:"20px",marginTop:"-5px"}} width="30" height="30" src="https://www.flaticon.com/svg/static/icons/svg/2964/2964514.svg" alt="Fitness free icon" title="Fitness free icon" class="loaded"></img>
      </a>
    </li>
    <li>
      <a href="#">
        <i className="fa fa-cog" aria-hidden="true"></i> Nutrition
        <img style={{marginLeft:"20px",marginTop:"-5px"}} width="30" height="30" src="https://www.flaticon.com/premium-icon/icons/svg/561/561611.svg" alt="Diet premium icon" title="Diet premium icon" class="loaded"></img>
      </a>
    </li>
    <li>
      <a href="#">
        <i className="fa fa-info-circle" aria-hidden="true"></i> Health
        <img style={{marginLeft:"20px",marginTop:"-5px"}} width="30" height="30" src="https://www.flaticon.com/svg/static/icons/svg/1142/1142172.svg" alt="Heartbeat free icon" title="Heartbeat free icon" class="loaded"></img>
      </a>
    </li>
    <li>
      <a href="#">
        <i className="fa fa-info-circle" aria-hidden="true"></i> Lifestyle
        <img style={{marginLeft:"20px",marginTop:"-5px"}} width="30" height="30" src="https://www.flaticon.com/svg/static/icons/svg/2829/2829802.svg" alt="Balance" title="Balance" class="loaded"></img>
      </a>
    </li>
    <li>
      <a href="#">
        <i className="fa fa-info-circle" aria-hidden="true"></i> Sports
        <img  style={{marginLeft:"20px",marginTop:"-5px"}} width="30" height="30" src="https://www.flaticon.com/premium-icon/icons/svg/3311/3311579.svg" alt="Sports premium icon" title="Sports premium icon" class="loaded"></img>
      </a>
    </li>
    <li>
      <a href="#">
        <i className="fa fa-info-circle" aria-hidden="true"></i> Yoga
        <img style={{marginLeft:"20px",marginTop:"-5px"}} width="30" height="30" src="https://www.flaticon.com/svg/static/icons/svg/2647/2647625.svg" alt="Lotus free icon" title="Lotus free icon" class="loaded"></img>
      </a>
    </li>
    <li>
      <a href="#">
        <i className="fa fa-info-circle" aria-hidden="true"></i> Entertainment
        <img style={{marginLeft:"20px",marginTop:"-5px"}} width="30" height="30" src="https://www.flaticon.com/svg/static/icons/svg/3163/3163478.svg" alt="Popcorn free icon" title="Popcorn free icon" class="loaded"></img>
      </a>
    </li>
  </ul>
</div>



  );

}

export default SideNavBar;