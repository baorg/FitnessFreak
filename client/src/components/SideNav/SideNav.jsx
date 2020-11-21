import React, { useState,useRef,useEffect } from "react"
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import { navigate } from 'hookrouter';
// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import './sideNav.css'


const SideNavBar = function(props) {

    function navigateToPostQues(){
        navigate('/feed/post-question');
    }
  return (


<div className="sidenav">
    <div>
        <a onClick={navigateToPostQues}>Add Question</a>
        <a>Categories</a>
        <a>Hot Questions</a>
        <a>Bookmarks</a>
    </div>
</div>

  );

}

export default SideNavBar;