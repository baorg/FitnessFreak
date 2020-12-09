const CLIENT_LOGIN_PAGE_URL = "http://localhost:3000";
const CLIENT_HOME_PAGE_URL = "http://localhost:3000";
const { Ques, User } = require("../../Models");
const score = require("../../config").score; 

const addScore = require("./utilis").addScore;
module.exports = async function(req, res) {

        const user_id = req.user.id;
        const category = req.body.category;
        const tags = req.body.tags;
        const question = req.body.question;
        const title = req.body.title; 

        module.exports = async function(req, res) {

            let data = "";
            try {
                let user_id = req.user.id;
                let category = req.body.category;
                let tags = req.body.tags;
                let question = req.body.question;
                let title = req.body.title;
                let attachments = req.body.attachments;

                console.log("Attachments: ", attachments);
                console.log("Length: ", attachments.length);

                const ques = new Ques({
                    title: title,
                    question: question,
                    userId: user_id,
                    vote_count: {},
                    upDown: [],
                    answers: [],
                    categoryName: category,
                    tags: tags,
                    created_at: new Date(Date.now()),
                });
                attachments.forEach(val => {
                    ques.attachments.push({
                        url: val.url,
                        type_: 'image'
                    });
                })


                await ques.save()
                await User.updateOne({ _id: user_id }, { $push: { question: ques._id } }).exec();

                let user = await User.findById(user_id, "score").exec()
                addScore(user, "totalScore", score.question)
                category.forEach((ele) => {
                    addScore(user, ele, score.question)
                })
                await user.save()
                
                data = "question saved";
                isSaved = true;
            } catch (err) {
                console.error('[ERROR] ', __filename, err);
                data = "some error occured";
                isSaved = false;
            } finally {
                return res.send({
                    isAuthenticated: req.isAuthenticated(),
                    data,
                    isSaved
                });
            }
        }
    }