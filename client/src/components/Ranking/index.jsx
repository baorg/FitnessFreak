import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Chip } from '@material-ui/core';

import Selector from './selector';
import Ranking from './ranking';

// Styled Components =============================================================================================

let MainDiv = styled.div`
    width: 90vw;

    min-height: calc(100vh - 50px);

    position: relative;
    top: 100px;
    left: 5vw;
    display: grid;
    grid-template: ". . select-category select-follow ." "category main main main main";

    .selector-btn{
        font-size: 1.4em;
        background-color: #c7c7c7;
        text-align: center;
        margin: 0 10px 0 10px;
        border-radius: 10px;
        cursor: pointer;
        min-width: 10em;
        max-width: 15em;
        height: fit-content;
        
        padding: 20px;

        .selected-categories{
            
        }
    }

    .category-selector-btn{
        grid-area: select-category;
        display: flex;
        flex-direction: column;
    }

    .follow-selector-btn{
        grid-area: select-follow;
    }

    .selector-container{
        grid-area: category;
    }

    .type-selector{
        grid-area: type;
    }

`;

// ===============================================================================================================

export default function RankingPage({}){
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [type, setType] = useState('category');

    useEffect(() => {
        if(type!=='category')
            setSelectedCategories([]);
    }, [type]);

    return (
        <MainDiv >
            <div className="category-selector-btn selector-btn" style={{backgroundColor: type==='category'?'#a9a9ff':'#c7c7c7'}} onClick={()=>setType('category')}>
                <span>Category</span>
                {/* <span className="selected-categories">{selectedCategories.map((category) => <Chip size="small" variant="outlined" color="primary" label={ category}/>)}</span> */}
            </div>
            <div className="follow-selector-btn selector-btn" style={{backgroundColor: type==='followers'?'#a9a9ff':'#c7c7c7'}} onClick={()=>setType('followers')}>Followers</div>
            <div className="selector-container">
                <Selector selectedCategories={selectedCategories} addCategory={addCategoryHandler} removeCategory={removeCategoryHandler} />
            </div>
            <Ranking type={type} categories={selectedCategories}/>
        </MainDiv>
    );

    function addCategoryHandler(category) {
        setSelectedCategories([ ...selectedCategories, category]);
        setType('category');
    }

    function removeCategoryHandler(category) {
        setSelectedCategories(selectedCategories.filter(cat => cat != category));
    }

}