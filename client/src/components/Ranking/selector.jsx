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
`;

// ============================================================================================================


export default function SelectCategory({selectedCategories, addCategory, removeCategory }) {
    const [categories, setCategories] = useState([]);
    const [fetching, setFetching] = useState(false);
    useEffect(() => {
        async function fetchCategories(){
            try {
                let res = await ajaxRequest('GET', `${API_DOMAIN}/question/getCategory`);
                console.log('Categories: ', res.data);
                setCategories(res.data.categories.map(category => ({ category: category, selected: false })));
                setFetching(false);
            } catch (err) {
                setFetching(false);
            }
        }
        if (fetching===false && categories.length===0) {
            setFetching(true);
            fetchCategories();
        }
    });

    return (
        fetching ? <CircularProgress /> :
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