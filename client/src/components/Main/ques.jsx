import React  from "react"
import {navigate, A} from 'hookrouter';
import { Button } from 'react-bootstrap';

function Question(props){ 
    return (
        <div>
            <h3>{props.ques.title || "--No title--"} </h3>
            <p style={{wordBreak:"break-word"}}>{props.ques.question}</p>
            <A href={`/profile/${props.ques.user._id}`}>- @{ props.ques.user.username}</A>
            {/* <A href = {"/viewFullQuestion/" + props.ques.id }>viewFullAnswer</A> */}
            <Button variant="info" onClick={() => navigate("/viewFullQuestion/" + props.ques.id)}>View Full Answer</Button>
            <br/><hr/>
        </div>);
}


export default Question;