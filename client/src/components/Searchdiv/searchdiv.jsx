import React,{useState} from "react";
import { FormControl } from "react-bootstrap";
import axiosCall from "../../ajaxRequest"
import { ENDPOINT } from "../utils";
import {navigate} from "hookrouter";


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
        let x = event.target.value;
        setSearchTag(event.target.value);
        if(props.type==="tags"){
            let newArr= []
            props.tags.forEach(el => {
                if(el.includes(x))
                    newArr.push(el);
            })
            if(x==="")
                setFilterArr([]);
            else
                setFilterArr(newArr);
        }else if(props.type==="users"){
            let url = `${ENDPOINT}/Users/searchusers`;
            let obj={username:x}
            // console.log(obj)
            if(x==="")
                setFilterArr([]);
            else{
                axiosCall('POST', url, obj).then(res => {
                    setFilterArr(res.data.newArr);
                });
            } 
        }
    }
    async function addTag(el){
        if(props.type==="tags"){
            props.setSelectedTags(Array.from(new Set([...props.selectedTags, el])));
            setSearchTag("")
            setFilterArr([]);
        }else if(props.type==="users"){ 
            let url2 = `/profile/${el._id}`;
            navigate(url2);
        }
    }


    return (
        <div style={{width:"206px"}}>
        <FormControl style={{width:"206px" ,margin:"auto"}} type="text" placeholder="Search" className="mr-sm-2" name="tags" onFocus={mouseov} onChange={fil} autoComplete="off" value={searchTag}/>
        <div className="tagsearch" >
                {props.type === 'users' ?
                    filterArr.map((el, index) => <div className="element" key={index} ><a href="#" onClick={() => addTag(el)}>{el.username}</a></div>)
                    : filterArr.map((el, index) => <div className="element" key={index} ><a href="#" onClick={() => addTag(el)}>{el}</a></div>)
                }
        </div>
        </div>
    );

}

export default Searchdiv;

