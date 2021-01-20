import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { CircularProgress, Button } from '@material-ui/core';

import { API_DOMAIN } from '../../../config';
import Answer from '../Answer/answer';
import ajaxRequest from '../../../ajaxRequest';


// Styled Components =================================================================================================

let MainDiv = styled.div`
    min-height: 100vh;
    width: 100%;
    margin-top: 5em;
    display: grid;
    place-items: center;


    .err-div{
        display: flex;
        flex-direction: column;

        .reload-btn{
            width: fit-content;
            padding: 5px;
            place-self: center;
            margin: 4em;
        }
    }
`;


// ===================================================================================================================

export default function FullAnswer({ ansId, user }) {
    const [answer, setAnswer] = useState(null);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      fetchAnswer();
    }, []);

    return <MainDiv>
        {
            error === null ? 
                (
                    answer ?
                    <Answer answer={answer} user={user} selectedSatisfactoryAnswer={answer.marked} quesId={answer.question._id} satisfactory={answer.marked} type={0b11} />
                    : <CircularProgress />
                ) :
                <div className="err-div">
                    {error}
                    <Button className="reload-btn" color="primary" variant="contained" onClick={fetchAnswer}>Reload</Button>
                </div>
                
        
        }
        
  </MainDiv>
    
    async function fetchAnswer() {
        setAnswer(null);
        setError(null);
        
        let data = (await ajaxRequest("GET", `${API_DOMAIN}/answer/get-answer?ansId=${ansId}`)).data;
        
        if (data.success && data.answer) {
            setAnswer(data.answer);
            setError(null);
        } else if(data.success && data.answer===null) {
            setError('No such answer present');
            setAnswer(null);
        } else {
            setError('Some internal error occured please try again.');
            setAnswer(null);
        }
    }
    
//   function deleteQuestion(){
//     if (window.confirm("Are you sure you want to delete your Question")) {
//       // txt = "You pressed OK!";
//       ajaxRequest("post",`${CONFIG.API_DOMAIN}/question/deleteQuestion`,{
//         quesId:props.quesId
//       }).then(async(res)=>{
//         if(!res.data.err){
//           navigate("/");
//         }
//         else{
//           console.log("error in deleting question");
//         }
//       })
//     } else {
//       // txt = "You pressed Cancel!";
//     }
//   }

}