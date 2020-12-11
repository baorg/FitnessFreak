const { Ques, Ans, User, Tag } = require("../../Models");
module.exports.getAnswersByQuesId = async (req, res)=>{

    let data = {user : "", answer : []}
    let err = false;
    try{
    // const userId = req.user.id;
    const quesId = req.params.quesId;
    const userId = req.user.id;
    const obj = {
        path: 'answer',
        model: User,
        match :{quesId : quesId},
        options: {
            select: 'username first_name last_name'
        },
    }
    
    const user = await User.findById(userId, "username").populate(obj).exec();
    const User = {userId : userId, username : user.username}
    // return user.answers.map((ans) => ({
    //     _id: ans._id,
    //     answer: ans.answer,
    //     user: User,
    //     vote_count: ans.vote_count,
    //     upDown: ans.upDown
    //     })
    // )

    data =  {user : User, answer : user.answers}
    err =  false
    }
    catch(err){
        console.log("err in getting answers by user only");
        console.log(err);
        err = true;
    }
    finally{
        return res.send({data, err});
    }
}