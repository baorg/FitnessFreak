import React, {useState, useEffect}  from "react"
import {navigate, A} from 'hookrouter';
import { Button } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner'
import ajaxRequest from '../../../ajaxRequest';
import { ENDPOINT } from "../../utils";


// import { MDBSpinner } from 'mdbreact';
function Question(props) { 
    // const [question, setQuestion] = useState(null);

    // useEffect(async () => {
    //     let res = await ajaxRequest('GET', `${ENDPOINT}/Question/get-feed-question?id=${props.ques._id}`);
    //     console.log("res= ",res);
    //     console.log("props= ",props)
    //     setQuestion(res.data.question);
    // }, []);

    return (
        <div>
            <h3>{props.question.title || "--No title--"} </h3>
            <div dangerouslySetInnerHTML={{__html:props.question.question}} style={{wordBreak:"break-word"}} ></div>
            {/* <div dangerouslySetInnerHTML={{__html:props.question.question}} ></div> */}
            <A href={`/profile/${props.question.user._id}`}>- @{props.question.user.username}</A>
            <br/>
            {/* <A href = {"/viewFullQuestion/" + props.ques.id }>viewFullAnswer</A> */}
            <Button variant="info" onClick={() => navigate("/viewFullQuestion/" + props.question._id + "/" + props.question.user.username )}>View Full Answer</Button>
            <br/><hr/>
        </div>
    );
}


export default Question;