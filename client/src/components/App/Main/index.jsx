import React, {useState, useEffect} from 'react';
import { Button } from '@material-ui/core'
import InfiniteScroll from './InfiniteScroll';
import styled from 'styled-components';
import CONFIG from '../../../config';

const Content = styled.div`
    grid-column: 2 / 3;
    margin: 10px 10px 0 10px;
`;

const Margin = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
`;

const TypeContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
`;

const Type = styled.div`
    margin: 0 10px 0 10px;
    border-radius: 5px;
    padding: 4px;
    background-color: ${props => props.selected ? "#5ac8d6": "inherit"};
    :hover{
        background-color: ${props => props.selected ? "#5ac8d6": "#dddddd"};
        cursor: pointer;
    }
`;

export default function (props) {
    let [url, setUrl] = useState(`${CONFIG.API_DOMAIN}/feed/get-feed?`);
    useEffect(() => {
        // let selectedCategory = props.category ? props.category : null;
        if (props.type === 'Hot') {
            setUrl(`${CONFIG.API_DOMAIN}/Question/hot-questions?${props.category ? "category=" + props.category.name+"&" : ""}`);
        } else if (props.type === 'Newest') {
            setUrl(`${CONFIG.API_DOMAIN}/Question/latest-questions?${props.category ? "category=" + props.category.name+"&" : ""}`);
        } else if (props.type === 'Unanswered') {
            setUrl(`${CONFIG.API_DOMAIN}/Question/unanswered-questions?${props.category ? "category=" + props.category.name+"&" : ""}`);
        } else {
            if(props.category)
                setUrl(`${CONFIG.API_DOMAIN}/Question/getQuestionsCategoryWise/${props.category.name}?`)
            else
                setUrl(`${CONFIG.API_DOMAIN}/feed/get-feed?`)
        }
    }, [props.type, props.category]);
    async function handleTypeChange(type) {
        if (props.type === type) {
            props.setType(null);
        } else {
            props.setType(type);
        }
    }

    return (
        <Content>
            <Margin>
                <div>
                    <Button variant="contained" color="primary">Post a Question</Button>
                </div>
                <TypeContainer>
                    <Type selected={props.type==="Newest"} onClick={()=>handleTypeChange("Newest")}>Newest</Type> |
                    <Type selected={props.type==="Hot"} onClick={()=>handleTypeChange("Hot")}>Hot</Type> |
                    <Type selected={props.type==="Unanswered"} onClick={()=>handleTypeChange("Unanswered")}>Unanswered</Type>
                </TypeContainer>
            </Margin>
            <InfiniteScroll type={props.type} category={props.category} url={url}/>
        </Content>);
}