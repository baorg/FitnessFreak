import React,{useState} from "react"
import axiosCall from "../../../ajaxRequest"
import {navigate} from "hookrouter"
import notLoggedIn from "../../../notloggedin";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Button } from 'react-bootstrap'

import CONFIG from '../../../config.json';

const PostAnswer = (props) => {
    // const [answer, setAnswer] = useState("")
    const [editorData, setEditorData] = useState("");
    function postAnswer(e){
        e.preventDefault();
        const url = `${CONFIG.API_DOMAIN}/Question/postAnswer`;
        const obj = {
            quesId : props.id,
            answer : editorData
            
        }
        axiosCall('post', url, obj).then(res => {
            console.log(res.data);
            // if (res.data.isAuthenticated) {
            // } else {
            //     console.log("Not Authenticated")
            // }
            navigate(res.data);
        });
    }

    // function handleChange(e){
    //     const ans = e.target.value;
    //     setAnswer(ans);
    // }
    function handleEditorChange(event, editor) {
        console.log(editor);
        setEditorData(editor.getData());
      }

    return ( 
        <div>  
        <form onSubmit = {postAnswer} style={{display:"flex",alignItems:"center"}}>
        {/* <textarea placeholder="Write your answer" value = {answer} onChange = {handleChange} onClick={props.user===null?notLoggedIn:null}></textarea> */}
        <CKEditor
              editor={ClassicEditor}
              config={{
                toolbar: ['heading', '|', 'bold', 'italic', 'blockQuote', 'numberedList', 'bulletedList', '|', 'undo', 'redo', 'Link']
              }}
              onChange={props.user===undefined?notLoggedIn:handleEditorChange}
            />
        {/* <button type={props.user===null?"button":"submit"} onClick={props.user===null?notLoggedIn:null}>Post</button> */}
        <Button variant="primary" type={props.user===undefined?"button":"submit"} onClick={props.user===undefined?notLoggedIn:null} style={{margin:"10px"}}>Post</Button>
        </form>
        </div>
    )
   
}


export default PostAnswer;