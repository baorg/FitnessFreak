import React,{useState} from "react"
import {navigate} from "hookrouter"
import styled from 'styled-components'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Button, TextField } from '@material-ui/core';

import notLoggedIn from "../../../../notloggedin";
import CONFIG from '../../../../config';
import axiosCall from "../../../../ajaxRequest"


// Styled Components ========================================================================================

let CommentDiv = styled.div`
    width: 100%;
    height: 3em;
    background-color: #d8d8d8;
    border-radius: 10px;
    padding: 0 10px 0 10px;
    display: flex;
    align-items: center;
    
    .inpt{
        flex: 1;
        background-color: transparent;
        border-style: hidden;
        border-left-style: hidden;
        height: 2.5em;

        :focus{
            outline: none;
        }
    }

    .submit-btn{
        font-size: 1em;
        text-transform: none;
    }
`;

let SubmitBtn = styled.button`

`;
// ========================================================================================================







export default function PostComment({ user, answerId, setComment, comments, ...props }){
    // const [comment, setComment] = useState("")
    const [editorData, setEditorData] = useState("");
    const [sendingComment, setSendingComment] = useState(false);
    const [editorSt, setEditorSt] = useState(null);

    return (
        <form onSubmit={postComment} className="comment-form" {...props}>
            <CommentDiv>
                <input 
                    value={editorData}
                    onChange={handleChangeTextField}
                    placeholder="Add Your Comment"
                    className="inpt"
                >
                </input>
                <Button 
                    className="submit-btn"
                    disabled={user === null || editorData.length === 0 || sendingComment}
                    color="primary"
                    type="submit"
                    onClick={!user ? notLoggedIn : null}    
                >comment</Button>
            </CommentDiv>
        </form>
    );

    function handleChangeTextField(event) {
        // event.preventDefault();
        // console.log("Data: ", event.target.value);
        setEditorData(event.target.value);
    }

    function postComment(e) {
        if (!sendingComment) {
            e.preventDefault();
            const url = `${CONFIG.API_DOMAIN}/question/post-comment`;
            const obj = {
                answerId : answerId,
                comment : editorData
            }
            setSendingComment(true);
            axiosCall('post', url, obj).then(res => {
                console.log("postComment response ",res.data);
                if (res.data.success && res.data.is_saved) {
                    console.log("succesfully added");
                    // editorSt.setData("");
                    setEditorData("");
                    setComment([ res.data.comment, ...comments ]);
                } else {
                    console.log("Not Authenticated");
                }
                setSendingComment(false);
                navigate(`/answer/${answerId}`);
            });
        }
    }

    function handleEditorChange(event, editor) {
        // console.log(editorSt);
        setEditorData(editor.getData());
        if (editorSt === null)
            setEditorSt(editor);
      }

   
}
