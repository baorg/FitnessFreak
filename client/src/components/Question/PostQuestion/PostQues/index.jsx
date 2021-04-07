import React, { useState, useEffect, useContext } from "react";


// MaterialUI
import CloseIcon from '@material-ui/icons/Close';
import CancelIcon from '@material-ui/icons/Cancel';
import  Button  from '@material-ui/core/Button';
import useMediaQuery from '@material-ui/core/useMediaQuery';


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


import styled from 'styled-components';
// Styled Components =======================================
let PostQuestionDiv = styled.div`
    background-color: #FFFFFF;
    width: 100%;
    max-width: 822px;
    padding: 35px 50px 35px 50px;
    border-radius: 10px;
    font-family: SF Pro;
    font-style: normal;
    display: flex;
    flex-direction: column;
    margin-bottom: 40px;
    >*{
        margin-top: 25px;
    }
    
    
    @media screen and (max-width: ${responsive.small}){
        border-radius: 0;
        margin-top: 0;
        margin-bottom: 0;
        padding: 30px 15px 30px 15px;
    }
`;

let QuestionBody = styled.textarea`
    min-height: 120px;
    height: fit-content;
    background: #EFF2F4;
    border-radius: 9px;
    border-width: 0;
    outline: none;
    padding: 10px;

    @media(max-width: ${responsive.small}){

    }

`;

let PostQuestionHeading = styled.div`
    font-weight: 600;
    font-size: 27px;
    line-height: 32px;
    margin-top: 0;
    color: #424259;

    @media(max-width: ${responsive.small}){
        font-weight: 500;
    }

`;
let FormDiv = styled.form`
    border: 2px solid black;
    background-color: white;
    padding: 1em;
    margin-bottom: 5em;
    border-radius: 5px;
`;

let FormContent = styled.div`
    margin-top: 25px;
    display: flex;
    flex-direction: column;
`;

let FormTitle = styled.div`
    font-style: normal;
    font-weight: 500;
    font-size: 23px;
    line-height: 27px;
    color: #424259;
`;

let FormDesc = styled.div`
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 24px;
    color: rgba(66, 66, 89, 0.9);
    margin-top: 10px;
    ::after{
        float: right;
        width: 2em;
        text-align: center;
        border-radius: 10px;
        background-color: #b9b9b9;
        color: black;
        content: "${ (props) => props.title?(50 - props.title.length).toString(): null}";
    }
`;

let TitleInput = styled.input`
    margin-top: 5px;
    width: 100%;
    border-radius: 5px;
    border-width: 2px;
    height: 2em;

`;


let QuestionEditor = styled(CKEditor)`
    min-height: 10em;

`;

let CategoriesDiv = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-evenly;
`;

let CategoryBtn = styled.div`
    border: 2px solid #8f8f8f;
    border-radius: 4px;
    margin: 4px;
    font-size: 0.8em;
    padding: 0 2px 0 2px;
    cursor: pointer;
    background-color: ${(props) => props.checked?"#4be74b":"white"};
`;


let SelectedTags = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-top: 4px;
`;


let StyledCancelIcon = styled(CancelIcon)`
    font-size: 2em;
`;

let SubmitButton = styled(Button)`
    align-self: center;
    width: 100%;
    height: 50px;
    border-radius: 9px;
    font-family: SF Pro;
    font-style: normal;
    font-weight: 500;
    font-size: 22px;
    line-height: 26px;
    color: #FFFFFF;
    background: #065BFB !important;
    text-transform: none !important;
`;
// =========================================================



