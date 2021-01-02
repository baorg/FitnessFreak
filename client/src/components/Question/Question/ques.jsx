import React from "react"
import { A } from 'hookrouter';
import './style.css';
import TimeAgo from 'javascript-time-ago';
import UpvoteDownvote from "../../UpvoteDownvote/upvoteDownvote";
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import styled from 'styled-components';
import noimage from '../../../static/noimage.png';

// English.
import en from 'javascript-time-ago/locale/en'
TimeAgo.addLocale(en)


// Styled components ===================================

let Question = styled.div`
    background-color: white;
    margin: 4px;
    border-radius: 2px;
    border-color: black;
    border-width: 1px;
    border-style: solid;
    width: 100%;
    padding: 4px;
`;

let QuestionHeader = styled.div`
    display: flex;
`;

let ProfileImage = styled.img`
    width: 2em;
    height: 2em;
    border-radius: 50%;
    margin: 5px 5px 0 5px;
`;

let PostedName = styled.div`

`;

let PostedDate = styled.div`
    font-size: 0.7em;
    color: #8f8f8f;
`;

let NameDiv = styled.div`
    
`;

let CategorySpan = styled.span`
    size: 0.8em;
    color: #2f2f2f;
    width: fit-content;
    background-color: rgb(142, 238, 238);
    padding: 0 4px 0 4px;
    margin: 0 2px 0 2px;
    border-radius: 6px;
`;

let QuestionMainDiv = styled.div`

`;
let QuestionTitle = styled.div`
    size: 0.8em;
    font-weight: bolder;
    A{
        color: black;
    }
`;
let QuestionPreviewDiv = styled.div`
    max-height: 10em;
    overflow: hidden;
`;

let ReadMoreDiv = styled.div`
    position: relative;
    top: -1em;
    display: grid;
    place-items: center;
    background-color: rgba(255, 255, 255, 0.753);
`;

let ReadMoreButton = styled.button`
    background-color: #bfd9e0;
    border: 0;
    border-style: none;
    border-radius: 10px;
    :hover{
        transform: scale(1.1);
        background-color: #82d3e9;
    }
`;

let QuestionCountDiv = styled.div`
    margin-right: 4px;
    display: flex;
    flex-direction: column;
`;

let VoteCount = styled.div`
    background-color: ${props => props.count > 0 ? "#a4f3a4" : props.count < 0 ? "#cfacac" : "#fff99e"};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    padding: 0 2px 0 2px;
    margin-bottom: 2px;
    font-size: 0.8em;
    color: #555555;
`;
// =====================================================


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
        url = `/profile/${props.question.user._id}/answer-asked/${props.question._id}`;
    else
        url = `/viewFullQuestion/${props.question._id}`;
    
    return (
        <Question>
            <QuestionHeader>
                <ProfileImage src={props.question.user?.profile_image || noimage } />
                <PostedName>
                    <NameDiv>
                        {props.question.user ?
                            <A href={`/profile/${props.question.user._id || props.question.user.userId}`}> {props.question.user.first_name} {props.question.user.last_name}</A>
                            : "[deleted]"
                        }
                    </NameDiv>
                    <PostedDate>{ new Date(props.question.posted_at).toLocaleString('en-US', {day: 'numeric', year: 'numeric', month: 'long'}) }</PostedDate>
                </PostedName>
                
            </QuestionHeader>
            <hr/>
            <QuestionHeader>
                <QuestionCountDiv>
                    <VoteCount count={props.question.vote.up - props.question.vote.down}>
                        <span>{props.question.vote.up - props.question.vote.down}</span>
                        <span>vote</span>
                    </VoteCount>
                    <VoteCount >
                        <span>{props.question.answers_count}</span>
                        <span>answers</span>
                    </VoteCount>
                </QuestionCountDiv>
                <QuestionMainDiv>
                    <QuestionTitle>
                    <A href={url}>{props.question.title}</A>
                    </QuestionTitle>
                    <QuestionPreviewDiv dangerouslySetInnerHTML={{ __html: props.question.question }} />
                    <ReadMoreDiv>
                        <A href={url}><ReadMoreButton>Read More</ReadMoreButton></A>
                    </ReadMoreDiv>
                </QuestionMainDiv>
                
                
            </QuestionHeader>
            <div className="category-container">
                {props.question.category.map(category => (
                    <CategorySpan className="category-span">{category}</CategorySpan>
                ))}
            </div>
        </Question>
    );
}


{/* <div style={styles.vote}>
    <div style={styles.question}>
        <ExpandLessIcon  style={{color:'black ',fontSize:40}} />
    </div>
    <span style={{fontSize:20, marginLeft: "10px" }}>{props.question.vote ? props.question.vote.up - props.question.vote.down : null}</span>
    <div style={styles.vote}>
        <ExpandMoreIcon style={{ color: 'black ', fontSize: 40 }} />
    </div>
</div> */}