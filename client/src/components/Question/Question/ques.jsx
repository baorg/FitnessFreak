import React, {useState, useEffect}  from "react"
import {navigate, A} from 'hookrouter';
import { Button } from 'react-bootstrap';


function Question(props) { 

    return (
        <div>
            <h3>{props.question.title || "--No title--"} </h3>
            <div dangerouslySetInnerHTML={{__html:props.question.question}} style={{wordBreak:"break-word"}} ></div>
            <A href={`/profile/${props.question.user._id}`}>- @{props.question.user.username}</A>
            <br/>
            <Button variant="info" onClick={() => navigate("/viewFullQuestion/" + props.question._id + "/" + props.question.user.username )}>View Full Answer</Button>
            <br/><hr/>
        </div>
    );
}


export default Question;