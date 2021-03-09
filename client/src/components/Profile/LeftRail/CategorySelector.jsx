import { useEffect, useContext, useState } from 'react';
import styled from 'styled-components';

//  material UI ==============================

import useMediaQuery from '@material-ui/core/useMediaQuery';
import Switch from '@material-ui/core/Switch';
import Drawer from '@material-ui/core/Drawer';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';

// =================================================

import { responsive } from '../../utils/data.json';
import ajaxRequest from '../../../ajaxRequest';
import { UserContext } from '../../utils/UserContext';
import { NavContext } from '../../utils/NavContext';
import { API_DOMAIN } from '../../../config';
import fetchCategories from '../../utils/fetch_categories';

// Styled Components =====================================================

const MainDiv = styled.div`
    width: fit-content;
    padding: 10px;

    display: flex;
    flex-direction: column;
    font-size: 20px;

    .heading{
        display: flex;
        flex-direction: column;
        align-items: center;

        .helper{
            font-size: 12px;
        }
    }

`;
//====================================================================================


export default function CategorySelector({ profile_user }){
    const [ user, ] = useContext(UserContext);
    const [ categories, setCategories ] = useState(null);

    useEffect(fetchData, [user, ]);

    return (
        user && profile_user && user._id===profile_user._id && ( categories===null? <CircularProgress />:
            <MainDiv>
                <div className="heading">
                    <span>Choose categories</span>
                    <span className="helper">(At most 2)</span>
                </div>
                {categories.map(
                    category => 
                        <div>
                            <Switch
                                checked={category.chosen}
                                disabled={!category.active}
                                color="primary"
                                onClick={()=>toggleCategory(category.category)}
                            />
                            {category.category}
                        </div>
                )}
            </MainDiv>
        )
    );

    async function toggleCategory(category){
        let index = categories.findIndex(c => c.category===category);

        if(index!=-1){
            if(categories[index].active){
                let on = !categories[index].chosen;
                setCategories(categories.map((cat,i)=>
                    i===index?{
                        active: false,
                        chosen: on,
                        category: cat.category
                    }:cat));
                
                
                let { data } = await ajaxRequest('get', `${API_DOMAIN}/users/update-chosen-category?category=${category}&on=${on}`);

                // console.log('Data: ', data);
                
                if(data.chosen_category){
                    setCategories(categories.map(cat=>({
                        category: cat.category,
                        active: true,
                        chosen: data.chosen_category.some(c=>c===cat.category)
                    })));
                }
            }
        }
    }

    function fetchData(){
        if(user){
            console.log('User: ', user.chosen_category);
            fetchCategories()
                .then(category_list => {
                    console.log(category_list.map(
                            cat =>({
                                category: cat,
                                chosen: user.chosen_category.some(c=>c===cat),
                                active: true,
                            })
                        ));
                    setCategories(
                        category_list.map(
                            cat =>({
                                category: cat,
                                chosen: user.chosen_category.some(c=>c===cat),
                                active: true
                            })
                        ))
                });
        }
    }
}