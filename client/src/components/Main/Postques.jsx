import React,{useState} from "react";
import MyNav from "../navbar/navbar"
import SideNavBar from "../SideNav/SideNav";
import Searchdiv from "./searchdiv";
import './styles.css'
import './Postques.css'
let selectedtagss=[];
function PostQuestion(props){
    const tags=["#yoga","#bodybuilding","#gymnastics","#zumba"];
    const [searchTag, setSearchTag] = useState("");
    const [filterArr,setFilterArr]=useState([ ]);
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
  return (
    <>
      <MyNav user={props.user} />
      <SideNavBar disableaddbutton="false" />
      <form method="post" action="/Question/postQuestion" className="quesdiv" style={{marginTop:"20px"}} >
        <h1 style={{marginBottom:"40px"}}>Post a Question</h1>
        <div className="box">  
          <h5 className="title" >Enter the title of your question   </h5> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <input type="text" name="title" placeholder="Enter title"></input><br />
        </div>
        <div style={{display:"flex", alignItems:"center",justifyContent:"center"}} className="box" >
          <h5 className="title" >Enter your Question  </h5> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <textarea name="Ques" placeholder="Ask Your Question"></textarea><br />
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
              <button type="button" onClick={() => deltags(index)}><ion-icon name="trash-outline" className="trash"></ion-icon></button>
            </div>)}
        </div>
        <button type="submit">Post</button>
      </form>
    </>);
}

export default PostQuestion;