function getArrayOfQues(arr) {
    return arr.map((ques) => ({
        id: ques._id,
        title: ques.title,
        question: ques.question,
        category: ques.categoryName,
        user: ques.userId,
        created_at: ques.created_at
    }));
}

module.exports = { getArrayOfQues }