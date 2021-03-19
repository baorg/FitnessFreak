import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

//  Material UI ==============================

import Chip from '@material-ui/core/Chip';
import useMediaQuery from '@material-ui/core/useMediaQuery';

// ===============================

import Selector from './selector';
import Ranking from './ranking';
import { responsive } from '../utils/data.json';


// Styled Components =======================================

let MainDiv = styled.div`

    display: grid;
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    max-width: 100vw;
    box-sizing: border-box;
    
    padding: 0 10px 0 10px;
    grid-template-columns: ${({midPoint, lastPoint})=>lastPoint? "100% 0": midPoint? "250px 1fr 0": "1fr 1000px 1fr"};
    background: #EFF2F4;
    min-height: 100vh;
    height: fit-content;
    font-family: 'SF Pro','Segoe UI';

`;

// =========================================================

export default function RankingPage({}){
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [type, setType] = useState('category');


    let midPoint = useMediaQuery(`(min-width: ${responsive.small}) and (max-width: ${responsive.medium})`);
    let lastPoint = useMediaQuery(`(max-width: ${responsive.small})`);


    return (
        <MainDiv midPoint={midPoint} lastPoint={lastPoint}>
            <Selector 
                selectedCategories={selectedCategories} 
                addCategory={addCategoryHandler} 
                removeCategory={removeCategoryHandler} 

            />
            <Ranking type={type} setType={setType} categories={selectedCategories}/>
            <div></div>
        </MainDiv>
    );

    function addCategoryHandler(category) {
        setSelectedCategories([ ...selectedCategories, category]);
    }

    function removeCategoryHandler(category) {
        setSelectedCategories(selectedCategories.filter(cat => cat != category));
    }

}