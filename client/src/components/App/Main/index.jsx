import React, {useState, useEffect} from 'react';
import { Button } from '@material-ui/core'
import { A } from 'hookrouter';
import InfiniteScroll from './InfiniteScroll';
import styled from 'styled-components';
import CONFIG from '../../../config';


// Styled Components ==================================================================================

const Content = styled.div`
    grid-column: 2 / 3;
    padding: 30px 10px 0 10px;
    scrollbar-width: 0;
    width: 100%;
    box-sizing: border-box;
    max-height: 100%;
`;

const Margin = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    margin-bottom: 10px;
    width: 100%;
    box-sizing: border-box;

    >* {
        flex: 1 1 160px;
        margin: 10px;
    }
`;

const TypeContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    box-sizing: border-box;
`;

const Type = styled.div`
    margin: 0 10px 0 10px;
    border-radius: 5px;
    padding: 4px;
    box-sizing: border-box;

    background-color: ${({selected}) => selected ? "#5ac8d6": "inherit"};
    :hover{
        background-color: ${({selected}) => selected ? "#5ac8d6": "#dddddd"};
        cursor: pointer;
    }
`;

// =======================================================================================================

export default function MainLandingPageDiv({ type, selectedCategories, setType, user }) {
    let [url, setUrl] = useState(`${CONFIG.API_DOMAIN}/feed/get-feed?`);
    
    useEffect(loadData, [type, selectedCategories]);


    return (
        <Content>
            <Margin>
                <div>
                    <A href="/post-question"><Button variant="contained" color="primary">Post a Question</Button></A>
                </div>
                <TypeContainer>
                    <Type selected={type==="Newest"} onClick={()=>handleTypeChange("Newest")}>Newest</Type> |
                    <Type selected={type==="Hot"} onClick={()=>handleTypeChange("Hot")}>Hot</Type> |
                    <Type selected={type==="Unanswered"} onClick={()=>handleTypeChange("Unanswered")}>Unanswered</Type>
                </TypeContainer>
            </Margin>
            <InfiniteScroll type={type} selectedCategories={selectedCategories} url={url} user={user}/>
        </Content>);

    
    async function handleTypeChange(tp) {
        // console.log("Changing type:", type);
        if (type === tp) {
            setType(null);
        } else {
            setType(tp);
        }
    }

    function loadData(){
        
        if (type === 'Hot') {
            setUrl(`${CONFIG.API_DOMAIN}/question/get-type/hot-questions?${selectedCategories ? "selectedCategories=" + selectedCategories+"&" : ""}`);
        } else if (type === 'Newest') {
            setUrl(`${CONFIG.API_DOMAIN}/question/get-type/latest-questions?${selectedCategories ? "selectedCategories=" + selectedCategories+"&" : ""}`);
        } else if (type === 'Unanswered') {
            setUrl(`${CONFIG.API_DOMAIN}/question/get-type/unanswered-questions?${selectedCategories ? "selectedCategories=" + selectedCategories+"&" : ""}`);
        } else {
            if(selectedCategories)
                setUrl(`${CONFIG.API_DOMAIN}/question/getQuestionsCategoryWise/${selectedCategories}?`)
            else
                setUrl(`${CONFIG.API_DOMAIN}/feed/get-feed?`)
        }
    }
}