
const {createNotification} = require('../../Notifications/helpers');
const { Ques } = require("../../../Models");
const { Ans, Comment, User } = require("../../../Models");
const { addScore } = require("../utilis");
const { score } = require("../../../config/score");
// const User = require("../../../Models/User");

const format_response = require('../../utils/format_response');

function getModel(flag) {
    if (flag == 2)
        return Comment;
    return (flag) ? Ques : Ans;
}

function getIndex(arr, userId) {
    return (arr.findIndex((element) => element.userId === userId));
}

function isUpvoted(arr, index) {
    return arr[index].value == 1;
}

function isNotUndefined(down) {
    return down !== undefined;
}

function setData(arr, index, obj, typeOfValue) {
    if (isNotUndefined(typeOfValue)) {
        // obj.value = -obj.value
        arr.set(index, obj);
    } else
        arr.splice(index, 1);
}

function setVoteCount(ques, typeOfVote, typeOfValue) {
    // Decrease the voteCount whether its up or down initially
    ques.vote_count[typeOfVote]--;
    if (isNotUndefined(typeOfValue)) {
        const oppositeVote = typeOfVote === "upvote" ? "downvote" : "upvote";
        ques.vote_count[oppositeVote]++;
    }

}

module.exports = async function(req, res, next) {
    let data = "Your respnose has been submitted succesully";
    try {
        const userId = req.user.id;

        const quesId = req.body.quesId;
        const isQues = req.body.isQues;
        const up = req.body.up;
        const down = req.body.down;

        // let upvoted = false;
        // let downvoted = false;

        const model = getModel(isQues);
        const ques = await model.findById(quesId, 'upDown vote_count userId').exec();

        let arr = ques.upDown
        let index = getIndex(arr, userId);
        let value = (up === undefined) ? -1 : 1;
        let obj = { userId, value };

        //changes
        const whoPostedId = String(ques.userId);
        const name = isQues == 2 ? "upvoteOnComment" : "upvote";
        const property = isQues == 2 ? "Comment" : isQues ? "Question" : "Answer"
        let sign = value

        // if already in the array
        if (index != -1) {
            const typeOfValue = isUpvoted(arr, index) ? down : up;
            const typeOfVote = isUpvoted(arr, index) ? "upvote" : "downvote";
            //Adding Score to the database
            sign = isUpvoted(arr, index) ? -1 : 1;
            setData(arr, index, obj, typeOfValue, -1)
            setVoteCount(ques, typeOfVote, typeOfValue)
        }

        // if absent in the array
        else {
            arr.push(obj);
            const typeOfVote = (up === undefined) ? "downvote" : "upvote";
            ques.vote_count[typeOfVote]++;
        }

        let user = await User.findById(whoPostedId).exec();
        if (user && userId != whoPostedId) {
            addScore(user, "totalScore", sign * score[name])
            if (sign > 0) {
                // const username = await User.findUserByUserId(userId);
                // user.notifications.push(`${username} has upvoted your ${property}`);
                createNotification(user._id, userId, 4, quesId);
            }
            await user.save();
        }
        await ques.save()

        format_response(res, { success:true, is_saved: true, vote: ques.vote_count }, true);

    } catch (err) {
        console.error('ERROR  :', err);
        format_response(res, {success: false, vote: ques.vote_count }, false);
    } finally {
        return next();
    }
}