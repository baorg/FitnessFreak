import React, {useState, useEffect} from 'react';

// Material-UI ===================

import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import useMediaQuery from '@material-ui/core/useMediaQuery';

//  ===========================

import { A, navigate} from 'hookrouter';


import InfiniteScroll from './InfiniteScroll';
import styled from 'styled-components';
import CONFIG from '../../../config';
import { responsive } from '../../utils/data.json';
import PlusSignSVG from './plus_sign';

import ajaxRequest from '../../../ajaxRequest';

// Styled Components ==================================================================================

const Content = styled.div`
    grid-column: 2 / 3;
    padding: 30px 5px 0 5px;
    scrollbar-width: 0;
    width: 100%;
    box-sizing: border-box;
    max-height: 100%;

    display: flex;

    .divider{
        height: 80vh;
        top: 10vh;
        position: -webkit-sticky;
        position: sticky;
    }

    .content{
        margin: 0 20px 0 20px;
        width: 100%;
        @media(max-width: ${responsive.small}){
            margin: 0;
        }
    }

    @media(max-width: ${responsive.small}){
        padding: 20px 0 0 0;
    }

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

    display: flex;
    flex-wrap: wrap;

    background-color: ${({selected}) => selected ? "#5ac8d6": "inherit"};
    :hover{
        background-color: ${({selected}) => selected ? "#5ac8d6": "#dddddd"};
        cursor: pointer;
    }

    .ques-count{
        margin-left: 6px;
        font-family: SF Pro;
        font-style: normal;
        font-weight: 500;
        font-size: 21px;
        line-height: 25px;    
        color: #065BFB;
    }
`;

const PostQuestionBtn = styled.div`
    width: 224px;
    height: 52px;
    background: #065BFB;
    border-radius: 10px;

    display: flex;
    align-items: center;
    justify-content: space-evenly;
    cursor: pointer;

    .icon{
        width: 20px;
        height: 20px;
    }
    .txt{
        width: 136px;
        height: 24px;
        font-family: SF Pro;
        font-style: normal;
        font-weight: 600;
        font-size: 20px;
        line-height: 24px;
        color: #FFFFFF;
    }
`;

// =======================================================================================================

export default function MainLandingPageDiv({ type, selectedCategories, setType, user }) {
    const [url, setUrl] = useState(`${CONFIG.API_DOMAIN}/feed/get-feed?`);
    const [unansweredQuestionCount, setUnansweredQuestionCount] = useState(null);
    
    let midPoint = useMediaQuery(`(min-width: ${responsive.medium})`);
    let lastPoint = useMediaQuery(`(min-width: ${responsive.small})`);


    useEffect(loadUnansweredQuestionCount, []);
    useEffect(loadData, [type, selectedCategories]);


    return (
        <Content>
            {lastPoint && <Divider className="divider" orientation="vertical" flexItem />}
            <div className="content">
            <Margin>
                <div>
                {/* <Button variant="contained" color="primary">Post a Question</Button> */}
                    <PostQuestionBtn
                        onClick={()=>navigate("/post-question")}
                    >
                        <PlusSignSVG className="icon" />
                        <div className="txt" >Post a question</div>
                    </PostQuestionBtn>
                </div>
                <TypeContainer>
                    <Type selected={type==="Newest"} onClick={()=>handleTypeChange("Newest")}>New</Type>
                    <Divider orientation="vertical" flexItem />
                    <Type selected={type==="Hot"} onClick={()=>handleTypeChange("Hot")}>Hot</Type>
                    <Divider orientation="vertical" />
                    <Type selected={type==="Unanswered"} onClick={()=>handleTypeChange("Unanswered")}>
                        Unanswered 
                        {unansweredQuestionCount && 
                            <span className="ques-count">( {unansweredQuestionCount} )</span>}
                    </Type>
                </TypeContainer>
            </Margin>
            <InfiniteScroll type={type} selectedCategories={selectedCategories} url={url} user={user}/>
            </div>
            {midPoint && <Divider className="divider" orientation="vertical" flexItem />}
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

    function loadUnansweredQuestionCount(){
        if(unansweredQuestionCount===null){
            ajaxRequest('GET', 
                `${CONFIG.API_DOMAIN}/question/get-unanswered-question-count`)
                .then(({data})=>{
                    if(data.success){
                        setUnansweredQuestionCount(data.unanswered_question_count);
                    }else{
                        console.log(data.error);
                    }
                })
                .catch(err=>{
                    console.error('ERROR:', err);
                });
        }
    }
}