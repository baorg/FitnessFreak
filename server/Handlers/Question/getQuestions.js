const CLIENT_LOGIN_PAGE_URL = process.env.CLIENT_DOMAIN;
const CLIENT_HOME_PAGE_URL = `${CLIENT_LOGIN_PAGE_URL}/feed/app`;
const { isAuthenticated } = require("../../Middlewares");

const { Ques, Ans, User, Tag } = require("../../Models");
const { getArrayOfQues } = require("./utilis");

module.exports.getQuestionsHandler = function(req, res) {
    const userid = req.user.id;
    Ques.find({}, ).populate({
        path: 'userId',
        model: User,
        options: {
            select: 'username first_name last_name'
        },
    }).exec((err, questions) => {
        if (err) {
            console.error(err);
            return res.send({ err: "Some error occured." });
        } else {
            res.send({ questions: getArrayOfQues(questions), isAuthenticated: true });
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

module.exports.getOneQuestionHandler = function(req, res) {
    const id = req.params.id;
    const obj = {
        path: 'userId',
        model: User,
        options: {
            select: 'username first_name last_name'
        },
    }

    Ques.find({ _id: id }).populate(obj).exec((err, ques) => {
        if (err) return res.send({ err: err });

        // let obj = getCount(ques)
        res.send({ ques: getArrayOfQues(ques)[0] });
    })
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