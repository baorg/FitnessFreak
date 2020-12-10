const { Ques, Ans, User, Tag } = require("../../Models");
const {getArrayOfAns} = require("./utilis");

module.exports.getAnswersByQuesId = async (req, res)=>{

    let data = ""
    let err = false;
    try{
    const userId = req.user.id;
    const quesId = req.body.quesId;
    const obj = {
        path: 'userId',
        model: User,
        options: {
            select: 'username first_name last_name'
        },
    }
    
    const answers = await Ans.find({quesId : quesId}).populate(obj).exec()
    console.log("answers=",answers);
    data = getArrayOfAns(answers, "answer"); 
    
    }
    catch(err){
        console.log("err in getting answers");
        err = true;
    }
    finally{
        return res.send({data, err});
    }
}