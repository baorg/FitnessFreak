import React, {useState} from "react"
import {navigate, A } from 'hookrouter';

function Answer(props){
    const [click, setClick] = useState(false);
   
    return (
    <div>{props.answer}
    
    </div>
    )
    
}


export default Answer;