import { CommentDiv } from './styled';
import {
    Avatar
} from '@material-ui/core';
import { A } from 'hookrouter';
import moment from 'moment';
import Vote from './vote'

export default function Comment({ comment, setComment, parentId, parentType }) {
    // console.log('Comment :> ', comment);

    return (
        <CommentDiv>
            <div className="header">
                <Avatar
                    alt={`${comment.user.username || 'unknown'}s_profile_image`}
                    src={comment.user && comment.user.profile_image}
                    className="avatar" />
                <div className="posted-data">
                    <div className="posted-name">
                        {comment.user ?
                            <A className="posted-by-name" href={`/profile/${comment.user._id || comment.user.userId}`}> {comment.user.username}</A>
                            : <span className="posted-by-name deleted-name">[deleted]</span>}
                    </div>
                    <div className="posted-date">
                        <span className="heading">Commented on</span>
                        <span className="content">{moment(comment.posted_at).format('MMMM DD, YYYY')}</span>
                    </div>
                </div>
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
}