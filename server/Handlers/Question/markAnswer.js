const { Ques, Ans, User, Tag } = require("../../Models");
const { isSameUser } = require("./utilis");
const markAnswer = async (req, res) => {

   let err = false;
   try{
    const quesId = req.body.quesId;
    const answerId = req.body.answerId;
    const ques = await Ques.findById(quesId, {'$set' : {satisfied : true}}).exec();
    const answer = await Ans.findById(answerId, {'$set' : {marked : true}}).exec();
    const user = await User.findById(answer.userId);
    addScore(user, "totalScore", "satisfactoryAnswer")
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
    data = await isSameUser(req.body.quesId, req.user.id);
    }
    catch{
        err = true;
    }
    finally{
        return res.send({data, err});
    }

}

module.exports = {markAnswer, isQuestionAskedByUser}