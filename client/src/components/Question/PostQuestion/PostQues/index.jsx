import React, { useState, useEffect, useContext } from "react";


// MaterialUI
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Snackbar, LinearProgress } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


import MyNav from "../../../Navigation/navbar/navbar"
import SideNavBar from "../../../Navigation/SideNav/SideNav";
import Searchdiv from "../../../Searchdiv/searchdiv";
import ImagesTile from './ImagesTile';
import ajaxRequest from '../../../../ajaxRequest';
import { navigate } from "hookrouter";

import CONFIG from '../../../../config';
import { CategoriesContext } from '../../../utils/CategoriesContext';
import { responsive } from '../../../utils/data.json';
import fetchCategories from '../../../utils/fetch_categories';
// import CategoryIcons from '../../../static/CategoryIcons';
import CategoryDiv from './category';
import TagInput from './taginput';


// Styled Components
import {
    PostQuestionDiv, QuestionBody, PostQuestionHeading,
    FormDiv, FormContent, FormTitle, FormDesc,
    TitleInput, QuestionEditor, CategoriesDiv, CategoryBtn,
    StyledCancelIcon, SubmitButton
} from './styled';



function PostQuestion(props) {

    const mobileScreen = useMediaQuery(`(max-width: ${responsive.small})`);
    const [ editorData, setEditorData ] = useState("");
    const [ selectedTags, setSelectedTags ] = useState([]);
    const [ images, setImages ] = useState([]);
    // const [ availableCategories, ]  = useContext(CategoriesContext);
    const [ submitting, setSubmitting ] = useState(false);
    const [ categories, setCategories ] = useState([]);
    const [ msg, setMsg ] = useState(null);

    const maxCategoriesAllowed = 2;
    const maxTagsAllowed = 5;


    useEffect(() => {
        console.log('User:', props.user);
        if (props.user === null) {
                navigate("/auth");
        }
    }, [])
    useEffect(() => { getCategoriesData();}, []);

    
    return (
        <PostQuestionDiv>
            <PostQuestionHeading>Ask your question.</PostQuestionHeading>
            {submitting && <LinearProgress />}
            <QuestionBody
                value={editorData}
                placeholder="Type here something....."
                type="text"
                onChange={({target})=>setEditorData(target.value)}/>
                <FormContent>
                    <FormTitle> Categories </FormTitle>
                    <FormDesc>Select category which you feel related to your question.</FormDesc>
                    <CategoriesDiv>
                        {categories.map((el,index)=>
                            <CategoryDiv category={el} selected={el.selected} handleChange={() => { selectCategory(el.name); }} />
                        )}</CategoriesDiv>
                </FormContent>
                <FormContent>
                    <TagInput
                        showMsg={showMsg}
                        maxTagsAllowed={maxTagsAllowed}
                        selectedTags={selectedTags}
                        setSelectedTags={setSelectedTags} />
                </FormContent>
                <FormContent>
                    {submitting ?
                             <SubmitButton color="primary" disabled variant="contained" >Post your question.</SubmitButton>
                            : <SubmitButton color="primary" variant="contained" onClick={submit}>Post your question.</SubmitButton>}
                </FormContent>
            <Snackbar open={Boolean(msg)} autoHideDuration={3000} onClose={handleMsgClose}>
                {msg && <Alert onClose={handleMsgClose} severity={msg.severity}>
                    {msg.msg}
                </Alert>}
            </Snackbar>
        </PostQuestionDiv>
    );

    function handleMsgClose() {
        setMsg(null);
    }

    function showMsg(msg, severity) {
        setMsg({ msg, severity });
    }
    
    async function getCategoriesData() {
        console.log('Getting categories data.....');
        let categories_data = await fetchCategories();
        console.log('Categories Data: ', categories_data);
        setCategories(categories_data.map(val => ({ ...val, selected: false })));
    }

    function countSelectedCategories() {
        return categories.reduce((count, cat) =>  count + (cat.selected ? 1 : 0), 0);
    }
    function isCategorySelected(cat) {
        return categories.find(c => c.name === cat, { selected: false }).selected;
    }
    async function selectCategory(cat) {
        if (isCategorySelected(cat)) {
            setCategories(categories.map(val => val.name == cat ? { name: val.name, selected: false } : val));
        } else {
            console.log('Cat count: ', countSelectedCategories());
            if (countSelectedCategories() < maxCategoriesAllowed) {
                setCategories(categories.map(val => val.name == cat ? { name: val.name, selected: true } : val));
            } else {
                showMsg("You can only choose 2 categories", "error");
            }
        }
    }

    async function submit() {
        console.log('Submitting....');
        
        if (editorData.length === 0) {
            showMsg('Write question', 'error');
            return;
        }
        if (countSelectedCategories() === 0) {
            showMsg('Select at least 1 category', 'error');
            return;
        }
        if (selectedTags.length === 0) {
            showMsg('Select at least 1 tag', 'error');
            return;
        }
        
        setSubmitting(true);


        let res = await ajaxRequest("POST", `${CONFIG.API_DOMAIN}/question/post-question`, {
            category: categories.filter(cat => cat.selected).map(val => val.name),
            tags: selectedTags,
            question: editorData,
            title: "",
        });

        if (res.data.is_saved) {
            // alert('Question submitted successfully');
            showMsg('Question submitted successfully', 'success');
            navigate(`/viewFullQuestion/${res.data.question_id}`);
            return;
        }
        else {
            // alert('Errr..., some error occured on our side!');
            showMsg('Some error occured! Try refreshing the page', 'error');
            setSubmitting(false);
            return;
        }
    }

}

export default PostQuestion;