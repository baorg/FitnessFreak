import { useState, useEffect } from 'react';
import { VoteDiv, VoteCountDiv } from './styled';
import LikeBtn from 'src/components/static/like_btn';

import request from 'src/ajaxRequest';
import { API_DOMAIN } from 'src/config';


export default function Vote({ parentId, parentType, commentId, votes, voted, setVote }) {
    
    const [up, setUp] = useState(null);
    const [down, setDown] = useState(null);

    useEffect(votedEffect, [voted ]);

    return (
    <VoteDiv>
        <LikeBtn
            type="like"
            active={up}
            onClick={upvote}
            className="vote-btn"
        />
        <VoteCountDiv
                count={votes.upvote - votes.downvote}>
                {Math.abs(votes.upvote - votes.downvote)}</VoteCountDiv>
        <LikeBtn
            type="dislike"
            active={down}
            onClick={downvote}
            className="vote-btn"
        />
    </VoteDiv>);

    function votedEffect() {
        switch (true) {
            case voted === null:
                return;
            case voted < 0:
                setDown(true);
                setUp(false);
                return;
            case voted > 0:
                setDown(false);
                setUp(true);
                return;
            case voted === 0:
                setDown(false);
                setUp(false);
                return;
        }
    }
    
    function upvote() {
        if (up===true) {
            handleUnvote();
        } else if (up === false) {
            handleUpvote();
        }
    }

    function downvote() {
        if (down===true) {
            handleUnvote();
        } else if (down === false) {
            handleDownvote();
        }
    }

    async function handleVoting(url) {
        
        try {
            let res = await request(
                'get',
                `${url}?${parentType}_id=${parentId}&comment_id=${commentId}`
            );
            if (res.data.success) {
                setVote(res.data.vote_count, res.data.vote);
            }
        } catch (err) {
            console.error(err);
        }
    }

    function handleUpvote() {
        handleVoting(`${API_DOMAIN}/${parentType}/upvote-comment`);
    }

    function handleDownvote() {
        handleVoting(`${API_DOMAIN}/${parentType}/downvote-comment`);
    }

    function handleUnvote() {
        handleVoting(`${API_DOMAIN}/${parentType}/unvote-comment`);
    }
}