const { Ques, Ans, User, Tag, Comment } = require("../../Models");
const {getArrayOfAns} = require("./utilis")


module.exports.getCommentsByAnswerId = async (req, res) => {

    try{
        const userId = req.user.id;
        const answerId = req.body.answerId;
        const obj = {
            path: 'userId',
            model: User,
            options: {
                select: 'username first_name last_name'
            },
        }
        let data = ""
        let err = false;
        comments = await Comment.find({answerId : answerId}).populate(obj).exec()
        
        data = getArrayOfAns(comments, "comment"); 
        
        }
        catch(err){
            console.log("err in getting comments");
            err = true;
        }
        finally{
            return res.send({data, err});
        }

}