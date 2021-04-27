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


async function getBookmarksOfUser(req, res, next) {
    let { page = 1, user_id } = req.query;

    let page_size = 10;

    let user = await User.findById(user_id, {
            bookmarks: { $slice: [(page - 1) * page_size, page * page_size] },
            first_name: 1,
            last_name: 1,
            username: 1,
            profile_image: 1
        })
        .populate({
            path: 'bookmarks',
            model: Ques,
            select: 'vote_count title question categoryName tags attachments created_at answers_count userId',
            populate: {
                path: 'userId',
                model: User,
                select: 'username first_name last_name profile_image'
            }
        })
        .exec();

    if (user) {
        // console.log(user.bookmarks);
        let bookmarks = QuestionSerializers.feedQuestionSerializer(user.bookmarks, many = true);
        res.data.success = true;
        res.data.questions = bookmarks;
    } else {
        res.data.success = false;
        res.data.error = 'Invalid user_id';
    }
    return next();
}

async function getAnswersOfUser(req, res, next) {
    let { page = 1, user_id } = req.query;
    let page_size = 10;

    console.log(page, user_id);

    let answers = await Ans.find({ userId: user_id })
        .populate([{
            path: 'quesId',
            model: Ques,
            select: 'title question created_at vote_count tags categoryName attachments answers_count',
            populate: {
                path: 'userId',
                model: User,
                select: 'username first_name last_name profile_image'
            }
        }, {
            path: 'userId',
            model: User,
            select: 'username first_name last_name profile_image'
        }])
        .limit(page_size)
        .skip(page_size * (page - 1))
        .exec();

    console.log("answers: ", answers);

    if (answers) {
        // let questions = userQuestionSerializer(user);
        res.data.success = true;
        res.data.answers = AnswerSerializers.answerSerializer(answers, req.user, true, true)
    } else {
        res.data.success = false;
        res.data.error = 'Invalid user_id';
    }
    return next();
}





module.exports = { getQuestionOfUser, getAnswersOfUser, getBookmarksOfUser };





// .select(['username', 'first_name', 'last_name', 'profile_image', 'answer'])