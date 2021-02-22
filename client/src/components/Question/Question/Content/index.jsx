import styled from 'styled-components';
import { A } from 'hookrouter';


import UpDownVote from "../vote";


// Styled components ===================================

let QuestionContent = styled.div`
    display: flex;
`;

let QuestionMainDiv = styled.div`
    width: 100%;
`;

let QuestionPreviewDiv = styled.div`
    width: 100%;
    max-height: 25em;
    overflow: scroll;
    font-style: bold;

    .question-content{
        color: black;
        text-decoration: none;
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



let CategorySpan = styled.span`
    size: 0.8em;
    color: #2f2f2f;
    width: fit-content;
    background-color: ${({ selected }) => selected? "#9ff5a6":"rgb(238, 238, 238)"};
    padding: 0 4px 0 4px;
    margin: 0 2px 0 2px;
    border-radius: 6px;
`;


//=======================================================


export default function Content({ question, selectedCategories, url }){
    return (
        <>
        <QuestionContent>
            <QuestionCountDiv>
                <UpDownVote 
                    quesId={question._id} 
                    vote={question.vote}
                />
                <VoteCount >
                    <span>{question.answers_count}</span>
                    <span>answers</span>
                </VoteCount>
            </QuestionCountDiv>
            <QuestionMainDiv>
                <QuestionPreviewDiv>
                    <A 
                        className="question-content" 
                        dangerouslySetInnerHTML={{ __html: question.question }}  
                        href={url} />
                </QuestionPreviewDiv>
            </QuestionMainDiv>
        </QuestionContent>
        <div className="category-container">
                {question.category.map(category => (
                    <CategorySpan className="category-span" selected={selectedCategories!==null && selectedCategories.some(cat=>cat===category)}>{category}</CategorySpan>
                ))}
            </div>
        </>
    );
}