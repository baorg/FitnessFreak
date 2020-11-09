import React, { useState,useRef,useEffect } from "react"
import MyNav from "../navbar/navbar"
import SideNavPage from "../SideNav/SideNav";
import './styles.css'


const App = function(props) {

  const uploadRef = useRef(null);
  function showuploadbox(){
    uploadRef.current.classList.toggle("uploadbox");
  }

  return (  
    <div  >
      <MyNav  user={props.user} showuploadbox={showuploadbox} />
      <div ref={uploadRef} className="nodisplay" >
      {/* <Question /> */}
      </div>
      <SideNavPage />
    </div>
  );
};

export default App;
