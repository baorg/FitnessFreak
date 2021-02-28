import { useEffect } from 'react';
import styled from 'styled-components';
import { Checkbox } from '@material-ui/core';


// Styled Components =================================================================

const CategoryDiv = styled.div`
    margin: 5px 1em 5px 0;
    border-radius: 0.5em;
    padding: 10px 1em 10px 1em;
    max-width: 15em;
    background-color: ${({selected}) => selected ? "#5ac8d6"  : "inherit"};
    :hover{
        cursor: pointer;
        background-color: ${({selected}) => selected ? "#dddddd": "#b4e4eb"};
    }
`;

// ======================================================================================

export default function Category({selected, category, handleChange }) {
    
    return (
        <CategoryDiv selected={selected}
            onClick={()=>handleChange({target:{checked: !selected}})}>
            <img width="30" height="30" src={category.icon} alt={category.alt}  class="loaded"></img>
            <i className="fa fa-home" aria-hidden="true"></i> {category.name }
        </CategoryDiv>);
}