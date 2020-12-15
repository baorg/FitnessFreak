import React from "react"
import { A } from 'hookrouter';
import './style.css';
import TimeAgo from 'javascript-time-ago';
import UpvoteDownvote from "../../UpvoteDownvote/upvoteDownvote";
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// English.
import en from 'javascript-time-ago/locale/en'
TimeAgo.addLocale(en)

let styles = {
    question: {
        display: 'flex'
    },
    vote: {
        display: 'flex',
        flexDirection: 'column'
    }
}

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
            <div style={styles.question}>
                {/* <div style={styles.vote}>
                    <div>Up {props.question.vote.up }</div>
                    <div>Down { props.question.vote.down }</div>
                </div> */}
                <div style={styles.vote}>
                    <div style={styles.question}>
                        <span style={{fontSize:20 }}>{props.question.vote ? props.question.vote.up : null}</span>
                        <ExpandLessIcon  style={{color:'black ',fontSize:40}} />
                    </div>
                    <hr/>
                    <div style={styles.question}>
                        <span style={{fontSize:20 }}>{props.question.vote ? props.question.vote.down : null}</span>
                        <ExpandMoreIcon style={{ color: 'black ', fontSize: 40 }} />
                    </div>
                </div>
                <A href={url}><h3>{props.question.title} </h3></A>
            </div>
            <div className="category-container">
                {props.question.category.map(category => (
                    <span className="category-span">{category}</span>
                ))}
            </div>
            <div> - {timeAgo.format(new Date(props.question.posted_at))}</div>
            <A href={`/profile/${props.question.user._id || props.question.user.userId}`}>- @{props.question.user.username}</A>
            <br/><hr/>
        </div>
    );
}


export default Question;