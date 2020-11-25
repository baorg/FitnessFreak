
const { Ques, Ans, User, Tag } = require("../../Models");

function getArrayOfQues(arr) {
    return arr.map((ques) => ({
        id: ques.question._id,
        title: ques.question.title,
        question: ques.question.question,
        category: ques.question.categoryName,
        user: {
            _id : ques._id,
            username : ques.username, 
        },
        created_at: ques.question.created_at
    }));
}

function questionsByMe(userId){

    User.findById(userId, "username first_name last_name").populate({
        path: 'question',
        model: Ques,
        options: {
            select: 'title question categoryName created_at'
        },
    }).exec((err, questions) => {
        if (err) {
            console.error(err);
            return ({ err: "Some error occured." });
        } else {
            return ({ questions: getArrayOfQues(questions), isAuthenticated: true });
        }
    })


}
function notValid(){

    return {err : "notValid"};
}
function getHandlerForTheAskedType(name){

    switch(name){

        case "questionsByMe" : return questionsByMe;
        
        default : notValid;
    }

}


module.exports.getTypeOfQuestionsHandler = function(req, res){

    const name = req.params.name;
    const userId = req.user.id;

    console.log("typeofQues = ", name)
    const fun = getHandlerForTheAskedType(name);

    const result = fun(userId)
    
    return res.send(result);
}