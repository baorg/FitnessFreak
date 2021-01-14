import React,{useState,useEffect} from "react";
import MyNav from "../../../Navigation/navbar/navbar"
import SideNavBar from "../../../Navigation/SideNav/SideNav";
import Searchdiv from "../../../Searchdiv/searchdiv";
import ImagesTile from './ImagesTile';
import styled from 'styled-components';

// import '../../styles.css'
import '../Postques.css'
import CloseIcon from '@material-ui/icons/Close';
import CancelIcon from '@material-ui/icons/Cancel';
import { Button } from '@material-ui/core';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ajaxRequest from '../../../../ajaxRequest';
import axiosCall from '../../../../ajaxRequest';
import { navigate } from "hookrouter";

import CONFIG from '../../../../config';



// Styled Components =======================================
let PostQuestionDiv = styled.div`
  padding-top: 2em;
`;
let PostQuestionHeading = styled.div`
  font-size: 2em;
`;
let FormDiv = styled.form`
  border: 2px solid black;
  background-color: white;
  padding: 1em;
  margin-bottom: 5em;
  border-radius: 5px;
`;

let FormContent = styled.div`
  margin-top: 10px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
`;

let FormTitle = styled.div`
  font-size: 1.2em;
  font-weight: bold;
`;


let FormDesc = styled.div`
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

let TitleInput = styled.input`
  margin-top: 5px;
  width: 100%;
  border-radius: 5px;
  border-width: 2px;
  height: 2em;

`;


let QuestionEditor = styled(CKEditor)`
  min-height: 10em;
`;

let CategoriesDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

let CategoryBtn = styled.div`
  border: 2px solid #8f8f8f;
  border-radius: 4px;
  margin: 4px;
  font-size: 0.8em;
  padding: 0 2px 0 2px;
  cursor: pointer;
  background-color: ${(props) => props.checked?"#4be74b":"white"};
`;


let SelectedTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 4px;
`;


let StyledCancelIcon = styled(CancelIcon)`
  font-size: 2em;
`;


let SubmitButton = styled(Button)`
  align-self: center;
`;
// =========================================================





