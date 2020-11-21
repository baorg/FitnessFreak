import React  from "react"
import {navigate, A} from 'hookrouter';
import { Button } from 'react-bootstrap';

function Question(props){ 
    return (
        <div>
            <h3>{props.ques.title || "--No title--"} </h3>
            <A href={`/feed/profile/${props.ques.user._id}`}>- @{ props.ques.user.userName}</A>
            <p style={{wordBreak:"break-word"}}>{props.ques.question}</p>
            {/* <A href = {"/viewFullQuestion/" + props.ques.id }>viewFullAnswer</A> */}
            <Button variant="info" onClick={() => navigate("/feed/viewFullQuestion/" + props.ques.id)}>View Full Answer</Button>
            <br/><hr/>
        </div>);
}


export default Question;