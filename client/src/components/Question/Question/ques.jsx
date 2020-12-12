import React from "react"
import { A } from 'hookrouter';
import './style.css';
import TimeAgo from 'javascript-time-ago'
// English.
import en from 'javascript-time-ago/locale/en'
TimeAgo.addLocale(en)

function Question(props) { 
    // console.log(props);
    const timeAgo = new TimeAgo('en');
    console.log('Created At : ',new Date(props.question.posted_at));
    let url="";
    if(props.type==="answerasked")
    url=`/profile/${props.question.user.userId}/answer-asked/${props.question._id}`
    else
    url=`/viewFullQuestion/${props.question._id}`
    return (
        <div>
            <A href={url}><h3>{props.question.title} </h3></A>
            <div className="category-container">
                {props.question.category.map(category => (
                    <span className="category-span">{category}</span>
                ))}
            </div>
            <div> - {timeAgo.format(new Date(props.question.posted_at))}</div>
            <A href={`/profile/${props.question.user.userId}`}>- @{props.question.user.username}</A>
            <br/><hr/>
        </div>
    );
}


export default Question;