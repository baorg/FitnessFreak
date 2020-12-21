import React from 'react';
import styled from 'styled-components';

const Category = styled.div`
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

export default function (props) {
    return (
        <Category onClick={ props.handleClick } selected={props.selected}>
                  <img width="30" height="30" src={props.category.icon} alt={props.category.alt}  class="loaded"></img>
                  <i className="fa fa-home" aria-hidden="true"></i> { props.category.name }
        </Category>);
}