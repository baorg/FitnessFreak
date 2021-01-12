import React,{useState} from "react"
import axiosCall from "../../../ajaxRequest"
import {navigate} from "hookrouter"
import notLoggedIn from "../../../notloggedin";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Button } from 'react-bootstrap'

import CONFIG from '../../../config';

const PostComment = (props) => {
    // const [comment, setComment] = useState("")
    const [editorData, setEditorData] = useState("");
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
                props.setComments([res.data.comment, ...props.comments]);
            } else {
                console.log("Not Authenticated")
            }
            // navigate("/");
        });
    }

    // function handleChange(e){
    //     const comm = e.target.value;
    //     setComment(comm);
    // }
    function handleEditorChange(event, editor) {
        console.log(editor);
        setEditorData(editor.getData());
      }

    return (   
        <form onSubmit = {postComment} style={{display:"flex",alignItems:"center"}}>
        {/* <textarea placeholder="Write your comment" value = {comment} onChange = {handleChange} onClick={props.user===null?notLoggedIn:null}></textarea> */}
        <CKEditor
              editor={ClassicEditor}
              config={{
                toolbar: ['heading', '|', 'bold', 'italic', 'blockQuote', 'numberedList', 'bulletedList', '|', 'undo', 'redo', 'Link']
              }}
              onChange={!props.user?notLoggedIn:handleEditorChange}
            />
        {/* <button type={props.user===null?"button":"submit"} onClick={props.user===null?notLoggedIn:null}>Post</button> */}
        <Button variant="primary" type={!props.user?"button":"submit"} onClick={!props.user?notLoggedIn:null} style={{margin:"10px"}}>Post</Button>
        </form>
    )
   
}


export default PostComment;