import React  from "react"
import {navigate} from 'hookrouter';

function Question(props){
  
   
    return (
    <div>{props.ques.question}
    {/* <A href = {"/viewFullQuestion/" + props.ques.id }>viewFullAnswer</A> */}
    <button onClick = {() =>navigate("/viewFullQuestion/" + props.ques.id ) }>viewFullAnswer</button>
    </div>
    )
    
}


export default Question;