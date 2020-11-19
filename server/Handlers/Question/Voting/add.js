const CLIENT_LOGIN_PAGE_URL = "http://localhost:3000";
const CLIENT_HOME_PAGE_URL = "http://localhost:3000/feed/app";
const { Ques } = require("../../../Models");
const { Ans} = require("../../../Models");

module.exports = function(req, res) {
    const userId = req.user.id;
    const quesId = req.body.quesId;
    const isQues = req.body.isQues;

    let query;
    if(isQues)
    query =  Ques.findById(quesId, 'upDown');
    else
    query =  Ans.findById(quesId, 'upDown');

    const promise = query.exec();
    promise.then((ques) => {
            console.log("updown = ", ques.upDown);
            let arr = ques.upDown;
            console.log("arr = ", arr);
            let index = arr.findIndex((element) => element.userId === userId);
            let result = { upvote: false, downvote: false };
            if (index != -1) {
                if (arr[index].value == 1)
                    result.upvote = true;
                else
                    result.downvote = true;
            }
            return res.send(result);  
    })
    .catch ((err) => {
        return res.send({ err: err });
    })
}