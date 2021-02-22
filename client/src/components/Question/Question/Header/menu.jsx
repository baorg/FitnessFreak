import { useState } from 'react';
import styled from 'styled-components';

import { Menu, MenuItem } from '@material-ui/core';

// icons
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


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
              {user&&user._id===question.user._id && <MenuItem >Delete</MenuItem>}
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
}