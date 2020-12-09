import React,{useState} from "react"
import { ENDPOINT } from "../../utils";
import axiosCall from "../../../ajaxRequest"
import {navigate} from "hookrouter"
import notLoggedIn from "../../../notloggedin";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Button } from 'react-bootstrap'

const PostComment = (props) => {
    // const [comment, setComment] = useState("")
    const [editorData, setEditorData] = useState("");
    function postComment(e){
        e.preventDefault();
        const url = `${ENDPOINT}/Question/postComment`;
        const obj = {
            answerId : props.answerId,
            comment : editorData
            
        }
        axiosCall('post', url, obj).then(res => {
            console.log("postComment response ",res.data);
            if (res.data.isAuthenticated) {
                console.log("succesfully added")
            } else {
                console.log("Not Authenticated")
            }
            navigate("/");
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
              onChange={handleEditorChange}
            />
        {/* <button type={props.user===null?"button":"submit"} onClick={props.user===null?notLoggedIn:null}>Post</button> */}
        <Button variant="primary" type={props.user===null?"button":"submit"} onClick={props.user===null?notLoggedIn:null} style={{margin:"10px"}}>Post</Button>
        </form>
    )
   
}


export default PostComment;