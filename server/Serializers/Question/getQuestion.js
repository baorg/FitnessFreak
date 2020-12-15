module.exports.feedQuestionSerializer = function(question) {
    if (question) {
        return {
            _id: question._id,
            title: question.title,
            question: question.question,
            vote: {
                up: question.vote_count.upvote,
                down: question.vote_count.downvote
            },
            category: question.categoryName,
            user: question.userId,
            tags: question.tags,
            posted_at: question.created_at
        };
    } else {
        return null;
    }
}