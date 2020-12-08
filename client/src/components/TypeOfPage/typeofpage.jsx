import React, { useState,useRef,useEffect } from "react"
import MyNav from "../Navigation/navbar/navbar"
import SideNavPage from "../Navigation/SideNav/SideNav";
import '../styles.css'
import Question from "../Question/Question/ques";
import { ENDPOINT } from "../utils";
import axios from "axios";
import { navigate } from 'hookrouter';
import axiosCall from "../../ajaxRequest";

const TypeOfPage = function(props) {

  const [ques, setQues] = useState([]);

  useEffect(() => {
    //axios call
    //if(props.user != null){
    let url=`${ENDPOINT}/Question/`;
    console.log("Calling resOfTypeOfpage");
    console.log("typeogPage = ", props.typeofpage)
    axios.get(url + props.typeofpage, {withCredentials : true})
    .then((res) => {
      console.log("resOfTypeOfpage = ", res.data.questions)
      setQues(res.data.questions);
  })
    // axiosCall('get', url, {"name": props.typeofpage})
    //   .then((res) => {
    //     console.log("resOfTypeOfpage = ", res.data)
    //     //setQues(res.data.questions);
    // })
//}
  }, []);

  return (
    <>
      <MyNav user={props.user} />
      <SideNavPage user={props.user}/>
      <div className="maindivofeverypage">
        <h2>{props.typeofpage}</h2>
        <h2>{props.categoryname}</h2>
        <div>
        { ques.map((item, index) => <Question key={index}  question={item}/>)}
        </div>
      </div>
    </>
  );
};

export default TypeOfPage;
