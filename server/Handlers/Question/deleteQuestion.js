
const { Ques, Ans, User, Tag } = require("../../Models");

async function deleteQuestion(req, res){
let err = false;
const quesId = req.body.quesId;
const userId = req.user.id;
try{
        await Ques.deleteOne({id : quesId})
        const user = await User.findById(userId)
        user.questions.pull(new ObjectId(quesId))
        await user.save();
  }
  catch(err){
          err = true;
          console.log("err while deleting question ", err);
  }
  finally{
          return res.send({err: err})
  }

}
async function deleteAnswer(req, res){
        let err = false;
        const ansId = req.body.ansId;
        const userId = req.user.id;
        try{
                await Ans.deleteOne({id : ansId})
                const user = User.findById(userId)
                user.answers.pull(new ObjectId(ansId))
                user.save();
          }
          catch(err){
                  err = true;
                  console.log("err while deleting question ", err);
          }
          finally{
                  return res.send({err: err})
          }
        
        }

module.exports = {deleteQuestion, deleteAnswer}