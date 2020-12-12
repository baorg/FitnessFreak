import React, { useState,useRef,useEffect } from "react"
import MyNav from "../../Navigation/navbar/navbar"
import SideNavPage from "../../Navigation/SideNav/SideNav";
import '../../styles.css'
import Question from "../../Question/Question/ques";
import { ENDPOINT } from "../../utils";
import axios from "axios";
import {A, navigate } from 'hookrouter';
import axiosCall from "../../../ajaxRequest";
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import { Spinner } from "react-bootstrap";  

const ProfilePrivileges = function(props) {

  const [ques, setQues] = useState([]);
  const [type,setType]=useState("");
  const [userDetails,setUserDetails] = useState("");
  const [defaultMessage,setDefaultMessage] = useState("");

  useEffect(() => {
    //axios call
    let url=`${ENDPOINT}/Question/profilePrivileges/`;
    
    // console.log("props=",props.user)
    // console.log("props2=",props.userID)
    axiosCall('post',url + props.privilege, {id:props.userId})
    .then((res) => {
      // console.log("resOfTypeOfpage = ", res.data)
      if(props.privilege==="answer"){
        // console.log("fjwnkjfenwkdjnwkjcnwejkfwnfjn")
            setType("answerasked")
          }
        if(!res.data.question.length)
          setDefaultMessage("No Data")
          else
          {
              // console.log("hi2");
              setQues(res.data.question);
          }
        //  console.log(res.data.question);
  })
  let url2=`${ENDPOINT}/Users/get-userdata-id`
    axiosCall('post', url2, {user_id: props.userId})
      .then((res) => {
        // console.log("resOfTypeOfpage = ", res.data)
        //setQues(res.data.questions);
        setUserDetails(res.data.user);
    })
  }, []);

  return (ques && userDetails?
    (<>
      <MyNav user={props.user} />
      <SideNavPage type="profile" profileid={props.userId} user={props.user}/>
      <div className="maindivofeverypage">
        <h2 style={{marginBottom:"40px"}}>{props.privilege} of <A href={`/profile/${userDetails._id}`}>{userDetails.username}</A></h2>
        <div>
        <h5>{defaultMessage} {defaultMessage!==""?<SentimentVeryDissatisfiedIcon />:null }</h5>
        { ques.map((item, index) => <Question key={index}  question={item} type={type}/>)}
        </div>
      </div>
    </>):<Spinner />
  );
};

export default ProfilePrivileges;
