
const { Ques, Ans, User, Tag } = require("../../Models");

console.log("git pull conflict")
async function deleteQuestion(req, res){
let err = false;
const quesId = req.body.quesId;
const userId = req.user.id;
try{
        await Ques.findByIdAndDelete(quesId).exec()
        const user = await User.findById(userId)
        user.question.pull(quesId)
        await user.save();
  }
  catch(error){
          err = true;
          console.log("err while deleting question ", error);
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
                await Ans.findByIdAndDelete(ansId).exec()
                const user =await User.findById(userId)
                user.answer.pull(ansId)
                await user.save();
          }
          catch(error){
                  err = true;
                  console.log("err while deleting answer ", error);
          }
          finally{
                  return res.send({err: err})
          }
        
        }

async function deleteComment(req, res){
        let err = false;
        const commentId = req.body.commentId;
        
        try{
                await Comment.findByIdAndDelete(commentId).exec();
                
                }
                catch(err){
                        err = true;
                        console.log("err while deleting Comment ", error);
                }
                finally{
                        return res.send({err: err})
                }
        
        }
            

module.exports = {deleteQuestion, deleteAnswer, deleteComment}