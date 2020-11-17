import React,{useState} from "react";
import MyNav from "../navbar/navbar"
import SideNavBar from "../SideNav/SideNav";
import Searchdiv from "./searchdiv";
import './styles.css'
let selectedtagss=[];
function PostQuestion(props){
    const tags=["yoga","bodybuilding","gymnastics","zumba"];
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
      <form method="post" action="/Question/postQuestion" className="quesdiv">
        <input type="text" name="title" placeholder="Enter title"></input><br />
        <textarea name="Ques" placeholder="Ask Your Question"></textarea><br />
        <select name="category">
          <option value="yoga">Yoga</option>
          <option value="bodyBuilding">BodyBuilding</option>
        </select>
        <div className="searchdiv">
          <Searchdiv tags={tags} selectedTags={selectedTags} change={change} />
        </div>
        <button type="submit">Post</button>
        <div className="selectedtags" >
          {selectedTags.map((el, index) =>
            <div className="element" key={index}>
              <a href="#">#{el}</a>
              <button type="button" onClick={() => deltags(index)}><ion-icon name="trash-outline"></ion-icon></button>
            </div>)}
        </div>
      </form>
    </>);
}

export default PostQuestion;