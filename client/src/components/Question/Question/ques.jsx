import React from "react"
import { A } from 'hookrouter';
import './style.css';
import TimeAgo from 'javascript-time-ago';
import UpvoteDownvote from "../../UpvoteDownvote/upvoteDownvote";
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import styled from 'styled-components';

// English.
import en from 'javascript-time-ago/locale/en'
TimeAgo.addLocale(en)

const Question = styled.div`
    background-color: white;
    margin: 4px;
    border-radius: 2px;
    border-color: black;
    border-width: 1px;
    border-style: solid;
    width: 100%;
`;

const QuestionHeader = styled.div`
    display: flex;
`;

const ProfileImage = styled.img`
    width: 2em;
    height: 2em;
    border-radius: 50%;
    margin: 5px 5px 0 5px;
`;

let styles = {
    vote: {
        display: 'flex',
        flexDirection: 'column'
    }
}

export default function (props) { 
    // console.log(props);
    const timeAgo = new TimeAgo('en');
    let url="";
    if (props.type === "answerasked")
        url = `/profile/${props.question.user.userId}/answer-asked/${props.question._id}`;
    else
        url = `/viewFullQuestion/${props.question._id}`;
    
    return (
        <Question>
            <QuestionHeader>
                <ProfileImage src={props.question.user.profile_image} />
                Posted by <A href={`/profile/${props.question.user._id || props.question.user.userId}`}> @{props.question.user.username}</A>
            </QuestionHeader>
            <hr/>
            <QuestionHeader>
                {/* <div style={styles.vote}>
                    <div>Up {props.question.vote.up }</div>
                    <div>Down { props.question.vote.down }</div>
                </div> */}
                <div style={styles.vote}>
                    <div style={styles.question}>
                        <ExpandLessIcon  style={{color:'black ',fontSize:40}} />
                    </div>
                    <span style={{fontSize:20, marginLeft: "10px" }}>{props.question.vote ? props.question.vote.up - props.question.vote.down : null}</span>
                    <div style={styles.vote}>
                        <ExpandMoreIcon style={{ color: 'black ', fontSize: 40 }} />
                    </div>
                </div>
                <A href={url}><h3>{props.question.title} </h3></A>
            </QuestionHeader>
            <div className="category-container">
                {props.question.category.map(category => (
                    <span className="category-span">{category}</span>
                ))}
            </div>
            <div> - {timeAgo.format(new Date(props.question.posted_at))}</div>
        </Question>
    );
}
