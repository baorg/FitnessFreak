import styled from 'styled-components';
import { A } from 'hookrouter';

import CommentBtn from '../../../static/comment_icon';
import UpDownVote from "../vote";
import { responsive } from '../../../utils/data.json';
import PostComment from 'src/components/Question/Question/post_comments';


// Styled components ===================================

let QuestionContent = styled.div`
    display: flex;
    box-sizing: border-box;
    width: 100%;
`;

let QuestionMainDiv = styled.div`
    width: 100%;
    padding: 20px;
`;

let QuestionPreviewDiv = styled.div`
    width: 100%;
    box-sizing: border-box;
    font-style: bold;

    .question-content{
        font-family: SF Pro;
        font-style: normal;
        font-weight: 600;
        color: black;
        text-align: left;
        text-decoration: none;
        font-size: 21px;
        
        @media(max-width: ${responsive.small}){
            font-weight: 400;
            font-size: 15px;
        }
    }

    
`;

let QuestionCountDiv = styled.div`
    margin-right: 4px;
    display: flex;
    flex-direction: column;
    min-height: 8em;
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


let BottomContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;

    .cmmnt-btn{
        margin: 0 10px 0 30px;
        align-self: center;
    }
`;

let CategoryContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: 0 20px 20px 0;
    max-width: 60%;
`;

let CategorySpan = styled.div`
    
    border-radius: 6px;
    height: 30px;
    width: calc(fit-content + 30px);
    background: rgba(6, 91, 251, 0.1);
    border-radius: 5px;
    
    text-align: center;
    padding-top: auto;
    font-family: SF Pro;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 30px;
    padding: 0 10px 0 10px;
    color: #065BFB;
    margin: 2px;
`;

let AnswersCountDiv = styled.div`
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    color: #065BFB;
    margin: 0 0 0 10px;
`;

let PostedDate = styled.div`
    font-size: 1.1em;
    color: #666;
    margin-left: auto;
    margin-right: 1em;
`;

//=======================================================


export default function Content({ question, selectedCategories, url, postComment=false, bottomNeeded=true }){

    // console.log('Question: ', question)


    return (
        <>
        <QuestionContent>
            <QuestionMainDiv>
                <QuestionPreviewDiv>
                    <A 
                        className="question-content" 
                        dangerouslySetInnerHTML={{ __html: question.question }}  
                        href={url} />
                </QuestionPreviewDiv>
            </QuestionMainDiv>
        </QuestionContent>
        <CategoryContainer>
            {question.category.map(category => (
                <CategorySpan 
                    className="category-span" 
                    selected={isSelected(category)}>
                    {category}
                </CategorySpan>
            ))}
        </CategoryContainer>
        {bottomNeeded && <BottomContainer>
            <UpDownVote 
                quesId={question._id}
                vote={question.vote} />
            <CommentBtn className="cmmnt-btn" count={question.comments_count} />
            <AnswersCountDiv>
                    {(question.answers_count !== undefined && question.answers_count !== null) &&
                        (question.answers_count === 0 ? 'Unanswered' : question.answers_count.toString()
                        + (question.answers_count < 2 ? " answer" : " answers"))}
            </AnswersCountDiv>
            {postComment && <PostComment
                    quesId={question._id}
                    onSubmit={postComment}
                />}
        </BottomContainer>}
        </>
    );


    function isSelected(category) {
        return (selectedCategories!==null && selectedCategories.some(cat=>cat===category));
    }
}

