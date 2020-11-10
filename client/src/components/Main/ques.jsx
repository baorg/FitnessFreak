import React, {useState} from "react"
import {navigate, A } from 'hookrouter';

function Question(props){
    const [click, setClick] = useState(false);
   
    return (
    <div>{props.ques.question}
    
    {/* <A href = {"/viewFullQuestion/" + props.ques.id }>viewFullAnswer</A> */}
    <button onClick = {() =>navigate("/viewFullQuestion/" + props.ques.id ) }>viewFullAnswer</button>
    
    
    </div>
    )
    
}


export default Question;