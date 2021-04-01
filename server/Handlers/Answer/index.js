const { getAnswerById, getAnswersByQuesId } = require('./retrieve');
const { getComments, postComment, deleteComment, upvoteComment, downvoteComment, unvoteComment } = require('./comments');

module.exports = {
    getAnswerById,
    getAnswersByQuesId,

    getComments,
    postComment,
    deleteComment,
    upvoteComment,
    downvoteComment,
    unvoteComment
};