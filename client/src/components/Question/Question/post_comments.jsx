import React,{useContext, useEffect, useState} from 'react';
import styled from 'styled-components';
import { navigate } from 'hookrouter';
import { TextField, Button } from '@material-ui/core';

import ajaxRequest from 'src/ajaxRequest';
import {API_DOMAIN} from 'src/config';
import { UserContext } from 'src/components/utils/UserContext';

// Styled Components ====================================================

let CommentDiv = styled.div`
    height: 3em;
    flex-grow: 2;
    background: #EFF2F4;
    box-shadow: 20px -8px 34px rgba(255, 255, 255, 0.63);
    border-radius: 8px;
    
    border-radius: 10px;
    margin: 10px 5px 20px 5px;
    padding: 0 10px 0 10px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    box-sizing: border-box;
    .inpt{
        flex: 1;
        background-color: transparent;
        border-style: hidden;
        border-left-style: hidden;
        height: 2.5em;
        /* border-right: 2px solid #888888; */
        :focus{
            outline: none;
        }
}

.submit-btn{
    font-size: 1em;
    text-transform: none;
}
`;

// ======================================================================



export default function PostComment({ parentId, onSubmit, submitting, ...props }){
    const [commentInpt, setCommentInpt] = useState("");
    const [user,] = useContext(UserContext);
    const [submitAnswerDisabled, setSubmitAnswerDisabled] = useState(true);
    useEffect(() => {
        setSubmitAnswerDisabled(user && commentInpt.length > 0 ? false : true);
    }, [user, commentInpt]);

    return (
        <CommentDiv {...props}>
                <input 
                    value={commentInpt}
                    onChange={(el)=>setCommentInpt(el.target.value)}
                    placeholder="Post your comment here.....  "
                    className="cmmnt-text inpt"
                >
                </input>
                <Button
                    disabled={ submitting || submitAnswerDisabled }
                    type="submit"
                    className="post-btn"
                    onClick={submitComment}
                    color="primary"
                >Comment</Button>
            </CommentDiv>
    );

    async function submitComment(){
        if (submitting || submitAnswerDisabled) return;
        onSubmit({ comment: commentInpt }).then(() => {
            setCommentInpt("");
        });
    }
}