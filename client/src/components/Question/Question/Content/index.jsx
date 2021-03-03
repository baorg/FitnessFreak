import styled from 'styled-components';
import { A } from 'hookrouter';


import UpDownVote from "../vote";
import { responsive } from '../../../utils/data.json';


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
    max-height: 30em;
    box-sizing: border-box;
    overflow-y: auto;
    font-style: bold;
    justify-content: center;
    text-justify: center;


    .question-content{
        color: black;
        font-style: bold;
        font-size: 1.2em;
        text-align: center;
    }

    ::-webkit-scrollbar-thumb {
      background-color: rgb(109, 109, 109);
      outline: 1px solid rgb(210, 230, 250);
      border-radius: 2px;
    }
    ::-webkit-scrollbar {
      width: 0.5em;
    }

    ::-webkit-scrollbar-track {
      box-shadow: inset 0 0 6px transparent;
      margin-left: 0;
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

let CategoryContainer = styled.div`
    display: flex;
    flex-wrap: wrap;

    >* {
        flex: 1 1 fit-content;
        margin: 10px;
    }
`;


let CategorySpan = styled.span`
    size: 0.8em;
    color: #2f2f2f;
    background-color: ${({ selected }) => selected? "#9ff5a6":"rgb(238, 238, 238)"};
    padding: 0 4px 0 4px;
    width: fit-content;
    border-radius: 6px;
    height: fit-content;
`;


let PostedDate = styled.div`
    font-size: 1.1em;
    color: #666;
    margin-left: auto;
    margin-right: 1em;
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
                {/* <VoteCount >
                    <span>{question.answers_count}</span>
                    <span>answers</span>
                </VoteCount> */}
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
        <CategoryContainer>
                {question.category.map(category => (
                    <CategorySpan className="category-span" selected={selectedCategories!==null && selectedCategories.some(cat=>cat===category)}>{category}</CategorySpan>
                ))}


                <PostedDate>
                    - { new Date(question.posted_at).toLocaleString('en-US', {day: 'numeric', year: 'numeric', month: 'long'}) }
                </PostedDate> 
        </CategoryContainer>
        </>
    );
}

