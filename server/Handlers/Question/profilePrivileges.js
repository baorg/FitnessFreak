const { Ques, Ans, User, Tag } = require("../../Models");

function getArray(arr, page){
    
    const user = {_id : arr._id,
        username : arr.username}
    return arr[page].map((ques) => ({
        _id: ques._id,
        title: ques.title,
        question: ques.question,
        category: ques.categoryName,
        user: user,
        posted_at: ques.created_at
    }));
}

async function getBookMarks(userId, obj){

console.log("get Bookmarks")
    const promise = User.findById(userId, 'username first_name last_name').populate(obj).exec()
    return response = promise.then((ques) => {
        console.log("bookmarks = ", ques);
        return {question : getArray(ques, obj.path) }

    })
    .catch((err) => ({err : err}));

}



async function answers(userId){
    
    const obj = {
        path: "answer",
        populate :{
            path : "quesId",
            model : Ques,
            select: 'title question created_at categoryName'
        },
        model: Ans,
        options: {
            select: 'userId'
        },
    }

    const promise = User.findById(userId, 'username first_name last_name').populate(obj).exec()
    return response = promise.then((ques) => {
        
        const user = {userId : ques._id, username : ques.username}
        return ques.answer.map((question) => ({

            _id: question.quesId_id,
            title: question.quesIdtitle,
            question: question.quesIdquestion,
            category: question.quesIdcategoryName,
            user: user,
            posted_at: question.quesIdcreated_at

        })
        )

    })
    .catch((err) => ({err : err}));

}

module.exports.profilePrivileges = function(req, res){

    const name = req.params.name;
    const userId = req.user.id;
    console.log("privilege name" , name)
    let promise;
    if(name !== "answer"){
    const obj = {
        path: name,
        model: Ques,
        options: {
            select: 'title question created_at categoryName'
        },
    }
    promise = getBookMarks(userId, obj);
    // promise.then((response) => {
    //     return res.send(response);
    // })
    }
    else{
        promise = answers(userId);
    //     promise.then((response) => {
    //         return res.send(response);
    // })
        }

        promise.then((response) => {
            return res.send(response);
    })
    
}