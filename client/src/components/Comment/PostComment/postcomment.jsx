import { useState, useContext } from "react"
import {navigate} from "hookrouter"

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import axiosCall from "../../../ajaxRequest"
import notLoggedIn from "../../../notloggedin";
import { Button, TextField } from '@material-ui/core';

import CONFIG from '../../../config';
import { UserContext } from '../../utils/UserContext';


export default function PostComment({ answerId, addComment }){
    // const [comment, setComment] = useState("")
    const [editorData, setEditorData] = useState("");
    const [sendingComment, setSendingComment] = useState(false);
    const [editorSt, setEditorSt] = useState(null);
    const [ user, ] = useContext(UserContext);

    return (
        <form onSubmit={postComment} className="comment-form">
            <TextField
                value={editorData}
                onChange={handleChangeTextField}
                color="primary"
                fullWidth={true}
                variant="outlined"
                label="Add Your Comment"
                className="inpt"
            />
            <Button
                disabled={user === null || editorData.length === 0 || sendingComment}
                variant="contained"
                color="primary"
                type="submit"
                onClick={!user ? notLoggedIn : null}
                className="submit-btn"
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
            const url = `${CONFIG.API_DOMAIN}/answer/post-comment`;
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
                    addComment(res.data.comment);
                } else {
                    console.log("Not Authenticated");
                }
                setSendingComment(false);
                // navigate(`/answer/${answerId}`);
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

// { <textarea placeholder="Write your comment" value = {comment} onChange = {handleChange} onClick={user===null?notLoggedIn:null}></textarea> }
// { <button type={user===null?"button":"submit"} onClick={user===null?notLoggedIn:null}>Post</button> }
/* <CKEditor
                editor={ClassicEditor}
                config={{
                  toolbar: ['heading', '|', 'bold', 'italic', 'blockQuote', 'numberedList', 'bulletedList', '|', 'undo', 'redo', 'Link']
                }}
                onChange={!user ? notLoggedIn : handleEditorChange}
                data=""
                maxHeight="10em"
            /> */