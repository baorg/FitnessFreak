const CLIENT_LOGIN_PAGE_URL = process.env.CLIENT_DOMAIN;
const CLIENT_HOME_PAGE_URL = `${CLIENT_LOGIN_PAGE_URL}/feed/app`;
const { isAuthenticated } = require("../../Middlewares");

const { Ques, Ans, User, Tag } = require("../../Models");
const { QuestionSerializers } = require('../../Serializers');

module.exports.getQuestionsHandler = function(req, res, next) {
    const page_size = 20;
    let { page = 1 } = req.query;
    // let userid = req.user.id;

    return Ques.find({},
        'question userId created_at tags categoryName vote_count answers_count comments_count', { skip: (page - 1) * page_size, limit: page_size }
    ).populate({
        path: 'userId',
        model: User,
        options: {
            select: 'username first_name last_name is_verified'
        },
    }).exec((err, questions) => {
        if (err) {
            console.error('ERROR:', err);
            res.data.success = false;
            res.data.error = "Some internal error occured.";
            return next();
        } else {
            res.data.success = false;
            res.data.questions = QuestionSerializers.feedQuestionSerializer(questions, true);
            return next();
        }
    });
}


module.exports.getOneQuestionHandler = function(req, res, next) {
    let ques_id = req.params.ques_id;

    const obj = {
        path: 'userId',
        model: User,
        options: {
            select: 'username first_name last_name is_verified'
        },
    }

    Ques.findById(ques_id,
        'question userId created_at tags categoryName vote_count answers_count comments_count'
    ).populate(obj).exec((err, ques) => {
        if (err) {
            console.error('ERROR:', err);
            res.data.success = false;
            res.data.error = "Some internal error occured.";
            return next();
        }

        // console.log('Question: ', ques);
        if (ques) {
            res.data.success = true;
            res.data.question = QuestionSerializers.feedQuestionSerializer(ques);
        } else {
            res.data.success = false;
            res.data.error = "Question not present";
        }
        return next();
    });
}

module.exports.getFeedQuestion = async function(req, res) {
    const { feedQuestionSerializer } = require('../../Serializers').QuestionSerializers;
    const id = req.query.id;

    question = await Ques.findOne({ _id: id })
        .populate({
            path: "userId",
            select: 'username is_verified'
        })
        .select('id vote_count title question categoryName userId tags created_at answers_count comments_count')
        .exec();

    serialized_data = feedQuestionSerializer(question);
    return res.send({
        isAuthenticated: req.isAuthenticated(),
        question: serialized_data
    });
}