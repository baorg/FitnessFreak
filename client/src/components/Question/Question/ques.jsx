import React, {useState, useEffect}  from "react"
import {navigate, A} from 'hookrouter';
import { Button } from 'react-bootstrap';
import './style.css';


function Question(props) { 
    console.log(props);

    return (
        <div>
            <A href={`/viewFullQuestion/${props.question._id}`}><h3>{props.question.title} </h3></A>
            <div className="category-container">
                {props.question.category.map(category => (
                    <span className="category-span">{category}</span>
                ))}
            </div>
            <A href={`/profile/${props.question.user._id}`}>- @{props.question.user.username}</A>
            <br/><hr/>
        </div>
    );
}


export default Question;