const { Ques, Ans, User, Tag } = require("../../Models");
module.exports.getAnswersByUserOnly = async (req, res)=>{
    const { Ques, Ans, User, Tag } = require("../../Models");
    let data = []
    let err = false;
    try{
    // const userId = req.user.id;

    const quesId = req.params.quesId;
    const userId = req.body.id;
    const obj = {
        path: 'answer',
        model: Ans,
        match :{quesId : quesId}
        // options: {
        //     select: 'username first_name last_name'
        // },
    }
    
    const user = await User.findById(userId, "username answer").populate(obj).exec();
    const UserDetails = {_id : userId, username : user.username}
    data= user.answer.map((ans) => ({
        _id: ans._id,
        answer: ans.answer,
        user: UserDetails,
        vote_count: ans.vote_count,
        upDown: ans.upDown
        })
    )

    // data =  {user : UserDetails, answer : user.answer}
    // err =  false
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