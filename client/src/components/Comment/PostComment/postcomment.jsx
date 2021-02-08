import React,{useState} from "react"
import axiosCall from "../../../ajaxRequest"
import {navigate} from "hookrouter"
import notLoggedIn from "../../../notloggedin";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Button, TextField } from '@material-ui/core';

import CONFIG from '../../../config';

export default function PostComment(props){
    // const [comment, setComment] = useState("")
    const [editorData, setEditorData] = useState("");
    const [sendingComment, setSendingComment] = useState(false);
    const [editorSt, setEditorSt] = useState(null);

    return (
        <form onSubmit={postComment} style={{ display: "flex", alignItems: "center" }}>
            <TextField
                value={editorData}
                onChange={handleChangeTextField}
                color="primary"
                fullWidth={true}
                variant="outlined"
                label="Add Your Comment"
            />
            <Button
                disabled={props.user === null || editorData.length === 0 || sendingComment}
                variant="contained"
                color="primary"
                type="submit"
                onClick={!props.user ? notLoggedIn : null}
                style={{ margin: "10px" }}>Post</Button>
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
                answerId : props.answerId,
                comment : editorData
            }
            setSendingComment(true);
            axiosCall('post', url, obj).then(res => {
                console.log("postComment response ",res.data);
                if (res.data.success && res.data.is_saved) {
                    console.log("succesfully added");
                    // editorSt.setData("");
                    setEditorData("");
                    props.setComments([ res.data.comment, ...props.comments ]);
                } else {
                    console.log("Not Authenticated");
                }
                setSendingComment(false);
                navigate(`/answer/${props.answerId}`);
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

// { <textarea placeholder="Write your comment" value = {comment} onChange = {handleChange} onClick={props.user===null?notLoggedIn:null}></textarea> }
// { <button type={props.user===null?"button":"submit"} onClick={props.user===null?notLoggedIn:null}>Post</button> }
/* <CKEditor
                editor={ClassicEditor}
                config={{
                  toolbar: ['heading', '|', 'bold', 'italic', 'blockQuote', 'numberedList', 'bulletedList', '|', 'undo', 'redo', 'Link']
                }}
                onChange={!props.user ? notLoggedIn : handleEditorChange}
                data=""
                maxHeight="10em"
            /> */