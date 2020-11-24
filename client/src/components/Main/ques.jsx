import React  from "react"
import {navigate, A} from 'hookrouter';

function Question(props){ 
    return (
        <div>
            <h3>{props.ques.title || "--No title--"} </h3>
            <A href={`/profile/${props.ques.user._id}`}>- @{ props.ques.user.username}</A>
            <p>{props.ques.question}</p>
            {/* <A href = {"/viewFullQuestion/" + props.ques.id }>viewFullAnswer</A> */}
            <button onClick={() => navigate("/viewFullQuestion/" + props.ques.id)}>viewFullAnswer</button>
            <br/><hr/>
        </div>);
}


export default Question;