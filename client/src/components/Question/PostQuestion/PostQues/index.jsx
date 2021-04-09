import React, { useState, useEffect, useContext } from "react";


// MaterialUI
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


// Styled Components
import {
    PostQuestionDiv, QuestionBody, PostQuestionHeading,
    FormDiv, FormContent, FormTitle, FormDesc,
    TitleInput, QuestionEditor, CategoriesDiv, CategoryBtn,
    StyledCancelIcon, SubmitButton
} from './styled';



function PostQuestion(props) {    
    const availabeTags = [];

    const mobileScreen = useMediaQuery(`(max-width: ${responsive.small})`);

    const [ editorData, setEditorData ] = useState("");
    const [ selectedTags, setSelectedTags ] = useState([]);
    const [ images, setImages ] = useState([]);
    // const [ availableCategories, ]  = useContext(CategoriesContext);
    const [ submitting, setSubmitting ] = useState(false);
    const [ categories, setCategories ] = useState([]);


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
                <TagInput selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
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