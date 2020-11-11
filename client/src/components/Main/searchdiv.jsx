import React,{useState} from "react";
import { FormControl } from "react-bootstrap";


function Searchdiv(props){


const [searchTag, setSearchTag] = useState("");
const [filterArr,setFilterArr]=useState([ ]);    
function mouseov(){
    document.querySelector('.tagsearch').style.display='block';
}
function mouseou(){
    document.querySelector('.tagsearch').style.display='none';
}
function fil(event){
    let x=event.target.value;
    setSearchTag(event.target.value);
    let newArr= []
    props.tags.forEach(el => {
        if(el.includes(x))
        newArr.push(el);
    })
    if(x==="")
    setFilterArr([]);
    else
    setFilterArr(newArr);
}
function addTag(el){
    props.selectedTags.push(el);
    let a=[];
    a=props.selectedTags.map((el)=>el);
    props.change(a);
    setSearchTag("")
    setFilterArr([]);
}
    

return (
    <div>
    <FormControl type="text" placeholder="Search" className="mr-sm-2" name="tags" onFocus={mouseov} onChange={fil} autoComplete="off" value={searchTag}/>
    <div className="tagsearch" >
        {filterArr.map((el,index)=><div className="element" key={index} ><a href="#" onClick={()=>addTag(el)}>#{el}</a></div>)}  
    </div>
    </div>
);


}

export default Searchdiv;

