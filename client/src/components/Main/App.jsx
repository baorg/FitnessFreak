import React, { useState,useRef,useEffect } from "react"
import MyNav from "../navbar/navbar"
import SideNavPage from "../SideNav/SideNav";
import './styles.css'
import Question from "./ques";

const ques = [{id : "8asu8asdas9jsa", question : "Stringsijsaoijasojjaosioasdoas"}];
const App = function(props) {


  const uploadRef = useRef(null);
  function showuploadbox(){
    uploadRef.current.classList.toggle("uploadbox");
  }

  return (  
    <div>
      <MyNav  user={props.user} showuploadbox={showuploadbox} />
      <div ref={uploadRef} className="nodisplay" ></div>
      <SideNavPage />
      {ques.map((item, index) => {
        return(
        <Question key = {index}  ques = {item}/>
        )
      })}
    </div>
  );
};

export default App;
