import React,{useState} from "react"
import axiosCall from "../../../ajaxRequest"
import {navigate} from "hookrouter"
import notLoggedIn from "../../../notloggedin";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Button } from '@material-ui/core';

import CONFIG from '../../../config';

const PostComment = (props) => {
    // const [comment, setComment] = useState("")
    const [editorData, setEditorData] = useState("");
    const [editorSt, setEditorSt] = useState(null);

    function postComment(e){
        e.preventDefault();
        const url = `${CONFIG.API_DOMAIN}/question/post-comment`;
        const obj = {
            answerId : props.answerId,
            comment : editorData
            
        }
        axiosCall('post', url, obj).then(res => {
            console.log("postComment response ",res.data);
            if (res.data.success && res.data.is_saved) {
                console.log("succesfully added");
                editorSt.setData("");
                
                props.setComments([...props.comments, res.data.comment]);
            } else {
                console.log("Not Authenticated");
            }
            // navigate("/");
        });
    }

    function handleEditorChange(event, editor) {
        // console.log(editorSt);
        setEditorData(editor.getData());
        if (editorSt === null)
            setEditorSt(editor);
      }

    return (   
        <form onSubmit = {postComment} style={{display:"flex",alignItems:"center"}}>
            <CKEditor
                editor={ClassicEditor}
                config={{
                  toolbar: ['heading', '|', 'bold', 'italic', 'blockQuote', 'numberedList', 'bulletedList', '|', 'undo', 'redo', 'Link']
                }}
                onChange={!props.user ? notLoggedIn : handleEditorChange}
                data=""
                maxHeight="10em"
            />
            <Button disabled={editorData.length === 0}
                variant="contained"
                color="primary"
                type={!props.user ? "button" : "submit"}
                onClick={!props.user ? notLoggedIn : null}
                style={{ margin: "10px" }}>Post</Button>
        </form>
    )
   
}


export default PostComment;


// { <textarea placeholder="Write your comment" value = {comment} onChange = {handleChange} onClick={props.user===null?notLoggedIn:null}></textarea> }
// { <button type={props.user===null?"button":"submit"} onClick={props.user===null?notLoggedIn:null}>Post</button> }
// 