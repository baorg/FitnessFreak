import React, { useState } from 'react';
import styled from 'styled-components';
import Selector from './selector';


// Styled Components =============================================================================================

let MainDiv = styled.div`
    width: 100vw;
    min-height: 100vh;

    display: grid;
    grid-template-columns: 1fr 3fr;

    .selector-container{
        display: grid;
        place-items: center;
    }

`;

// ===============================================================================================================

export default function RankingPage({}){
    const [selectedCategories, setSelectedCategories] = useState([]);

    return (
        <MainDiv >
            <div className="selector-container">
                <Selector selectedCategories={selectedCategories} addCategory={addCategoryHandler} removeCategory={removeCategoryHandler} />
            </div>
        </MainDiv>
    );

    function addCategoryHandler(category) {
        setSelectedCategories([...selectedCategories, category]);
    }

    function removeCategoryHandler(category) {
        setSelectedCategories(selectedCategories.filter(cat => cat != category));
    }

}