import React, { useState,useRef,useEffect } from "react"
import MyNav from "../navbar/navbar"
import SideNavPage from "../SideNav/SideNav";
import './styles.css'
import Question from "./ques";
import { ENDPOINT } from "../utils";
import axios from "axios";
import { navigate } from 'hookrouter';
import axiosCall from "../../ajaxRequest";

const TypeOfPage = function(props) {

  const [ques, setQues] = useState([]);

  // useEffect(() => {
  //   //axios call
  //   let url=``;
  //   axiosCall('get', url, {userid:props.user.id})
  //     .then((res) => {
  //       setQues(res.data.questions);
  //   })
  // }, []);

  return (
    <>
      <MyNav user={props.user} />
      <SideNavPage />
      <div className="maindivofeverypage">
        <h2>{props.typeofpage}</h2>
        <h2>{props.categoryname}</h2>
        {/* <div>
        { ques.map((item, index) => <Question key={index}  ques={item}/>)}
        </div> */}
      </div>
    </>
  );
};

export default TypeOfPage;
