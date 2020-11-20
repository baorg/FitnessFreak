const CLIENT_LOGIN_PAGE_URL = "http://localhost:3000";
const CLIENT_HOME_PAGE_URL = "http://localhost:3000/feed/app";
const { isAuthenticated } = require("../../Middlewares");

const { Ques, Ans, User, Tag } = require("../../Models");
const { getArrayOfQues } = require("./utilis");

module.exports.getQuestionsHandler = function(req, res) {
    const userid = req.user.id;
    Ques.find({}, ).populate({
        path: 'userId',
        model: User,
        options: {
            select: 'userName firstName lastName'
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


function getCount(ques){

    let arr = ques.upDown;
    let count = 0;
    for(let i = 0; i < arr.length; i++){
            count += arr[i].value;
    }

    let obj = {
        answers : ques.answers,
        upDownCount : count,
        question : {
            title : ques.title,
            question : ques.question
        }   
    }

    return obj;

}
module.exports.getOneQuestionHandler = function(req, res) {
    const id = req.params.id;
    Ques.findById(id).populate("answers").exec((err, ques) => {
        if (err) return res.send({ err: err });

        let obj = getCount(ques)
        res.send({ ques: obj });
    })
}