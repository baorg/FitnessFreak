import { useState } from 'react';

import styled from 'styled-components';
// Styled Components
let StyledInput = styled.input`
    width: 100%;
    margin-top: 5px;
    background: #EFF2F4;
    border-radius: 9px;
    border:0;
    padding: 5px 30px 5px 30px;
    outline: none;
`;


export default function TagInput({ selectedTags, setSelectedTags }) {
    // const tags_to_select = ['yoga', 'gymnastics', 'power-yoga', 'scenic', 'power-nap'];
    // const [tags, setTags] = useState([]);

    return (
        <StyledInput placeholder="Add tags here..."/>
    )
}