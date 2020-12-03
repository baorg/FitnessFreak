import React,{useState,useEffect} from "react";
import MyNav from "../../Navigation/navbar/navbar"
import SideNavBar from "../../Navigation/SideNav/SideNav";
import Searchdiv from "../../Searchdiv/searchdiv";
import UploadImage from './UploadImage';

import '../../styles.css'
import './Postques.css'
import CloseIcon from '@material-ui/icons/Close';
import CancelIcon from '@material-ui/icons/Cancel';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ajaxRequest from '../../../ajaxRequest';
import { API_DOMAIN } from '../../../config';
import { ENDPOINT } from "../../utils";
import axiosCall from '../../../ajaxRequest';


let selectedtagss=[];
function PostQuestion(props){
  const availabeTags = ["#yoga", "#bodybuilding", "#gymnastics", "#zumba"];
  const [editorData, setEditorData] = useState("");
  const [title, setTitle] = useState("");
  // const [category, setCategory] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [images, setImages] = useState([
    "https://picsum.photos/200",
    "https://picsum.photos/200"
  ]);

    // const [searchTag, setSearchTag] = useState("");
    // const [filterArr,setFilterArr]=useState([ ]);
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

  async function handleSubmit(event) {
    event.preventDefault();
    let res = await ajaxRequest("POST", `${API_DOMAIN}/Question/postQuestion`, {
      categories: categories.filter(cat => cat.selected).map(val => val.name),
      tags: selectedTags,
      question: editorData,
      title: title
    });

    if (res.data.isSaved)
      alert('Question submitted successfully');
    else
      alert('Errr..., some error occured on our side!');
  }
  return (
    <>
      <MyNav user={props.user} />
      <SideNavBar disableaddbutton="false" />
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
          <UploadImage images={images} setImages={setImages} />
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
          <h5 className="title" >Select Tags   </h5> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Searchdiv tags={availabeTags} selectedTags={selectedTags} setSelectedTags={setSelectedTags} change={selectTag} type="tags" />
        </div>
        <div className="selectedtags" >
          {selectedTags.map((el, index) =>
            <div className="element2" key={index}>
              <a href="#">{el}</a>
                  <CancelIcon onClick={() => deltags(index)} />
            </div>)}
        </div>
        <button type="submit">Post</button>
      </form>
      </div>
    </>
    );
}

export default PostQuestion;