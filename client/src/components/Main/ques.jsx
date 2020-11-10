import React,{useState} from "react";
import './styles.css'
let selectedtagss=[];
function Question(){
    const [searchTag, setSearchTag] = useState("");
    const [filterArr,setFilterArr]=useState([ ]);
    const [selectedTags,setSelectedTags]=useState([ ]);
    const tags=["#yoga","#bodybuilding","#gymnastics","#zumba"];
    
  function mouseov(){
    document.querySelector('.tagsearch').style.display='block';
  }
  function mouseou(){
    document.querySelector('.tagsearch').style.display='none';
  }
  function fil(event){
    let x=event.target.value;
    setSearchTag(event.target.value);
    let newArr=tags.map(el=>{
      if(el.includes(x))
      return el;
    })
    if(x==="")
    setFilterArr([ ]);
    else
    setFilterArr(newArr);

  }
  function addTag(){
    // selectedtagss.push(searchTag);
    selectedTags.push(searchTag);

    setSearchTag("")
    setFilterArr([]);
  }
  function selecttag(el){
    setSearchTag(el)
    document.querySelector('.tagsearch').style.display='none';
  }
  function deltags(index){
    // console.log(index);
    // console.log("a="+selectedTags.length)
    // console.log(selectedtagss)
    let a=[];
    a=selectedTags.map((el)=>el);
    a.splice(index,1)
    // 
    // console.log(selectedtagss)
    // selectedTags.splice(index,1);
    // console.log("b="+selectedTags.length)
    setSelectedTags(a);
    }
return (
<form method = "post" action = "/Question/postQuestion" className="quesdiv">
    <textarea name = "Ques" placeholder = "Ask Your Question">   
    </textarea>
    <select name = "category">
    <option value="yoga">Yoga</option>
    <option value="bodyBuilding">BodyBuilding</option>
    </select>
    <div className="searchdiv">
    <input type = "text" name = "tags" onFocus={mouseov} onChange={fil} autoComplete="off" value={searchTag} width="100" />
    <button onClick={addTag} type="button"><ion-icon name="add-circle-outline"></ion-icon></button>
    <div className="tagsearch" >
        {filterArr.map((el,index)=><div className="element" key={index} ><a href="#" onClick={()=>selecttag(el)}>{el}</a></div>)}  
    </div>
    </div>
    <button type = "submit">Post</button>
    <div className="selectedtags" >
        {selectedTags.map((el,index)=><div className="element" key={index}><a href="#">{el}</a>
                                    <button type="button" onClick={()=>deltags(index)}><ion-icon name="trash-outline"></ion-icon></button>
                                    </div>)}  
    </div>
    

</form>
)
}

export default Question;