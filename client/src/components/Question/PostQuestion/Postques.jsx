import React,{useState,useEffect} from "react";
import MyNav from "../../Navigation/navbar/navbar"
import SideNavBar from "../../Navigation/SideNav/SideNav";
import Searchdiv from "../../Searchdiv/searchdiv";
import ImagesTile from './ImagesTile';

import '../../styles.css'
import './Postques.css'
import CloseIcon from '@material-ui/icons/Close';
import CancelIcon from '@material-ui/icons/Cancel';
import { Button } from '@material-ui/core';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ajaxRequest from '../../../ajaxRequest';
import { API_DOMAIN } from '../../../config';
import { ENDPOINT } from "../../utils";
import axiosCall from '../../../ajaxRequest';


function PostQuestion(props){
  const availabeTags = ["#yoga", "#bodybuilding", "#gymnastics", "#zumba"];
  const [editorData, setEditorData] = useState("");
  const [title, setTitle] = useState("");
  // const [category, setCategory] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [images, setImages] = useState([]);

    // const [searchTag, setSearchTag] = useState("");
    // const [filterArr,setFilterArr]=useState([ ]);
  const [submitting, setSubmitting] = useState(false);
    const [categories, setCategories] = useState([]);

  useEffect(() => {
    console.log('User:', props.user);
  }, [])


  useEffect(async () => {
    let url = `${ENDPOINT}/Question/getCategory`
    let resp = await axiosCall('GET', url);
    // console.log("RESP: ", resp.data.map(val=>({name: val, selected: false})));
    setCategories(resp.data.map(val => ({ name: val, selected: false })));
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
        let res = await fetch('http://localhost:5000/upload/image-upload', {
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

    let res = await ajaxRequest("POST", `${API_DOMAIN}/Question/postQuestion`, {
      category: categories.filter(cat => cat.selected).map(val => val.name),
      tags: selectedTags,
      question: editorData,
      title: title,
      attachments: images_url
    });

    if (res.data.isSaved) {
      alert('Question submitted successfully');
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
    <>
      <MyNav user={props.user} />
      <SideNavBar disableaddbutton="false" user={props.user} />
      <div className="maindivofeverypage">
      <form method="post" onSubmit={handleSubmit} className="quesdiv" style={{marginTop:"20px"}} >
        <h1 style={{marginBottom:"40px"}}>Post a Question</h1>
        <div className="box">
          <h5 className="title" >Enter the title of your question   </h5> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <input type="text" onChange={handleTitleChange} value={ title } name="title" placeholder="Enter title"></input><br />
        </div>
        <div style={{display:"flex", alignItems:"center",justifyContent:"center"}} className="box" >
          <h5 className="title" >Enter your Question  </h5> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <CKEditor
              editor={ClassicEditor}
              config={{
                toolbar: ['heading', '|', 'bold', 'italic', 'blockQuote', 'numberedList', 'bulletedList', '|', 'undo', 'redo', 'Link'],
                ckfinder: { uploadUrl: '/Question/upload' }
              }}
              onChange={handleEditorChange}
              onBlur={handleEditorBlur}
              onFocus={handleEditorFocus}
            />
            <br />
        </div>
          <ImagesTile images={images} setImages={setImages} submitting={submitting} />
        <div className="box">
          <h5 className="title" >Select a Category   </h5> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {categories.map((el,index)=>
            <div style={{display:"inline-block"}}>
              <input type="checkbox" name={el.name} checked={el.selected} onClick={() => { selectCategory(el.name);}}/>
              <label >{el.name}</label> &nbsp;&nbsp;&nbsp;
            </div>
          )}
        </div>
        <div className="searchdiv">
          <h5 className="title" >Select Tags </h5> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Searchdiv tags={availabeTags} selectedTags={selectedTags} setSelectedTags={setSelectedTags} change={selectTag} type="tags" />
        </div>
        <div className="selectedtags" >
          {selectedTags.map((el, index) =>
            <div className="element2" key={index}>
              <a href="#">{el}</a>
                  <CancelIcon onClick={() => deltags(index)} />
            </div>)}
          </div>
          <br/>
          {submitting ?
            <Button color="primary" disabled variant="contained" >Post</Button>
            : <Button color="primary" variant="contained" onClick={submit}>Post</Button>}
      </form>
      </div>
    </>
    );
}

export default PostQuestion;