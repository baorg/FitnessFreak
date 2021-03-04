import React,{useState} from "react"
import axiosCall from "../../../ajaxRequest"
import styled from 'styled-components';

// import { navigate } from "hookrouter";
import notLoggedIn from "../../../notloggedin";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Button } from 'react-bootstrap'

import CONFIG from '../../../config';


// Styled Components ============================================

const PostAnswerDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex-wrap: wrap;
    width: 100%;
    max-width: 800px;

    .ck-editor{
        width: 80vw;
        max-width: 800px;
    }

`;


const Heading = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    box-sizing: border-box;
`;

// =================================================================


const PostAnswer = (props) => {
    // const [answer, setAnswer] = useState("")
    const [editorData, setEditorData] = useState("");
    
    
    return ( 
        <form onSubmit = {postAnswer} >
            <PostAnswerDiv>
                <Heading>
                    <h5>Write Your Answer</h5>
                    <Button variant="primary" type={!props.user?"button":"submit"} onClick={!props.user?notLoggedIn:null}   style={   {margin:"10px"}}>Post</Button>
                </Heading>
                <CKEditor
                    width="20em"
                    editor={ClassicEditor}
                    config={{
                      toolbar: ['heading', '|', 'bold', 'italic', 'blockQuote', 'numberedList', 'bulletedList', '|',    'undo',    'redo', 'Link']
                    }}
                    onChange={!props.user?notLoggedIn:handleEditorChange}
                />
                {/* <button type={props.user===null?"button":"submit"} onClick={props.user===null?notLoggedIn:null} >Post</  button> */}
            </PostAnswerDiv>
        </form>
    );


    function postAnswer(e) {
        e.preventDefault();
        const url = `${CONFIG.API_DOMAIN}/question/post-answer`;
        const obj = {
            quesId : props.id,
            answer : editorData
        }
        axiosCall('post', url, obj).then(res => {
            console.log(res.data);
            if (res.data.success && res.data.is_saved) {
                console.log('Saved: ', res.data);
                props.setAnswers([res.data.answer, ...props.answers]);
                setEditorData("");
            }
            // if (res.data.isAuthenticated) {
            // } else {
            //     console.log("Not Authenticated")
            // }
            // navigate(res.data);

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

   
}


export default PostAnswer;