import { useEffect, useContext, useState } from 'react';
import styled from 'styled-components';

//  material UI ==============================

import useMediaQuery from '@material-ui/core/useMediaQuery';
import Switch from '@material-ui/core/Switch';
import Drawer from '@material-ui/core/Drawer';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';

// =================================================
import CategoryIcon from 'src/components/static/CategoryIcons';
import { responsive } from '../../utils/data.json';
import ajaxRequest from '../../../ajaxRequest';
import { UserContext } from '../../utils/UserContext';
import { NavContext } from '../../utils/NavContext';
import { API_DOMAIN, SERVER_DOMAIN } from '../../../config';
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
        .main{
            font-weight: 600;
            font-size: 25px;
            line-height: 30px;
            color: #065BFB;

        }
        .helper{
            font-size: 12px;
        }
    }

    .category{
        color: #424259;
        display: flex;
        width: 100%;
        font-weight: 500;
        font-size: 20px;
        line-height: 24px;
        color: #424259;
        margin-top: 20px;

        &.active{
            font-weight: 600;
            font-size: 24px;
            line-height: 29px;
            color: #065BFB;
        
            path{ 
                fill: #065BFB; /* : "#424259"};*/
            }
        }
        path{ 
            fill: "#424259"};
        }
        
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
//====================================================================================

export default function CategorySelector({ profile_user }){
    const [ user, ] = useContext(UserContext);
    const [ categories, setCategories ] = useState(null);

    // console.log('Profile User: ', profile_user);

    useEffect(fetchData, [user, profile_user]);
    useEffect(() => console.log('categories:', categories), [categories]);
    if (profile_user && categories) {
        if (user && user._id === profile_user._id)
            return <SelfCategoryDiv categories={categories} setCategories={setCategories} />;
        else
            return <CategoryDiv categories={categories} />;
    } else {
        return <CircularProgress />;
    }
    

    function fetchData(){
        if(profile_user && profile_user.chosen_category){
            console.log('Fetching user categories: ', profile_user.chosen_category);
            fetchCategories()
                .then(category_list => {
                    setCategories(
                        category_list.map(
                            cat => ({
                                category: cat.name,
                                image: `${SERVER_DOMAIN}/server-static/${cat.url}`,
                                chosen: profile_user.chosen_category.some(c => c === cat.name),
                                active: true
                            })
                        ));
                });
        }
    }
}


function CategoryDiv({ categories }) {
    return (
        <MainDiv>
            <div className="heading">
                <span className="main">Categories</span>
            </div>
            {categories.map(
                category =>
                    <div className={`category ${category.chosen ? "active" : ""}`}>
                        <CategoryIcon className="icon" category={ category.category}/>
                        <div className={`cat-name`} >{category.category}</div>
                    </div>
            )}
        </MainDiv>
    );
}

function SelfCategoryDiv({ categories, setCategories }) {
    return (
        <MainDiv>
            <div className="heading">
                <span>Choose categories</span>
                <span className="helper">(At most 2)</span>
            </div>
            {categories.map(
                category =>
                <div className={`category ${category.chosen ? "active" : ""}`}>
                        <Switch
                            checked={category.chosen}
                            disabled={!category.active}
                            color="primary"
                            onClick={() => toggleCategory(category.category)}
                            className="cat-switch"
                        />
                        <CategoryIcon className="icon" category={ category.category}/>
                        <div className={`cat-name`} >{category.category}</div>
                    </div>
            )}
        </MainDiv>
    );

    async function toggleCategory(category){
        let index = categories.findIndex(c => c.category===category);

        if(index!=-1){
            if(categories[index].active){
                let on = !categories[index].chosen;
                setCategories(categories.map((cat,i)=>
                    i===index?{
                        ...cat,
                        active: false,
                        chosen: on,
                    }:cat));
                
                
                let { data } = await ajaxRequest('get', `${API_DOMAIN}/users/update-chosen-category?category=${category}&on=${on}`);

                // console.log('Data: ', data);
                
                if(data.chosen_category){
                    setCategories(categories.map(cat=>({
                        ...cat,
                        active: true,
                        chosen: data.chosen_category.some(c=>c===cat.category)
                    })));
                }
            }
        }
    }
}