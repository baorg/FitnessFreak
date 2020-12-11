const { Ques, Ans, User, Tag } = require("../../Models");
const Question = require("../../Models/Question");
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


async function notValid() {
    return { err: "notValid" };
}

function likes(ques) {
    let arr = ques.upDown;
    let count = 0;
    arr.forEach((ele) => {
        if (ele.value > 0)
            count++;
    });
    return count;
}


async function hotQuestions(obj, page, count) {
    let query = Ques.find({},
        "title question created_at categoryName upDown", {
            sort: {},
            limit: count,
            skip: (page - 1) * count
        }
    ).populate(obj)
    let promise = query.exec();
    return response = promise.then((ques) => {
            console.log("find Ques");
            ques.sort((a, b) => {
                const x = likes(a);
                const y = likes(b);
                return x > y;
            });
            return ({
                data: getArrayOfQues(ques.slice((page - 1) * count, page * count)), 
                err : false
            });
        })
        .catch((err) => ({ "err": err }));
}

async function latest(obj, page, count) {
    let questions = await Ques.find({}, "title question created_at categoryName", {
        sort: { created_at: -1 },
        limit: count,
        skip: (page - 1) * count,
    }).populate(obj).exec();
    return ({ data: getArrayOfQues(questions) , err : false });
}

async function unanswered(obj, page, count) {
    let questions = await Ques.find({
            answers: [],
        },
        "title question created_at categoryName", {
            limit: count,
            skip: (page - 1) * count
        }).populate(obj).exec();
    return ({ data: getArrayOfQues(questions), err : false });
}

function getHandlerForTheAskedType(name) {

    switch (name) {

        case "hot-questions":
            return hotQuestions;
        case "unanswered-questions":
            return unanswered;
        case "latest-questions":
            return latest;

        default:
            return notValid;
    }

}


module.exports.getTypeOfQuestionsHandler = function(req, res) {

    let name = req.params.name;
    let { page = 1 } = req.query;
    const obj = {
        path: 'userId',
        model: User,
        options: {
            select: 'username first_name last_name'
        },
    }

    const fun = getHandlerForTheAskedType(name);

    const page_size = 20;

    const promise = fun(obj, page, 20);

    promise.then((response) => {
        // console.log("response = ", response)
        return res.send(response);
    })
    .catch((err) => {
        console.log("error in getting type of ques");
        return {data : "", err : true}
    })

}