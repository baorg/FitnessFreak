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


async function hotQuestions(obj, page, count, category = null) {
    let findQuery = category ? { categoryName: { $in: category } } : {};
    console.log('Find Query: ', findQuery);


    let query = Ques.find(findQuery,
        "title question created_at categoryName upDown vote_count", {
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
                if (x > y) return -1;
                if (x == y) return 0;
                return 1;
            });
            return ({
                data: getArrayOfQues(ques.slice((page - 1) * count, page * count)),
                err: false
            });
        })
        .catch((err) => ({ "err": err }));
}

async function latest(obj, page, count, category = null) {
    let findQuery = category ? { categoryName: { $in: category } } : {};
    console.log('Find Query: ', findQuery);


    let questions = await Ques.find(findQuery, "title question created_at categoryName vote_count", {
        sort: { created_at: -1 },
        limit: count,
        skip: (page - 1) * count,
    }).populate(obj).exec();
    return ({ data: getArrayOfQues(questions), err: false });
}

async function unanswered(obj, page, count, category = null) {

    console.log('Getting unanswered questions.');
    
    let findQuery = category ? { categoryName: { $in: category }, answers: { $size: 0 } } : { answers: { $size: 0 } };

    let questions = await Ques.find(findQuery,
        "title question created_at categoryName answers vote_count", {
            limit: count,
            skip: (page - 1) * count
        }).populate(obj).exec();
    return ({ data: getArrayOfQues(questions), err: false });
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
    let { page = 1, selectedCategories = null } = req.query;
    let category = selectedCategories === null ? null : selectedCategories.split(',');


    const obj = {
        path: 'userId',
        model: User,
        options: {
            select: 'username first_name last_name profile_image'
        },
    }

    const fun = getHandlerForTheAskedType(name);

    const page_size = 20;

    const promise = fun(obj, page, 20, category);

    promise.then((response) => {
            // console.log("response = ", response)
            return res.send({ questions: response.data, isAuthenticated: true, success: true });
        })
        .catch((err) => {
            console.log("error in getting type of ques");
            return { questions: [], isAuthenticated: true, success: false }
        })

}