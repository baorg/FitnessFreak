import { useContext } from 'react';
import { CommentDiv } from './styled';
import {
    Avatar
} from '@material-ui/core';
import {
    Delete as DeleteIcon,
    CheckCircle as CheckCircleIcon
} from '@material-ui/icons';

import { A, navigate } from 'hookrouter';
import moment from 'moment';

import request from 'src/ajaxRequest';
import { API_DOMAIN } from 'src/config';

import Vote from './vote'
import { UserContext } from 'src/components/utils/UserContext';
import { PopupAgreementContext } from 'src/components/utils/PopupAgreementContext';

export default function Comment({ comment, setComment, parentId, parentType }) {
    const [user,] = useContext(UserContext);
    const agreementPopup = useContext(PopupAgreementContext);

    return (
        <CommentDiv>
            <div className="header">
                <Avatar
                    alt={`${comment.user.username || 'unknown'}s_profile_image`}
                    src={comment.user && comment.user.profile_image}
                    onClick={()=>navigate(`/profile/${comment.user._id || comment.user.userId}`)}
                    className="avatar" />
                <div className="posted-data">
                    <div className="posted-name">
                        {comment.user ?
                            <A className="posted-by-name" href={`/profile/${comment.user._id || comment.user.userId}`}>
                                {comment.user.username}
                                {comment.user.is_verified && <CheckCircleIcon style={{fontSize: 20}} variant="filled" color="primary" />}
                            </A>
                            : <span className="posted-by-name deleted-name">[deleted]</span>}
                    </div>
                    <div className="posted-date">
                        <span className="heading">Commented on</span>
                        <span className="content">{moment(comment.posted_at).format('MMMM DD, YYYY')}</span>
                    </div>
                </div>
                {user && comment.user && user._id === comment.user._id &&
                    <DeleteIcon className="dlt-icon" onClick={deleteComment} />}
            </div>
            <div className="comment">
                {comment.comment}
            </div>

            <Vote
                votes={comment.vote_count}
                voted={comment.voted ? comment.voted.value : null}
                parentId={parentId}
                parentType={parentType}
                commentId={comment._id}
                setVote={changeVote}/>
        </CommentDiv>
    );

    function changeVote(vote_count, vote) {
        setComment({
            ...comment,
            vote_count,
            voted: vote
        });
    }

    function deleteComment() {
        agreementPopup(
            { content: 'Do you want to delete this comment.', title: 'Delete Comment' },
            "Cancel",
            "Delete",
            async () => { },
            del);
        
        async function del() {
            try {
                let data = { comment_id: comment._id };
                switch (parentType.toLowerCase()) {
                    case 'question':
                        data.question_id = parentId;
                        break;
                    case 'answer':
                        data.answer_id = parentId;
                        break;
                }
                let res = await request("delete", `${API_DOMAIN}/${parentType}/delete-comment`, data);
                if(res.data.success)
                    window.location.reload();
            } catch (err) {
                console.error(err);
            } finally {
            }
        }
    }
}