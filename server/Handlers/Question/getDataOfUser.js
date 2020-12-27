const { User, Ques, Ans } = require('../../Models');
const { QuestionSerializers, AnswerSerializers } = require('../../Serializers');
async function getQuestionOfUser(req, res, next) {
    let { page = 1, user_id } = req.query;
    let page_size = 10;

    let user = await User.findById(user_id, {
            question: { $slice: [(page - 1) * page_size, page * page_size] },
            first_name: 1,
            last_name: 1,
            username: 1,
            profile_image: 1
        })
        .populate({
            path: 'question',
            model: Ques,
            select: 'vote_count title question categoryName tags attachments created_at answers_count'
        })
        .exec();

    if (user) {
        let questions = QuestionSerializers.userQuestionSerializer(user);
        res.data.success = true;
        res.data.questions = questions;
    } else {
        res.data.success = false;
        res.data.error = 'Invalid user_id';
    }
    return next();

}

async function getAnswersOfUser(req, res, next) {
    let { page = 1, user_id } = req.query;
    let page_size = 10;
    let user = await User.findById(user_id, {
            answer: { $slice: [(page - 1) * page_size, page * page_size] },
            first_name: 1,
            last_name: 1,
            username: 1,
            profile_image: 1
        })
        .populate({
            path: 'answer',
            model: Ans,
            select: 'vote_count answer quesId marked',
            populate: [{
                path: 'quesId',
                model: Ques,
                select: 'title created_at vote_count tags categoryName attachments answers_count',
                populate: {
                    path: 'userId',
                    model: User,
                    select: 'username first_name last_name profile_image'
                }
            }, {
                path: 'userId',
                model: User,
                select: 'username first_name last_name profile_image'
            }]
        })
        .exec();

    if (user) {
        // let questions = userQuestionSerializer(user);
        res.data.success = true;
        res.data.answers = AnswerSerializers.userAnswerSerializer(user);
    } else {
        res.data.success = false;
        res.data.error = 'Invalid user_id';
    }
    return next();


}


module.exports = { getQuestionOfUser, getAnswersOfUser };