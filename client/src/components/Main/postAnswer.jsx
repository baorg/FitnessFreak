import React,{useState} from "react"
import { ENDPOINT } from "../utils";
import axiosCall from "../../ajaxRequest"

const PostAnswer = (props) => {

    const [answer, setAnswer] = useState(null)
    function postAnswer(e){

        e.preventDefault();
        const url = `${ENDPOINT}/Question/postAnswer`;
        const obj = {
            quesId : props.id,
            answer : answer
            
        }
        axiosCall('post', url, obj)
    }

    function handleChange(e){
        const ans = e.target.value;
        setAnswer(ans);
    }

    return (   
        <form onSubmit = {postAnswer}>
        <textarea placeholder="Write your answer" value = {answer} onChange = {handleChange}></textarea>
        <button type="submit">Post</button>
        </form>
    )
   
}


export default PostAnswer;