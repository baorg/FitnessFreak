import { useEffect } from 'react';
import styled from 'styled-components';
import { Checkbox } from '@material-ui/core';
import { responsive } from '../../../utils/data.json';
import CategoryIcon from '../../../static/CategoryIcons';

// Styled Components =================================================================

const CategoryDiv = styled.div`
    margin: 10px 1em 5px 0;
    display: flex;
    align-items: center;
    padding: 0 16px 0 16px;
    
    height: 50px;
    width: fit-content;
    background: ${({selected}) => selected ? "#065BFB" :"#EFF2F4" };
    border-radius: 5px;
    
    font-family: SF Pro;
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 21px;

    /* font-weight: ${({selected}) => selected ? "600"  : "500"}; */
    /* font-size: ${({selected}) => selected ? "24px"  : "20px"};; */
    /* line-height: ${({selected}) => selected ? "29px"  : "24px"};; */
    color: ${({selected}) => selected ? "#FFFFFF"  : "#424259"};
    

    path{ 
        fill: ${({selected}) => selected ? "#FFFFFF"  : "#424259"};
    }

    :hover{
        cursor: pointer;
    }

    .category-icon{
        width: 20px;
        height: 20px;
        margin-right: 15px;
    }

    .category-name{
        margin-left: 5px;
    }

    @media(max-width: ${responsive.small}){
        font-weight: 400;
        font-size: 14px;
        line-height: 16px;

        .category-icon{
            width: 6px;
            height: 6px;
            margin-right: 15px;
        }
    }
`;

// ======================================================================================

export default function Category({selected, category, handleChange }) {
    // console.log('Category: ', category);
    return (
        <>
            <CategoryDiv selected={selected}
                className="category-el"
                onClick={()=>handleChange({target:{checked: !selected}})}>
                <CategoryIcon category={category.name}/>
                <span className="category-name">{ category.name }</span>
            </CategoryDiv>
        </>
    );
}