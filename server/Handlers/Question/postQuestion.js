const CLIENT_LOGIN_PAGE_URL = "http://localhost:3000";
const CLIENT_HOME_PAGE_URL = "http://localhost:3000";
const { Ques, User } = require("../../Models");

module.exports = function(req, res) {

    const user_id = req.user.id;
    const category = req.body.category;
    const tags = req.body.tags;
    const question = req.body.question;
    const title = req.body.title;

    const ques = new Ques({
        title: title,
        question: question,
        upDown: [],
        answers: [],
        // categoryName: category,
        userId: user_id,
        tags: tags,
        created_at: new Date(Date.now())
    });

    console.log('DATA from QUESTION:  ', question);

    return res.send({ data: 'recieved' });

    // ques.save(err => {
    //     if (err) return res.redirect(CLIENT_LOGIN_PAGE_URL);
    //     User.findById(user_id).exec((err, user) => {
    //         user.question.push(ques._id);
    //         user.save(err => {
    //             if (err) return res.redirect(CLIENT_LOGIN_PAGE_URL)
    //             return res.redirect(CLIENT_HOME_PAGE_URL);
    //         });
    //     });
    // });
}