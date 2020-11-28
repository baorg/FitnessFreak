import React, {useState, useEffect}  from "react"
import {navigate, A} from 'hookrouter';
import { Button } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner'
import ajaxRequest from './../../ajaxRequest';
import { ENDPOINT } from "../utils";


// import { MDBSpinner } from 'mdbreact';
function Question(props) { 
    const [question, setQuestion] = useState(null);

    useEffect(async () => {
        let res = await ajaxRequest('GET', `${ENDPOINT}/Question/get-feed-question?id=${props.ques._id}`);
        console.log("res= ",res);
        console.log("props= ",props)
        setQuestion(res.data.question);
    }, []);

    return (
        question ?
            <div>
                <h3>{question.title || "--No title--"} </h3>
                <p style={{wordBreak:"break-word"}}>{question.question}</p>
                <A href={`/profile/${question.user._id}`}>- @{question.user.username}</A>
                <br/>
                {/* <A href = {"/viewFullQuestion/" + props.ques.id }>viewFullAnswer</A> */}
                <Button variant="info" onClick={() => navigate("/viewFullQuestion/" + question._id)}>View Full Answer</Button>
                <br/><hr/>
            </div> :
            <div>
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
                <br/><hr/>
            </div>
    );
}


export default Question;