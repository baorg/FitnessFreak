import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { fetchUserData } from '../utils/fetch_user_data';
import ajaxRequest from '../../ajaxRequest';
import { API_DOMAIN } from '../../config';
import { Checkbox, CircularProgress } from '@material-ui/core';


// Styled Components ==========================================================================================

let SelectCategoryDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    grid-column: 1 / 2;
    justify-self: top;
    top: 10em;
    position: sticky;
    box-sizing: border-box;
`;

// ============================================================================================================


export default function SelectCategory({selectedCategories, addCategory, removeCategory }) {
    const [categories, setCategories] = useState(null);

    useEffect(() => {
        async function fetchCategories(){
            try {
                let res = await ajaxRequest('GET', `${API_DOMAIN}/question/getCategory`);
                // console.log('Categories: ', res.data);
                setCategories(res.data.categories.map(category => ({ category: category, selected: false })));
            } catch (err) {

            }
        }
        fetchCategories();
    }, []);


    useEffect(() => {
        if (categories === null) {
            
        } else {
            setCategories(categories.map(cat => ({
                category: cat.category,
                selected: selectedCategories.findIndex(c => c === cat.category) !== -1
            })));
        }
    }, [selectedCategories])



    return (
        categories === null ? <CircularProgress /> :
        <SelectCategoryDiv >
            {categories.map(category => (
                <div>
                    <Checkbox checked={category.selected} onChange={({ target }) => {
                        setCategoryVal(category.category, target.checked);
                    }} />
                    {category.category}
                </div>
            ))}
        </SelectCategoryDiv>
    );

    function setCategoryVal(category, val) {
        setCategories(categories.map(cat => {
            if (cat.category === category) {
                if (val)
                    addCategory(category);
                else
                    removeCategory(category);
                return { category: category, selected: val };
            } else {
                return cat;
            }
        }));
    }
}