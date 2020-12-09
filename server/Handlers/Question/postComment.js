
const { Ques, User, Ans, Comment } = require("../../Models");

function setResult(result, err){
    result.isAuthenticated = false;
    result.err = err;
}
module.exports.postComment = async (req, res) => {

    const answerId = req.body.answerId;
    const userId = req.user.id;
    const comment = req.body.comment;

    const result = {isAuthenticated : true, err : false}
    const saveComment = new Comment({
        comment : comment,
        userId : userId,
        vote_count: {},
        upDown: []
    })

    try{
    const CommentSave = await saveComment.save() 
    const AnsUpdate = await Ans.updateOne({ _id: answerId }, { $push: { comments: saveComment } }).exec();
    }
    catch(err){
        setResult(result, err);
    }
    finally{
        return res.send(result);
    }
    
    // Comment.save((err) => {

    //     if(err)
    //     {
    //         console.log("err in saving comment ", err);
    //         setResult(result, err);
    //         return res.send(result)
    //     }

    //     const promise = Ans.updateOne({ _id: answerId }, { $push: { comments: comment } }).exec();
    //     promise.then(() => res.send(result))
    //     .catch((err) => {
    //         setResult(result, err);
    //         return res.send(result);
    //     }) 

    // })

    
}