import React from "react"
import axios from "axios"


function FullQuestion(props){
    const [question, setQuestion] = useState([])
    
    useEffect(() => {
        axios.get(`${ENDPOINT}/Question/getQuestions/${props.id}`,{ withCredentials: true })
          .then(res => {
            console.log("res.data = " ,res.data);
            setQuestion(res.data.questions);
          });
      }, []);
    // return (
    // <div>
    // <h3>{question.question}</h3>
    // {/* add commnet */}
    // {/* question.answers.map((item, index) => {
    //     <Answer answer = {item} />
    // }) */}
   
    
    // </div>

    // )
}


export default FullQuestion;