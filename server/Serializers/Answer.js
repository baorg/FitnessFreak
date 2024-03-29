function userAnswerSerializer(user) {
    return user.answer.filter(ans => ans.quesId !== null).map(ans => ({
        _id: ans._id,
        answer: ans.answer,
        posted_at: ans.posted_at ? ans.posted_at : null,
        comments_count: ans.comments ? ans.comments.length : null,
        vote_count: ans.vote_count,
        vote: {
            up: ans.vote_count.up,
            down: ans.vote_count.down
        },
        marked: ans.marked,
        user: {
            _id: user._id,
            username: user.username,
            first_name: user.first_name,
            last_name: user.last_name,
            profile_image: user.profile_image,
            is_verified: user.is_verified
        },
        question: {
            _id: ans.quesId._id,
            title: ans.quesId.title,
            question: ans.quesId.question,
            category: ans.quesId.categoryName,
            tags: ans.quesId.tags,
            attachments: ans.quesId.attachments,
            posted_at: ans.quesId.created_at,
            vote: {
                up: ans.quesId.vote_count.upvote,
                down: ans.quesId.vote_count.downvote
            },
            user: {
                _id: ans.quesId.userId._id,
                username: ans.quesId.userId.username,
                first_name: ans.quesId.userId.first_name,
                last_name: ans.quesId.userId.last_name,
                profile_image: ans.quesId.userId.profile_image,
                is_verified: ans.quesId.userId.is_verified
            }
        }
    }));
}

function answerSerializer(ans, user = null, question = true, many = false) {
    function get(ans) {
        return {
            _id: ans._id,
            answer: ans.answer,
            posted_at: ans.posted_at ? ans.posted_at : null,
            vote_count: ans.vote_count,
            comments_count: ans.comments ? ans.comments.length : null,
            vote: {
                up: ans.vote_count.upvote,
                down: ans.vote_count.downvote
            },

            marked: ans.marked,
            my_vote: ans.upDown.find(upd => user && upd.userId === user.id),
            user: ans.userId ? {
                _id: ans.userId._id,
                username: ans.userId.username,
                first_name: ans.userId.first_name,
                last_name: ans.userId.last_name,
                profile_image: ans.userId.profile_image,
                is_verified: ans.userId.is_verified
            } : null,
            question: question ? {
                _id: ans.quesId._id,
                title: ans.quesId.title,
                question: ans.quesId.question,
                category: ans.quesId.categoryName,
                tags: ans.quesId.tags,
                attachments: ans.quesId.attachments,
                posted_at: ans.quesId.created_at,
                vote: {
                    up: ans.quesId.vote_count.upvote,
                    down: ans.quesId.vote_count.downvote
                },
                user: {
                    _id: ans.quesId.userId._id,
                    username: ans.quesId.userId.username,
                    first_name: ans.quesId.userId.first_name,
                    last_name: ans.quesId.userId.last_name,
                    profile_image: ans.quesId.userId.profile_image,
                    is_verified: ans.quesId.is_verified
                }
            } : null
        };
    }

    if (many) {
        return ans.map(get);
    } else {
        return get(ans);
    }
}

module.exports = {
    answerSerializer,
    userAnswerSerializer,
}