function PostQuestion(props) {    
    const availabeTags = ["#yoga", "#bodybuilding", "#gymnastics", "#zumba"];

    const mobileScreen = useMediaQuery(`(max-width: ${responsive.small})`);

    const [ editorData, setEditorData ] = useState("");
    const [ selectedTags, setSelectedTags ] = useState([]);
    const [ images, setImages ] = useState([]);
    // const [ availableCategories, ]  = useContext(CategoriesContext);
    const [ submitting, setSubmitting ] = useState(false);
    const [ categories, setCategories ] = useState([]);


    // const [title, setTitle] = useState("");
    // const [category, setCategory] = useState("");


    const maxCategoriesAllowed = 2;

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
            <QuestionBody
                value={editorData}
                placeholder="Type here something....."
                type="text"
                onChange={({target})=>setEditorData(target.value)}
            />
            <FormContent>
                <FormTitle> Categories </FormTitle>
                <FormDesc>Select category which you feel related to your question.</FormDesc>
                <CategoriesDiv>
                    {categories.map((el,index)=>
                        <CategoryDiv category={el} selected={el.selected} handleChange={() => { selectCategory(el.name); }} />
                    )}
                </CategoriesDiv>
            </FormContent>
            <FormContent>
                <FormTitle> Tags </FormTitle>
                <FormDesc>Adding tags makes it easy to spread your questions.</FormDesc>
                <TagInput selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
                <SelectedTags>
                 {selectedTags.map((el, index) =>
                     <div className="element2" key={index}>
                         <a href="#">{el}</a>
                                 <StyledCancelIcon onClick={() => deltags(index)} />
                     </div>)}
                </SelectedTags>
            </FormContent>
            <FormContent>
                {submitting ?
                         <SubmitButton color="primary" disabled variant="contained" >Post your question.</SubmitButton>
                        : <SubmitButton color="primary" variant="contained" onClick={submit}>Post your question.</SubmitButton>}
            </FormContent>
        </PostQuestionDiv>
    );
    
    async function getCategoriesData() {
        console.log('Getting categories data.....');
        let categories_data = await fetchCategories();
        console.log('Categories Data: ', categories_data);
        setCategories(categories_data.map(val => ({ ...val, selected: false })));
    }

    function deltags(index){
        let a=[];
        a=selectedTags.map((el)=>el);
        a.splice(index, 1);
        setSelectedTags(a);
    }

    function selectTag(a) {
        setSelectedTags(a);
    }

    function handleEditorChange(event, editor) {
    console.log(editor);
    setEditorData(editor.getData());
    }

    function handleEditorBlur(event, editor) {
    let data = editor.getData();
    console.log('Editor Blur');
    }

    function handleEditorFocus(event, editor) {
    let data = editor.getData();
    console.log('Editor Focus');
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
            }
        }
    }
    async function submit() {
        console.log('Submitting....');
        setSubmitting(true);
        
        let images_count = images.length;
        let images_url = [];

        for (var i = 0; i < images_count; i++){
            let image = images[i];
            if (image.uploaded) {
                images_url.push(image);
            } else {
                let formData = new FormData();
                formData.append('file', images[i].file);
                let res = await fetch(`${CONFIG.API_DOMAIN}/upload/image-upload`, {
                    method: 'POST',
                    body: formData,
                    credentials: 'include'
                });

                let data = await res.json();
                if (data.success) {
                    images_url.push({ url: data.url, type: 'image' });
                    await setImages(images.map((img, ind) => {
                        if (ind === i)
                            return {
                                src: data.url,
                                file: img.file,
                                uploaded: true
                            };
                        else
                            return img;
                    }));
                } else {
                    alert('Some error occured in submitting question.');
                    setSubmitting(false);
                    return;
                }
            }
        }

        let res = await ajaxRequest("POST", `${CONFIG.API_DOMAIN}/question/post-question`, {
            category: categories.filter(cat => cat.selected).map(val => val.name),
            tags: selectedTags,
            question: editorData,
            title: "",
            attachments: images_url
        });

        if (res.data.is_saved) {
            alert('Question submitted successfully');
            navigate("/");
            return;
        }
        else {
            alert('Errr..., some error occured on our side!');
            setSubmitting(false);
            return;
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();
        return submit();
    }

}

export default PostQuestion;


{/* <Searchdiv tags={availabeTags} selectedTags={selectedTags} setSelectedTags={setSelectedTags} change={selectTag} type="tags"  /> */}
{/* <FormContent>
    <FormTitle> Attachments </FormTitle>
    <FormDesc>Add attachments to explain your question properly.</FormDesc>
    <ImagesTile images={images} setImages={setImages} submitting={submitting} />
</FormContent> */}
// {/* <FormTitle> Body </FormTitle>
//           <FormDesc>Explain your question throughly.</FormDesc> */}
//           {/* <QuestionEditor
//             editor={ClassicEditor}
//               config={{
//                 toolbar: ['heading', '|', 'bold', 'italic', 'blockQuote', 'numberedList', 'bulletedList', '|', 'undo', 'redo', 'Link'],
//                 ckfinder: { uploadUrl: '/Question/upload' }
//               }}
//               onChange={handleEditorChange}
//               onBlur={handleEditorBlur}
//               onFocus={handleEditorFocus}
//               style={{ height: "10em" }}
//             /> */}