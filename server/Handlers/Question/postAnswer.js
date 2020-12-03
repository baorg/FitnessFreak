const CLIENT_LOGIN_PAGE_URL = "http://localhost:3000/auth";
const CLIENT_HOME_PAGE_URL = "http://localhost:3000/";
const { Ques, Ans, User } = require("../../Models");
const saveChanges = require("./utilis").saveChanges;
module.exports = function(req, res) {
    console.log('i am here')
    const userId = req.user.id;
    const quesId = req.body.quesId;
    const answer = req.body.answer;
    const name = "answer"
    const ans = new Ans({
        answer: answer,
        upDown: [],
        vote_count : {},
        comments: [],
        userId: userId,
        quesId: quesId
    });
    ans.save(err => {
        if (err) return res.send(CLIENT_LOGIN_PAGE_URL);
        else {
            User.findById(userId).exec((err, user) => {
                user.answer.push(ans._id);
                user.save(err => {
                    if (err) return res.send(CLIENT_LOGIN_PAGE_URL)
                    else {
                        Ques.findById(quesId).exec((err, ques) => {
                            ques.answers.push(ans._id);
                            ques.save(err => {
                                if (err) return res.redirect(CLIENT_LOGIN_PAGE_URL)
                                const promise = saveChanges(quesId, userId, 1, name)
                                .then((response) => res.send(CLIENT_HOME_PAGE_URL))
                                .catch((err) => res.redirect(CLIENT_LOGIN_PAGE_URL))
                            })
                        })
                    }
                })
            })
        }
    })
}