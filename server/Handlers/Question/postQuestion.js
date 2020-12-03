const CLIENT_LOGIN_PAGE_URL = "http://localhost:3000";
const CLIENT_HOME_PAGE_URL = "http://localhost:3000";
const { Ques, User } = require("../../Models");
const score = require("../../config").score;
module.exports = async function(req, res) {

    const user_id = req.user.id;
    const category = req.body.category;
    const tags = req.body.tags;
    const question = req.body.question;
    const title = req.body.title;

    const ques = new Ques({
        title: title,
        question: question,
        vote_count :{},
        upDown: [],
        answers: [],
        categoryName: category,
        userId: user_id,
        tags: tags,
        created_at: new Date(Date.now())
    });

    console.log('DATA from QUESTION:  ', question);

    // return res.send({ data: 'recieved' });
    let isAuthenticated = req.isAuthenticated();
    let data = "";
    try {
        let questionSave = await ques.save()
        let userUpdate = await User.updateOne({ _id: user_id }, { $push: { question: ques._id } }).exec();
        let scoreUpdate = await User.findById(user_id, "score").exec((err, user) => {

            user.score.totalScore += score.question
            category.forEach((ele) => {
                if(!user.score.hasOwnProperty(ele))
                    user.score[ele] = 0;
                user.score[ele] +=  score.question
            })
            

        })
        console.log('Question saved: ', questionSave, userUpdate, scoreUpdate);
        data = "question saved";
    } catch (err) {
        console.log('[ERROR] ', __filename, err);
        data = "some error occured";
    } finally {
        return res.send({
            isAuthenticated,
            data
        });
    }
}