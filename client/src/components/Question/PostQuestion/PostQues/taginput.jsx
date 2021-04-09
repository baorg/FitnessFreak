import { useState, useEffect } from 'react';

// Material-UI
// core
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import LinearProgress from '@material-ui/core/LinearProgress';

// icons
import SearchIcon from '@material-ui/icons/Search';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';


import ajaxRequest from '../../../../ajaxRequest';
import { API_DOMAIN } from '../../../../config';

import {
    FormTitle, FormDesc,
    StyledCancelIcon, SelectedTags, StyledList,
    TagsInputContainer
} from './styled';




export default function TagInput({ selectedTags, setSelectedTags }) {
    const [ tags, setTags] = useState([]);
    const [ fetching, setFetching] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(checkSelectedTags, [selectedTags]);
    useEffect(searchQueryChangeEffect, [searchQuery]);
    return (
        <TagsInputContainer>
            <FormControl fullWidth>
                <FormTitle> Tags </FormTitle>
                    <FormDesc>Adding tags makes it easy to spread your questions.</FormDesc>
                    {selectedTags.length>0 && <SelectedTags>
                        {selectedTags.map((el, index) =>
                            <div className="tags" key={index}>
                                <div>{el}</div>
                                <ClearIcon onClick={() => deltags(index)} className="icon"/>
                            </div>)}
                    </SelectedTags>}
            </FormControl>
            <FormControl fullWidth>
                <StyledList >
                    <ListSubheader>
                        <ListItem>
                            <FormControl fullWidth>
                                <InputLabel htmlFor="input-with-icon-adornment">Add tags here...</InputLabel>
                                <Input
                                    value={searchQuery}
                                    onChange={handleInputChange}
                                    id="input-with-icon-adornment"
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <SearchIcon />
                                        </InputAdornment>
                                    }
                                />
                                {fetching && <LinearProgress />}
                            </FormControl>
                        </ListItem>
                    </ListSubheader>
                    {tags.map((tag) => (
                        <>
                            <ListItem button key={`item-${tag}}`} onClick={selectTag(tag.tag)}>
                                <ListItemText primary={tag.tag} />
                                {tag.selected && <ListItemIcon>
                                    <DoneIcon color="primary"  />
                                </ListItemIcon>}
                            </ListItem>
                            <Divider />
                        </>
                    ))}
                    </StyledList>
            </FormControl>
        </TagsInputContainer>
    );

    function checkSelectedTags() {
        setTags(oldTags => 
            oldTags.map(tag => ({
                tag: tag.tag,
                selected: (selectedTags.findIndex(stag => stag === tag.tag) !== -1)
            }))
        );
    }

    function deltags(index){
        let a=[];
        a=selectedTags.map((el)=>el);
        a.splice(index, 1);
        setSelectedTags(a);
    }

    function selectTag(tag) {
        return (() => {
            setSelectedTags(oldSelectedTags => {
                let tmpSet = new Set(oldSelectedTags);
                if (!tmpSet.delete(tag))
                    tmpSet.add(tag);
                return Array.from(tmpSet);
            });
        });
    }

    async function handleInputChange({ target }) {
        setSearchQuery(target.value);
    }

    function searchQueryChangeEffect() {
        fetchtags()
            .then(() => { })
            .catch(err => {
                console.error('ERROR, ',err);
            });

        async function fetchtags(){
                if (!fetching && searchQuery.length) {
                setFetching(true);
                let res = await ajaxRequest('GET', `${API_DOMAIN}/tags/get-tags?q=${searchQuery}`);
                if (res.data.hasOwnProperty('tags')) {
                    setTags(
                        res.data.tags.map(tag => ({
                            id: tag.id,
                            tag: tag.tagname,
                            selected: false,
                        }))
                    );
                }
                setFetching(false);
            }
        }
    }
}