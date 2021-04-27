import { useState, useEffect } from 'react';

import { CommentsContainer } from './styled';
import Comment from './comment';

import request from 'src/ajaxRequest';
import { API_DOMAIN } from 'src/config';

export default function Comments({ parentId, parentType, commentsReload, onReloaded }) {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(reloadCommentsEffect, [commentsReload]);
    useEffect(fetchCommentsEffect, [parentId]);

    return (
        (comments && comments.length>0) ? <CommentsContainer>
            {comments.map(comment =>
                <Comment
                    parentId={parentId}
                    parentType={parentType}
                    comment={comment}
                    setComment={(new_comment)=>changeComment(comment, new_comment) }/>
            )}
        </CommentsContainer> : <></>);
    

    function changeComment(old_comment, new_comment) {
        setComments(
            comments.map(comment => {
                if (comment._id === old_comment._id) {
                    return new_comment;
                } else return comment;
            })
        );
    }

    function fetchCommentsEffect() {
        reloadComments();
    }

    function reloadCommentsEffect() {
        if (commentsReload) {
            reloadComments().then(() => {
                onReloaded();
            });
        }
    }


    async function reloadComments() {
        setLoading(true);
            try {
                let res = await request('get', `${API_DOMAIN}/${parentType}/get-comments?${parentType}_id=${parentId}`);
                console.log("Res data:  ", res.data);
                if (res.data.success) {
                    setComments(res.data.comments);
                }
            } catch (err) {
                console.error(err);
            }
        setLoading(false);
    }

    
}