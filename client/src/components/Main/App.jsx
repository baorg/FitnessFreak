import React, { useState,useRef,useEffect } from "react"
import MyNav from "../navbar/navbar"
import SideNavPage from "../SideNav/SideNav";
import PostQuestion from "./Postques";
import './styles.css'


const App = function(props) {

  const uploadRef = useRef(null);
  function showuploadbox(){
    uploadRef.current.classList.toggle("uploadbox");
  }

  return (  
    <div  >
      <MyNav  user={props.user} showuploadbox={showuploadbox} />
      <PostQuestion />
      <div ref={uploadRef} className="nodisplay" ></div>
      <SideNavPage />
    </div>
  );
};

export default App;
