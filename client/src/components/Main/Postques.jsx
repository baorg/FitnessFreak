import React,{useState} from "react";
import MyNav from "../navbar/navbar"
import SideNavBar from "../SideNav/SideNav";
import Searchdiv from "./searchdiv";
import './styles.css'
import './Postques.css'
import CloseIcon from '@material-ui/icons/Close';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

let selectedtagss=[];
function PostQuestion(props){
    const tags=["#yoga","#bodybuilding","#gymnastics","#zumba"];
    // const [searchTag, setSearchTag] = useState("");
    // const [filterArr,setFilterArr]=useState([ ]);
    const [selectedTags,setSelectedTags]=useState([ ]);
    function deltags(index){
    let a=[];
    a=selectedTags.map((el)=>el);
    a.splice(index,1)
    setSelectedTags(a);
    }
  function change(a){
    setSelectedTags(a);
  }
  // CKEDITOR.editorConfig = function( config ) {
  //   config.toolbarGroups = [
  //     { name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
  //     { name: 'document', groups: [ 'mode', 'document', 'doctools' ] },
  //     { name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
  //     { name: 'forms', groups: [ 'forms' ] },
  //     '/',
  //     { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
  //     { name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi', 'paragraph' ] },
  //     { name: 'links', groups: [ 'links' ] },
  //     { name: 'insert', groups: [ 'insert' ] },
  //     '/',
  //     { name: 'styles', groups: [ 'styles' ] },
  //     { name: 'colors', groups: [ 'colors' ] },
  //     { name: 'tools', groups: [ 'tools' ] },
  //     { name: 'others', groups: [ 'others' ] },
  //     { name: 'about', groups: [ 'about' ] }
  //   ];
  
  //   config.removeButtons = 'Source,Save,Templates,Cut,Copy,Paste,PasteText,PasteFromWord,Undo,Redo,NewPage,ExportPdf,Preview,Print,Find,Replace,Scayt,SelectAll,Form,Checkbox,Radio,TextField,Textarea,Button,Select,ImageButton,HiddenField,JustifyLeft,JustifyCenter,JustifyRight,JustifyBlock,BidiLtr,BidiRtl,Link,Anchor,Unlink,Image,Flash,Table,HorizontalRule,PageBreak,Iframe,Maximize,About,ShowBlocks,BGColor,TextColor,Styles,Format,Font';
  // };
  return (
    <>
      <MyNav user={props.user} />
      <SideNavBar disableaddbutton="false" />
      <div className="maindivofeverypage">
      <form method="post" action="/Question/postQuestion" className="quesdiv" style={{marginTop:"20px"}} >
        <h1 style={{marginBottom:"40px"}}>Post a Question</h1>
        <div className="box">
          <h5 className="title" >Enter the title of your question   </h5> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <input type="text" name="title" placeholder="Enter title"></input><br />
        </div>
        <div style={{display:"flex", alignItems:"center",justifyContent:"center"}} className="box" >
          <h5 className="title" >Enter your Question  </h5> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            
            <CKEditor
              editor={ ClassicEditor }
              config={{         
                toolbar: ['heading', '|', 'bold', 'italic', 'blockQuote',  'numberedList', 'bulletedList', '|', 'undo', 'redo','imageUpload'],
                ckfinder:{uploadUrl:'/Question/upload'}
              }} 
              onChange={(event,editor)=>{let data=editor.getData();console.log(data)}}
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
          <Searchdiv tags={tags} selectedTags={selectedTags} change={change} type="tags" />
        </div>
        <div className="selectedtags" >
          {selectedTags.map((el, index) =>
            <div className="element2" key={index}>
              <a href="#">{el}</a>
              <button type="button" onClick={() => deltags(index)}><CloseIcon /></button>
            </div>)}
        </div>
        <button type="submit">Post</button>
      </form>
      </div>
    </>
    );
}

export default PostQuestion;