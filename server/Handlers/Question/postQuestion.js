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
        let scoreUpdate = User.findById(user_id, "score").exec()
        scoreUpdate.then(async(user) => {

           
            // user.score.totalScore += score.question
            // console.log("category in postring answer , ",category)
            // console.log("score.question is  , ",score.question)

            // category.forEach((ele) => {
            //     console.log("ele = ",ele);
            //     console.log("typeofele = ", typeof ele)
            //     if(!(user.score.hasOwnProperty(ele)))
            //         user.score[ele] = 0
            //     console.log(`user.score${ele} = `, user.score[ele])
            //     user.score[ele] +=  score.question
            //     console.log("after user.score[ele] = ", user.score[ele])
            //     console.log("new user.score data is", user.score);
            // })
            // //deep copy
            // let obj = JSON.parse(JSON.stringify(user));
            // obj.score.totalScore += score.question
            // console.log("category in postring answer , ",category)
            // console.log("score.question is  , ",score.question)

            // category.forEach((ele) => {
            //     console.log("ele = ",ele);
            //     console.log("typeofele = ", typeof ele)
            //     if(!(obj.score.hasOwnProperty(ele)))
            //         obj.score[ele] = 0
            //     console.log(`user.score${ele} = `, obj.score[ele])
            //     obj.score[ele] +=  score.question
            //     console.log("after user.score[ele] = ", obj.score[ele])
            //     console.log("new user.score data is", obj.score);
            // })
             //deep copy
             let obj = JSON.parse(JSON.stringify(user.score));
             obj.totalScore += score.question
             console.log("category in postring answer , ",category)
             console.log("score.question is  , ",score.question)
 
             category.forEach((ele) => {
                 console.log("ele = ",ele);
                 console.log("typeofele = ", typeof ele)
                 if(!(obj.hasOwnProperty(ele)))
                     obj[ele] = 0
                 console.log(`user.score${ele} = `, obj[ele])
                 obj[ele] +=  score.question
                 console.log("after user.score[ele] = ", obj[ele])
                 console.log("new user.score data is", obj);
             })
            
            //  user.set("score",obj);
            // await User.updateOne({ _id: user_id }, { $set: { score: obj } }).exec();
            // await user.save((err) => {
            // console.log("saving user and obj", user, obj)
            // })

        })
        console.log('Question saved: ', questionSave, userUpdate, scoreUpdate);
        data = "question saved";
        isSaved = true;
    } catch (err) {
        console.log('[ERROR] ', __filename, err);
        data = "some error occured";
        isSaved = false;
    } finally {
        return res.send({
            isAuthenticated,
            data,
            isSaved
        });
    }
}