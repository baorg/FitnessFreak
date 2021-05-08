import { useState, useContext } from 'react';
import styled from 'styled-components';
import { navigate } from 'hookrouter';
// core
import { Menu, MenuItem } from '@material-ui/core';
// icons
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { PopupAgreementContext } from 'src/components/utils/PopupAgreementContext';
import { PopupMessageContext } from 'src/components/utils/PopupMessageContext';
import request from 'src/ajaxRequest';
import CONFIG from 'src/config';

// Styled Components =======================================================

let StyledMenu = styled(Menu)`
    margin-top: 3em;
    border-radius: 2px;
    min-width: 10em;
`;

// ========================================================================


export default function QuestionHeaderMenu({ user, question}){
    // const [ expanded, setExpanded ] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const agreementPopup = useContext(PopupAgreementContext);
    const messagePopup = useContext(PopupMessageContext);

    return (
        <>
        {Boolean(anchorEl)?
            <div onClick={collapse} className="expand-icon icon"><ExpandLessIcon  /></div>:
            <div className="expand-icon icon" onClick={expand}><ExpandMoreIcon  /></div>}
            <StyledMenu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={collapse}
            >  
                <MenuItem>Report</MenuItem>
                {user && question.user && user._id === question.user._id &&
                <MenuItem
                    onClick={deleteQuestion}
                >Delete</MenuItem>}
            </StyledMenu>
        </>
    );

    function expand(event){
        console.log('El:', event.currentTarget);
        setAnchorEl(event.currentTarget);
        // setExpanded(true);
    }
    function collapse(){
        setAnchorEl(null);
        // setExpanded(false);
    }

    function deleteQuestion() {
        agreementPopup(
            { content: 'Do you want to delete this question', title: 'Delete Question' },
            "Cancel",
            "Delete",
            async () => { },
            del);
        
        async function del() {
            let res = await request("post", `${CONFIG.API_DOMAIN}/question/deleteQuestion`, {
                quesId: question._id
            });
            if (res.data && !res.data.err) {
                navigate("/");
            } else {
                console.log("error in deleting question");
                messagePopup({ title: 'Error', message: 'Error in deleting question', severity: 'error' });
            }
        }   
    }
}