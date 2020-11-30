import React, { useState,useRef,useEffect } from "react"
import MyNav from "../navbar/navbar"
import SideNavPage from "../SideNav/SideNav";
import '../styles.css'
import Question from "../Question/ques";
import { ENDPOINT } from "../utils";
import axios from "axios";
import { navigate } from 'hookrouter';
import axiosCall from "../../ajaxRequest";

const ProfilePrivileges = function(props) {

  const [ques, setQues] = useState([]);

  useEffect(() => {
    //axios call
    if(props.user != null){
    let url=`${ENDPOINT}/Question/profilePrivileges`;
    console.log("Calling resOfTypeOfpage");
    console.log("typeogPage = ", props.typeofpage)
    // console.log("props=",props.user)
    // console.log("props2=",props.userID)
    axios.get(url + props.privilege, {withCredentials : true})
    .then((res) => {
      console.log("resOfTypeOfpage = ", res.data.questions)
    //   setQues(res.data.questions);
  })
    // axiosCall('get', url, {"name": props.typeofpage})
    //   .then((res) => {
    //     console.log("resOfTypeOfpage = ", res.data)
    //     //setQues(res.data.questions);
    // })
}
  }, []);

  return (
    <>
      <MyNav user={props.user} />
      <SideNavPage />
      <div className="maindivofeverypage">
        <h2>{props.privilege} </h2>
        <div>
        { ques.map((item, index) => <Question key={index}  ques={item}/>)}
        </div>
      </div>
    </>
  );
};

export default ProfilePrivileges;
