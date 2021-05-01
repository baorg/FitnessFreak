import { useState, useEffect } from 'react';
import { VoteDiv, VoteCountDiv } from './styled';
import LikeBtn from 'src/components/static/like_btn';
import { navigate } from 'hookrouter';

import request from 'src/ajaxRequest';
import { API_DOMAIN } from 'src/config';
import { PopupAgreementContext } from 'src/components/utils/PopupAgreementContext';
import { UserContext } from 'src/components/utils/UserContext';
import { useContext } from 'react';


export default function Vote({ parentId, parentType, commentId, votes, voted, setVote }) {
    
    const [up, setUp] = useState(null);
    const [down, setDown] = useState(null);
    const [user,] = useContext(UserContext);
    const showPopup = useContext(PopupAgreementContext);

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
        } else {
            showPopup(
                { content: 'You need to login for vote', title: 'Login required' },
                "Login",
                "Cancel",
                async () => { navigate('/auth/login'); },
                async () => { });
        }
    }

    function downvote() {
        if (down===true) {
            handleUnvote();
        } else if (down === false) {
            handleDownvote();
        } else {
            showPopup(
                { content: 'You need to login for vote', title: 'Login required' },
                "Login",
                "Cancel",
                async () => { navigate('/auth/login'); },
                async () => { });
        }
    }

    async function handleVoting(url) {
        if (user && user.is_authenticated) {
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
        } else {
            showPopup(
                { content: 'You need to login for vote', title: 'Login required' },
                "Login",
                "Cancel",
                async () => { navigate('/auth/login'); },
                async () => { });
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