const CLIENT_LOGIN_PAGE_URL = process.env.CLIENT_DOMAIN;
const CLIENT_HOME_PAGE_URL = `${CLIENT_LOGIN_PAGE_URL}/feed/app`;
const { format_response } = require('../utilis');
const { Ques, Comment } = require("../../../Models");
const { Ans } = require("../../../Models");


function getModel(flag) {
    if (flag == 2)
        return Comment;
    return (flag) ? Ques : Ans;
}
module.exports = function(req, res, next) {
    const userId = req.user.id;
    const quesId = req.body.quesId;
    const isQues = req.body.isQues;


    const model = getModel(isQues)
    const query = model.findById(quesId, 'upDown');

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
            format_response(res, result, true);
            return next();
        })
        .catch((err) => {
            format_response(res, {}, false);
            return next();
        });
}