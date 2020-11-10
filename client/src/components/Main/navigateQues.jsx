import React from "react"
import { useRoutes } from 'hookrouter';
import FullQuestion from "./fullQuestion"

function getRoutes() {
    return {
      '/' : () => (quesId) => <FullQuestion quesId = {quesId}/>,
    }
  }
  
  function NavigateQuestion(props) {
    
    
    const page = useRoutes(getRoutes(props.quesId));
    return (
      page || <FullQuestion quesId = {props.quesId}/>
    );
  }
  

export default NavigateQuestion;