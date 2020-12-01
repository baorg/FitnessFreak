import React,{useState} from "react";
import MyNav from "../../Navigation/navbar/navbar"
import SideNavBar from "../../Navigation/SideNav/SideNav";
import Searchdiv from "../../Searchdiv/searchdiv";
import '../../styles.css'
import './Postques.css'
import CloseIcon from '@material-ui/icons/Close';
import CancelIcon from '@material-ui/icons/Cancel';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ajaxRequest from '../../../ajaxRequest';
import { API_DOMAIN } from '../../../config';


let selectedtagss=[];
function PostQuestion(props){
    const availabeTags = ["#yoga", "#bodybuilding", "#gymnastics", "#zumba"];
    const [editorData, setEditorData] = useState("");
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [selectedTags, setSelectedTags] = useState([]);

    // const [searchTag, setSearchTag] = useState("");
    // const [filterArr,setFilterArr]=useState([ ]);

    function deltags(index){
        let a=[];
        a=selectedTags.map((el)=>el);
        a.splice(index, 1);
        setSelectedTags(a);
    }
    function selectTag(a){
        setSelectedTags(a);
    }

    async function handleTagChange(event){
        
    }

    async function handleTitleChange(event) {
        let changedTitle = event.target.value;
        setTitle(changedTitle);
        // console.log('ChangedTitle: ', changedTitle);
    }


    async function handleSubmit(event) {
        event.preventDefault();
        console.log('Data: ', editorData);
        let res = ajaxRequest("POST", `${API_DOMAIN}/Question/postQuestion`, {
            category: "Fitness",
            tags: [],
            question: editorData,
            title: "Hey"});
        // console.log('DATA from backend: ', res.data);
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
              editor={ ClassicEditor }
              config={{         
                toolbar: ['heading', '|', 'bold', 'italic', 'blockQuote', 'numberedList', 'bulletedList', '|', 'undo', 'redo','imageUpload'],
                ckfinder:{uploadUrl:'/Question/upload'}
              }} 
              onChange={(event, editor) => { let data = editor.getData(); setEditorData(editor.getData());}}
            />
          <br />
        </div>
        <div className="box">
          <h5 className="title" >Select a Category   </h5> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <select name="category">
            <option value="yoga">Yoga</option>
            <option value="bodyBuilding">BodyBuilding</option>
          </select>
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