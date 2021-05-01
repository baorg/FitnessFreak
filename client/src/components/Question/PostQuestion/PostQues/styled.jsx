import styled from 'styled-components';
import { responsive } from '../../../utils/data.json';

import CloseIcon from '@material-ui/icons/Close';
import CancelIcon from '@material-ui/icons/Cancel';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';


export const PostQuestionDiv = styled.div`
    background-color: #FFFFFF;
    width: 100%;
    max-width: 822px;
    padding: 35px 50px 35px 50px;
    border-radius: 10px;
    font-family: SF Pro;
    font-style: normal;
    display: flex;
    flex-direction: column;
    margin-bottom: 3em;
    >*{
        margin-top: 25px;
    }
    
    
    @media screen and (max-width: ${responsive.small}){
        border-radius: 0;
        margin-top: 0;
        margin-bottom: 0;
        padding: 30px 15px 30px 15px;
    }
`;

export const QuestionBody = styled.textarea`
    min-height: 120px;
    height: fit-content;
    background: #EFF2F4;
    border-radius: 9px;
    border-width: 0;
    outline: none;
    padding: 10px;

    @media(max-width: ${responsive.small}){

    }

`;

export const PostQuestionHeading = styled.div`
    font-weight: 600;
    font-size: 27px;
    line-height: 32px;
    margin-top: 0;
    color: #424259;
    @media(max-width: ${responsive.small}){
        font-weight: 500;
    }

`;
export const FormDiv = styled.form`
    border: 2px solid black;
    background-color: white;
    padding: 1em;
    margin-bottom: 5em;
    border-radius: 5px;
`;

export const FormContent = styled.div`
    margin-top: 25px;
    display: flex;
    flex-direction: column;
`;

export const FormTitle = styled.div`
    font-style: normal;
    font-weight: 500;
    font-size: 23px;
    line-height: 27px;
    color: #424259;
`;

export const FormDesc = styled.div`
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 24px;
    color: rgba(66, 66, 89, 0.9);
    margin-top: 10px;
    ::after{
        float: right;
        width: 2em;
        text-align: center;
        border-radius: 10px;
        background-color: #b9b9b9;
        color: black;
        content: "${ (props) => props.title?(50 - props.title.length).toString(): null}";
    }
`;

export const TitleInput = styled.input`
    margin-top: 5px;
    width: 100%;
    border-radius: 5px;
    border-width: 2px;
    height: 2em;

`;


// export const QuestionEditor = styled(CKEditor)`
//     min-height: 10em;

// `;

export const CategoriesDiv = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    /* justify-content: space-evenly; */
`;

export const CategoryBtn = styled.div`
    border: 2px solid #8f8f8f;
    border-radius: 4px;
    font-size: 0.8em;
    padding: 0 2px 0 2px;
    cursor: pointer;
    background-color: ${(props) => props.checked?"#4be74b":"white"};
`;


export const StyledCancelIcon = styled(CancelIcon)`
    font-size: 2em;
`;

export const SubmitButton = styled(Button)`
    align-self: center;
    width: 100%;
    height: 50px;
    border-radius: 9px;
    font-family: SF Pro;
    font-style: normal;
    font-weight: 500;
    font-size: 22px;
    line-height: 26px;
    color: #FFFFFF;
    background: #065BFB !important;
    text-transform: none !important;
`;


export const TagsInputContainer = styled.div``;

export const SelectedTags = styled.div`
    display: flex;
    flex-wrap: wrap;
    height: fit-content;
    padding: 10px 10px 10px 10px;
    background-color: #EFF2F4;
    border-radius: 5px;
    margin: 10px 0 0 0;

    .tags{
        font-family: SF Pro;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 17px;
        color: #065BFB;
        width: fit-content;
        padding: 2px 5px 2px 5px;
        background: #FFFFFF;
        border-radius: 4px;
        margin: 5px 2px 5px 2px;
        display: flex;
        .icon{
            font-size: 20px !important;
            margin-left: 10px;
            cursor: pointer;
        }
    }
`;

export const StyledList = styled(List)`
    width: 100%;
    background: #EFF2F4;
    border-radius: 9px;
    border:0;
    padding: 0 30px 5px 30px !important;
    outline: none;
    max-height: 20em;
    overflow: auto;
    scrollbar-color: #E3E3E3 transparent;
    scrollbar-width: thin;
    margin: 20px 0 20px 0 !important;
`;