const { Ques, Ans, User, Tag } = require("../../Models");
const { getArrayOfQues } = require("./utilis");

async function getQuestions(obj, page, count, name) {

    const questions = await Ques.find({categoryName : name},
        {
        limit: count,
        skip: (page - 1) * count
        })
        .populate(obj).exec()
    return  getArrayOfQues(questions) ;
}

module.exports.getQuestionsCategoryWise = async function(req, res) {

    let data = [];
    let err = false;
    try{
    let name = req.params.name;
    let { page = 1 } = req.query;
    const obj = {
        path: 'userId',
        model: User,
        options: {
            select: 'username first_name last_name'
        },
    }

    const page_size = 20;

    data = await getQuestions(obj, page, 20, name)
    }
    catch(err){
        console.log("err in getting questions by category ->", err)
        err = true;
    }
    finally{
        return res.send({data, err});
    }

}