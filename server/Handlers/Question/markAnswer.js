const { Ques, Ans, User, Tag } = require("../../Models");
const { isSameUser, addScore } = require("./utilis");
const {score} = require('../../config')
const markAnswer = async (req, res) => {

   let err = false;
   try{
    const quesId = req.body.quesId;
    const answerId = req.body.answerId;
    const ques = await Ques.findByIdAndUpdate(quesId, {'$set' : {satisfied : true}}).exec();
    const answer = await Ans.findByIdAndUpdate(answerId, {'$set' : {marked : true}}).exec();

    console.log("answer in mark ", answer)
    const user = await User.findById(answer.userId);
    addScore(user, "totalScore", score.satisfactoryAnswer)
    user.save();
   }
   catch(err){
    console.log("error in marking ", err);
    err = true;
   }
   finally{
    return res.send(err)
   }

}

const isQuestionAskedByUser = async(req, res) =>{
    let data = false;
    let err = false;
    try{
    const user = await isSameUser(req.body.quesId, req.user.id);
    const ques = await Ques.findById(req.body.quesId, "satisfied");
    if(user && !ques.satisfied) 
        data = true;
    }
    catch{
        err = true;
    }
    finally{
        return res.send({data, err});
    }

}

module.exports = {markAnswer, isQuestionAskedByUser}