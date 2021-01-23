import React from 'react';
import styled from 'styled-components';
import { Checkbox } from '@material-ui/core';


// Styled Components =================================================================

const CategoryDiv = styled.div`
    margin: 5px 1em 5px 0;
    border-radius: 0.5em;
    padding: 0 1em 0 1em;
    max-width: 15em;
    background-color: ${props => props.selected ? "#5ac8d6": "inherit"};
    :hover{
        cursor: pointer;
        background-color: ${props => props.selected ? "#5ac8d6": "#dddddd"};
    }
`;

// ======================================================================================

export default function Category({selected, category, handleChange }) {
    return (
        <CategoryDiv>
            <Checkbox 
                checked={selected}
                onChange={handleChange}
                inputProps={{ 'aria-label': 'primary checkbox' }}
            />
            <img width="30" height="30" src={category.icon} alt={category.alt}  class="loaded"></img>
            <i className="fa fa-home" aria-hidden="true"></i> {category.name }
        </CategoryDiv>);
}