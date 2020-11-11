 function getArrayOfQues(arr){


    let res = [];
    
    arr.forEach((ques) => {
        res.push({question : ques.question, id : ques._id})
    })

    return res;
}

module.exports = {getArrayOfQues}