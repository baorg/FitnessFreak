
const { Ques, Ans, User, Tag } = require("../../Models");
const { getArrayOfQues } = require("./utilis");
// function getArrayOfQues(arr) {
//     return arr.map((ques) => ({
//         id: ques.question._id,
//         title: ques.question.title,
//         question: ques.question.question,
//         category: ques.question.categoryName,
//         user: {
//             _id : ques._id,
//             username : ques.username, 
//         },
//         created_at: ques.question.created_at
//     }));
// }

// function questionsByMe(userId){

//     User.findById(userId, "username first_name last_name").populate({
//         path: 'question',
//         model: Ques,
//         options: {
//             select: 'title question categoryName created_at'
//         },
//     }).exec((err, questions) => {
//         if (err) {
//             console.error(err);
//             return ({ err: "Some error occured." });
//         } else {
//             return ({ questions: getArrayOfQues(questions), isAuthenticated: true });
//         }
//     })


// }
function notValid(){

    return {err : "notValid"};
}

function likes(ques){

    let arr  = ques.upDown;

    let count = 0;
    arr.forEach((ele) => {

        if(ele.value > 0)
            count++;
    })

    return count;
    
}
async function hotQuestions(obj){
    console.log("inside hot ")
    const query = Ques.find({}, "title question created_at categoryName upDown").populate(obj)
    const promise = query.exec()
    return response = promise.then( (ques) =>{
        console.log("find Ques")
        ques.sort( (a, b) => {

            const x = likes(a);
            const y = likes(b);

            return x > y;
        })
        
        return ({questions : getArrayOfQues(ques)});
    
})
}
async function latest(obj){

    Ques.find({}, "title question created_at categoryName").populate(obj)
    .exec(function(err, ques) {

        if(err)
            return {err : err}
        ques.sort(function(a, b) {
            return a.created_at > b.created_at
        })
        return {questions : getArrayOfQues(ques)}
    })
}

async function unanswered(obj){

    Ques.find({answers : []}, "title question created_at categoryName").populate(obj).exec(function(err, ques) {

        if(err)
            return {err : err}
        return {questions : getArrayOfQues(ques)};
    })

}
function getHandlerForTheAskedType(name){
   
    switch(name){

        case "hot-questions" : return hotQuestions;
        case "unanswered"    : return unanswered;
        case "latest"        : return latest;
        
        default : return notValid;
    }

}


module.exports.getTypeOfQuestionsHandler = function(req, res){

    const name = req.params.name;
    const obj = {
        path: 'userId',
        model: User,
        options: {
            select: 'username first_name last_name'
        },
    }
    
    const fun = getHandlerForTheAskedType(name);

    const promise = fun(obj)
    
    promise.then((response) => {
        console.log("response = ", response)
        return res.send(response)
    })
    
}