function PostQuestion(props){
  const availabeTags = ["#yoga", "#bodybuilding", "#gymnastics", "#zumba"];
  const [editorData, setEditorData] = useState("");
  const [title, setTitle] = useState("");
  // const [category, setCategory] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [images, setImages] = useState([]);

  const [submitting, setSubmitting] = useState(false);
    const [categories, setCategories] = useState([]);

  useEffect(() => {
    console.log('User:', props.user);
    if (props.user === null) {
        navigate("/auth");
    }
  }, [])


  useEffect(async () => {
    let url = `${CONFIG.API_DOMAIN}/Question/getCategory`
    let resp = await axiosCall('GET', url);
    // console.log("RESP: ", resp.data.map(val=>({name: val, selected: false})));
    setCategories(resp.data.categories.map(val => ({ name: val, selected: false })));
    // console.log(categories);
  }, []);

  function deltags(index){
      let a=[];
      a=selectedTags.map((el)=>el);
      a.splice(index, 1);
      setSelectedTags(a);
  }

  function selectTag(a) {
      setSelectedTags(a);
  }
  
  function handleEditorChange(event, editor) {
    console.log(editor);
    setEditorData(editor.getData());
  }

  function handleEditorBlur(event, editor) {
    let data = editor.getData();
    console.log('Editor Blur');
  }

  function handleEditorFocus(event, editor) {
    let data = editor.getData();
    console.log('Editor Focus');
  }

  async function handleTagChange(event){
    
  }

    async function handleTitleChange(event) {
      let changedTitle = event.target.value;
      if(changedTitle.length<=50)
        setTitle(changedTitle);
    }

  async function selectCategory(cat) {
    setCategories(categories.map(val => val.name == cat ? { name: val.name, selected: !val.selected } : val));
  }
  async function submit() {
    console.log('Submitting....');
    setSubmitting(true);
    
    let images_count = images.length;
    let images_url = [];

    for (var i = 0; i < images_count; i++){
      let image = images[i];
      if (image.uploaded) {
        images_url.push(image);
      } else {
        let formData = new FormData();
        formData.append('file', images[i].file);
        let res = await fetch(`${CONFIG.API_DOMAIN}/upload/image-upload`, {
          method: 'POST',
          body: formData,
          credentials: 'include'
        });

        let data = await res.json();
        if (data.success) {
          images_url.push({ url: data.url, type: 'image' });
          await setImages(images.map((img, ind) => {
            if (ind === i)
              return {
                src: data.url,
                file: img.file,
                uploaded: true
              };
            else
              return img;
          }));
        } else {
          alert('Some error occured in submitting question.');
          setSubmitting(false);
          return;
        }
      }
    }

    let res = await ajaxRequest("POST", `${CONFIG.API_DOMAIN}/question/post-question`, {
      category: categories.filter(cat => cat.selected).map(val => val.name),
      tags: selectedTags,
      question: editorData,
      title: title,
      attachments: images_url
    });

    if (res.data.is_saved) {
      alert('Question submitted successfully');
      navigate("/");
      return;
    }
    else {
      alert('Errr..., some error occured on our side!');
      setSubmitting(false);
      return;
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    return submit();
  }

  return (
    <PostQuestionDiv>
      <PostQuestionHeading>Ask a Question</PostQuestionHeading>
      <FormDiv>
        <FormContent>
          <FormTitle> Title </FormTitle>
          <FormDesc title={title}>Enter title and be specific. </FormDesc>
          <TitleInput
            placeholder="e.g. Are push-ups good for core?"
            value={title}
            onChange={handleTitleChange}
            />
        </FormContent>

        <FormContent>
          <FormTitle> Body </FormTitle>
          <FormDesc>Explain your question throughly.</FormDesc>
          <QuestionEditor
            editor={ClassicEditor}
              config={{
                toolbar: ['heading', '|', 'bold', 'italic', 'blockQuote', 'numberedList', 'bulletedList', '|', 'undo', 'redo', 'Link'],
                ckfinder: { uploadUrl: '/Question/upload' }
              }}
              onChange={handleEditorChange}
              onBlur={handleEditorBlur}
              onFocus={handleEditorFocus}
              style={{ height: "10em" }}
            />
          
        </FormContent>


        <FormContent>
          <FormTitle> Attachments </FormTitle>
          <FormDesc>Add attachments to explain your question properly.</FormDesc>
          <ImagesTile images={images} setImages={setImages} submitting={submitting} />
        </FormContent>

        
        <FormContent>
          <FormTitle> Categories </FormTitle>
          <FormDesc>Select category which you feel related to your question.</FormDesc>
          <CategoriesDiv>
            {categories.map((el,index)=>
              <CategoryBtn
                checked={el.selected}
                onClick={() => { selectCategory(el.name); }}
              > {el.name} </CategoryBtn>
              )}
          </CategoriesDiv>
        </FormContent>
        

        <FormContent>
          <FormTitle> Tags </FormTitle>
          <FormDesc>Adding tags makes it easy to spread your questions.</FormDesc>
          <div className="searchdiv">
             <Searchdiv tags={availabeTags} selectedTags={selectedTags} setSelectedTags={setSelectedTags} change={selectTag} type="tags"  />
          </div>
            <SelectedTags>
             {selectedTags.map((el, index) =>
               <div className="element2" key={index}>
                 <a href="#">{el}</a>
                     <StyledCancelIcon onClick={() => deltags(index)} />
               </div>)}
            </SelectedTags>
        </FormContent>
        
        
        <FormContent>
          {submitting ?
               <SubmitButton color="primary" disabled variant="contained" >Post</SubmitButton>
              : <SubmitButton color="primary" variant="contained" onClick={submit}>Post</SubmitButton>}
        </FormContent>


      </FormDiv>
    </PostQuestionDiv>
    );
}

export default PostQuestion;
