import React, { useState,useRef,useEffect } from "react"
import MyNav from "../../Navigation/navbar/navbar"
import SideNavPage from "../../Navigation/SideNav/SideNav";
import '../../styles.css'
import Question from "../../Question/Question/ques";
import { ENDPOINT } from "../../utils";
import axios from "axios";
import { navigate } from 'hookrouter';
import axiosCall from "../../../ajaxRequest";

const ProfilePrivileges = function(props) {

  const [ques, setQues] = useState([]);
  const defaultMessage = useRef(null);
  useEffect(() => {
    //axios call
    if(props.user != null){
    let url=`${ENDPOINT}/Question/profilePrivileges/`;
  
    // console.log("props=",props.user)
    // console.log("props2=",props.userID)
    axios.get(url + props.privilege, {withCredentials : true})
    .then((res) => {
      console.log("resOfTypeOfpage = ", res.data)
      if(!res.data.question.length)
      defaultMessage.current.innerText = "NO Data"
      else
         setQues(res.data.question);
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
      <SideNavPage type="profile" profileid={props.userId}/>
      <div className="maindivofeverypage">
        <h2>{props.privilege} </h2>
        <div>
        <h3 ref = {defaultMessage}></h3>
        { ques.map((item, index) => <Question key={index}  ques={item}/>)}
        </div>
      </div>
    </>
  );
};

export default ProfilePrivileges;
