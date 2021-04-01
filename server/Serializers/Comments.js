function commentsSerializer(comments, user_id){
    user_id = (user_id&&user_id.toString()) || "tmpuser";
    return comments.map(comment=>({
        _id: comment._id,
        comment: comment.comment,
        vote_count: comment.vote_count,
        ans_id: comment.answerId,
        posted_at: comment.posted_at,
        user: {
            _id: comment.userId._id,
            username: comment.userId.username,
            first_name: comment.userId.first_name,
            last_name: comment.userId.last_name
        },
        voted: comment.upDown.find(vote=>vote.userId.toString()===user_id) || {userId: user_id, value: 0}
    }));
}


module.exports = {
    commentsSerializer
};