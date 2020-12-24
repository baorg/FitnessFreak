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
            user: {
                _id: question.userId._id,
                username: question.userId.username,
                first_name: question.userId.first_name,
                last_name: question.userId.last_name,
                profile_image: question.userId.profile_image
            },
            tags: question.tags,
            posted_at: question.created_at
        };
    } else {
        return null;
    }
}