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
        'title question userId created_at tags categoryName attachments vote_count', { skip: (page - 1) * page_size, limit: page_size }
    ).populate({
        path: 'userId',
        model: User,
        options: {
            select: 'username first_name last_name'
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


// function getCount(ques) {
//     let arr = ques.upDown;
//     let upCount = 0;
//     let downCount = 0;
//     for (let i = 0; i < arr.length; i++) {
//         if (arr[i].value == 1)
//             upCount++;
//         else
//             downCount++;
//     }

//     let obj = {
//         answers: ques.answers,
//         upCount: upCount,
//         downCount: downCount,
//         question: {
//             title: ques.title,
//             question: ques.question,
//             posted_at: ques.created_at,
//             tags: ques.tags,
//             categories: ques.categoryName,
//             attachments: ques.attachments
//         }
//     }
//     return obj;
// }

module.exports.getOneQuestionHandler = function(req, res, next) {
    let ques_id = req.params.ques_id;

    const obj = {
        path: 'userId',
        model: User,
        options: {
            select: 'username first_name last_name'
        },
    }

    Ques.findById(ques_id,
        'title question userId created_at tags categoryName attachments vote_count'
    ).populate(obj).exec((err, ques) => {
        if (err) {
            console.error('ERROR:', err);
            res.data.success = false;
            res.data.error = "Some internal error occured.";
            return next();
        }

        // let obj = getCount(ques)
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
            select: 'username'
        })
        .select('id vote_count title question categoryName userId tags created_at')
        .exec();

    serialized_data = feedQuestionSerializer(question);
    return res.send({
        isAuthenticated: req.isAuthenticated(),
        question: serialized_data
    });
}