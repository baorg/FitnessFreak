import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';

//  material UI ==============================

import useMediaQuery from '@material-ui/core/useMediaQuery';
import Drawer from '@material-ui/core/Drawer';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';

// =================================================


import { fetchUserData } from '../utils/fetch_user_data';
import fetchCategories from '../utils/fetch_categories';
import { responsive } from '../utils/data.json';
import ajaxRequest from '../../ajaxRequest';
import { UserContext } from '../utils/UserContext';
import { NavContext } from '../utils/NavContext';
import { API_DOMAIN, SERVER_DOMAIN } from '../../config';



// Styled Components ==========================================================================================

let SelectCategoryDiv = styled.div`
    margin-left: auto;
    margin-right: 1em;
    box-sizing: border-box;
    
    height: 80vh;
    position: ${({drawer})=>drawer?"static":"sticky"};
    top: ${({drawer})=>drawer?"4em":"8em"};
    bottom: ${({drawer})=>drawer?"0":"2em"};
    
    
    display: flex;
    flex-direction: column;
    align-items: flex-center;
    width: 15em;

    justify-content: space-evenly;
    .heading{
        color: #065BFB;
        margin-bottom: 1em;
        font-weight: 600;
        font-size: 25px;
        line-height: 30px;    
    }

    .category{
        color: #424259;
        display: flex;
        width: 100%;

        .cat-name{
            text-align: center;
            justify-content: center;
            align-content: center;
            display: grid;
            place-content: center;
            margin: 0 0 0 10px;
            width: fit-content;
            font-size: 20px;
        }

        .cat-img{
            width: 25px;
            height: 25px;
            align-self: center;
            margin: 0 0 0 10px;
        }
    }
`;

// ============================================================================================================


export default function SelectCategory({selectedCategories, addCategory, removeCategory }) {
    const [categories, setCategories] = useState(null);
    const [ user, ] = useContext(UserContext);
    const [ leftnavActive, setLeftnavActive ] = useContext(NavContext).leftnav;
    const matches = useMediaQuery(`(max-width:${responsive.small})`);

    useEffect(() => {
        (async function (){
            try {
                let fetched_categories = await fetchCategories();
                console.log("Categories: ", fetched_categories);
                setCategories(
                    fetched_categories
                    .map(category => 
                        ({ 
                            category: category.name, 
                            selected: false,
                            image_url: `${SERVER_DOMAIN}/server-static/${category.url}`
                        })));
            } catch (err) {

            }
        })();
    }, []);


    useEffect(() => {
        if (categories === null) {
            
        } else {
            setCategories(categories.map(cat => ({
                category: cat.category,
                selected: selectedCategories.findIndex(c => c === cat.category) !== -1,
                image_url: cat.image_url
            })));
        }
    }, [selectedCategories])


    return (
      matches ? 
        <Drawer open={leftnavActive} onClose={closeLeftnav}>
          <SelectCategory matches={matches} />
        </Drawer>:
      <SelectCategory matches={matches} />
      
    );

    // return (<SelectCategory />);
    
    function SelectCategory({ matches }){
        return (
            categories === null ? <CircularProgress /> :
            <SelectCategoryDiv drawer={matches}>
                <h3 className="heading">Categories</h3>
                {categories.map(category => (
                    <div className="category">
                        <Checkbox 
                            checked={category.selected} 
                            onChange={({ target }) => {
                            setCategoryVal(category.category, target.checked);
                        }} 
                            className="cat-checkbox"
                        />
                        <img src={category.image_url} className="cat-img" />
                        <div className="cat-name" ><span>{category.category}</span></div>
                    </div>
                ))}
            </SelectCategoryDiv>
        )
    }

    function closeLeftnav(){
        setLeftnavActive(false);
    }

    function setCategoryVal(category, val) {
        setCategories(categories.map(cat => {
            if (cat.category === category) {
                if (val)
                    addCategory(category);
                else
                    removeCategory(category);
                return { category: category, selected: val, image_url: cat.image_url };
            } else {
                return cat;
            }
        }));
    }
}