const { User, Ques } = require('../../Models');


function serializeQuestions(user) {
    return user.question.map(ques => ({

        user: {
            _id: user.id,
            username: user.username,
            first_name: user.first_name,
            last_name: user.last_name,
            profile_image: user.profile_image
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
        posted_at: ques.created_at
    }));
}

async function getQuestionOfUser(req, res) {
    let { page = 1, user_id } = req.query;
    let page_size = 10;

    let user = await User.findOne({ _id: user_id }, { question: { $slice: [page * page_size, page_size] } })
        .select('question first_name last_name username profile_image')
        .populate({
            path: 'question',
            model: Ques,
            select: 'vote_count title question categoryName tags attachments created_at'
        })
        .exec();

    let questions = serializeQuestions(user);
    return res.send({ questions });

}

function getAnswersOfUser(req, res) {
    let { page = 1, user_id } = req.query;

    console.log('Page: ', page, '\nUser Id: ', user_id, '\n');

    return res.send({ answers: [] });

}


module.exports = { getQuestionOfUser, getAnswersOfUser };