module.exports = {
    updateQuestionComments
}

function updateQuestionComments() {
    // console.log('On update question: ', this);

    // let tmp = await Ques.aggregate([
    //     { _id: mongoose.Types.ObjectId(questionId) },
    //     {
    //         $project: {
    //             comments_count: { $size: '$comments' },
    //         }
    //     }
    // ]);
    // let comments_count = 0;
    // if (tmp.length > 0) {
    //     comments_count = tmp[0].comments_count;
    //     Ques.updateOne({_id: questionId}, {$set: {comments_count: }})
    // }
}