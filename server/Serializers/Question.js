module.exports.feedQuestionSerializer = function(questions, multiple = false) {
    function single(question) {
        // console.log(question.userId);
        return {
            _id: question._id,
            title: question.title,
            question: question.question,
            vote: {
                up: question.vote_count.upvote,
                down: question.vote_count.downvote
            },
            category: question.categoryName,
            user: (question.userId ? {
                _id: question.userId._id,
                username: question.userId.username,
                first_name: question.userId.first_name,
                last_name: question.userId.last_name,
                profile_image: question.userId.profile_image,
                is_verified: question.userId.is_verified,
            } : {
                _id: null,
                username: "[deleted]",
                first_name: "[deleted]",
                last_name: "",
                profile_image: null
            }),
            tags: question.tags,
            posted_at: question.created_at,
            attachments: question.attachments,
            answers_count: question.answers_count,
            comments_count: question.comments_count,
        };
    }

    if (questions) {
        if (multiple)
            return questions.map(question => single(question));
        else
            return single(questions);
    } else {
        return null;
    }
}


module.exports.userQuestionSerializer = function(user) {
    if (user.question) {
        return user.question.map(ques => ({
            user: {
                _id: user.id,
                username: user.username,
                first_name: user.first_name,
                last_name: user.last_name,
                profile_image: user.profile_image,
                is_verified: user.is_verified
            },
            vote: {
                up: ques.vote_count.upvote,
                down: ques.vote_count.downvote
            },
            _id: ques._id,
            title: ques.title,
            question: ques.question,
            category: ques.categoryName,
            tags: ques.tags,
            attachments: ques.attachments,
            posted_at: ques.created_at,
            answers_count: ques.answers_count
        }));
    } else {
        return [];
    }
}

// module.exports.userBookmarksSerializer = function(user) {
//     if (user.bookmarks) {
//         return user.bookmarks.map(ques => ({
//             user: {
//                 _id: ques.user.id,
//                 username: ques.user.username,
//                 first_name: ques.user.first_name,
//                 last_name: ques.user.last_name,
//                 profile_image: ques.user.profile_image
//             },
//             vote: {
//                 up: ques.vote_count.upvote,
//                 down: ques.vote_count.downvote
//             },
//             _id: ques._id,
//             title: ques.title,
//             question: ques.question,
//             category: ques.categoryName,
//             tags: ques.tags,
//             attachments: ques.attachments,
//             posted_at: ques.created_at,
//             answers_count: ques.answers_count
//         }))
//     } else {
//         return [];
//     }
// }