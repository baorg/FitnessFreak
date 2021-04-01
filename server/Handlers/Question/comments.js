const { Ques, User, Comment } = require("../../Models");
const { createNotification } = require('../Notifications/helpers');
const { commentsSerializer } = require('../../Serializers/Comments');

async function getComments(req, res, next){

    let data = []
    let err = false;
    let user_id = req.user?req.user._id:null;

    try {
        // const userId = req.user.id;
        const { question_id } = req.query;
        const obj = {
            path: 'userId',
            model: User,
            options: {
                select: 'username first_name last_name'
            },
        }

        let question = await Ques.findOne({ _id: question_id }, 'comments')
            .populate('comments.userId').exec();
        let comments = question.comments;
        
        res.data.success = true;
        res.data.comments = commentsSerializer(comments, user_id);
    } catch (err) {
        console.error("ERROR:", err);
        res.data.success = false;
        res.data.error = 'Some internal error.';
    } finally {
        return next();
    }
}


async function postComment(req, res, next){

    const userId = req.user.id;
    const questionId = req.body.question_id;
    const comment = req.body.comment;

    // const result = { isAuthenticated: true, err: false }
    const saveComment = new Comment({
        comment: comment,
        userId: userId,
        vote_count: {},
        upDown: [],
        questionId: questionId
    })

    try {
        // const CommentSave = await saveComment.save()
        const QuesUpdate = await Ques.updateOne({ _id: questionId }, { $push: { comments: saveComment } }).exec();

        console.log('Question update: ', QuesUpdate);

        let ques_user = await Ques.findOne({ _id: questionId }, 'userId').exec();
        ques_user = ques_user.userId;
        

        await createNotification(ques_user, userId, 5, questionId);

        res.data.success = true;
        res.data.is_saved = true;
        res.data.comment = {
            _id: saveComment._id,
            comment: saveComment.comment,
            vote_count: saveComment.vote_count,
            voted: {
                user: req.user._id,
                value: 0
            },
            user: {
                _id: req.user._id,
                username: req.user.username,
                first_name: req.user.first_name,
                last_name: req.user.last_name
            }
        }
    } catch (err) {
        console.error('ERROR: ', err);
        res.data.success = false;
        res.data.error = 'Some internal error.';
        res.data.is_saved = false;
    } finally {
        return next();
    }
}

async function deleteComment(req, res, next){
    let ques_id = req.body.question_id;
    let comment_id = req.body.comment_id;
    let user_id = req.user._id.toString();

    // console.log(ques_id, ' | ', comment_id, ' | ', user_id);

    try{
        let comment_del = await Ques.updateOne({_id: ques_id}, {
            $pull: {
                comments: {
                    _id: comment_id,
                    userId: user_id
                }
            }
        });
        // console.log('Comment Del: ', comment_del);

        if(comment_del.nModified){
            res.data.deleted = true;
            res.data.success = true;
        }else{
            res.data.success = false;
            res.data.error = 'Data not present.';
        }
    }catch(err){
        console.error('Error: ', err);
        res.data.error = 'Some internal error.';
        res.data.success = false;
    }finally{
        return next();
    }
}

async function handleVoting(user, question_id, comment_id, value){
    let error = "Some internal error.";
    let vote = {userId: user, value: value};
    let vote_count = {upvote: 0, downvote: 0};
    let success;

    try{
        let question = await Ques.findOne({_id: question_id}).exec();
        let comment=null, comment_index=-1;

        if(question===null){
            error = "Invalid question-id";
            throw Error(error);
        }
        
        for(var i=0;i<question.comments.length;i++){
            if(question.comments[i].id === comment_id){
                comment = question.comments[i];
                comment_index = i;
                break;
            }
        }

        if(comment===null){
            error = "Invalid comment-id";
            throw Error(error);
        }

        let vote_index = comment.upDown.findIndex(vote=>vote.userId.toString()===user.id.toString());

        { /*
        if(vote_index===-1){
            comment.upDown.push({
                userId: user._id,
                value: value
            });
            vote_index = comment.upDown.length-1;
            switch(value){
                case +1:
                    comment.vote_count.upvote++;
                    break;
                case -1:
                    comment.vote_count.downvote++;
                    break;
                default:
                    break;
            }
        }else{
            switch(comment.upDown[vote_index].value){ // previoius value
                case -1:
                    switch(value){  // current value
                        case -1:
                            break;
                        case 0:
                            comment.vote_count.downvote--;
                            break;
                        case 1:
                            comment.vote_count.downvote--;
                            comment.vote_count.upvote++;
                            break;
                    }
                    break;
                
                case 0:
                    switch(value){  // current value
                        case -1:
                            comment.vote_count.downvote++;
                        case 0:
                            break;
                        case 1:
                            comment.vote_count.upvote++;
                            break;
                    }
                    break;
                
                case +1:
                    switch(value){  // current value
                        case -1:
                            comment.vote_count.upvote--;
                            comment.vote_count.downvote++;
                        case 0:
                            comment.vote_count.upvote--;
                            break;
                        case +1:
                            break;
                    }
                    break;
            }
            comment.upDown[vote_index].value = value;
        }
        */}


        if(vote_index===-1){
            comment.upDown.push({
                userId: user._id,
                value: value
            });
            vote_index = comment.upDown.length-1;
        }else{
            comment.upDown[vote_index].value = value;
        }

        let upvote=0, downvote=0;
        comment.upDown.forEach((vote)=>{
            switch(vote.value){
                case -1:
                    downvote++;
                    break;
                case +1:
                    upvote++;
                    break;
                default: 
                    break;
            }
        });
        comment.vote_count = { upvote, downvote };

        question.comments[comment_index] = comment;
        question = await question.save();

        success = true;
        vote = question.comments[comment_index].upDown[vote_index];
        vote_count = question.comments[comment_index].vote_count;
        error = null;

    } catch(err) {
        console.error('Error: ', err);
        success = false;
        vote = null;
    } finally {
        return {success, vote, error, vote_count};
    }
}


async function upvoteComment(req, res, next){
    
    let user = req.user;
    let question_id = req.query.question_id;
    let comment_id = req.query.comment_id;

    let { success, vote, error, vote_count } = await handleVoting(user, question_id, comment_id, +1);

    res.data.success = success;
    res.data.error = error;
    res.data.vote = vote;
    res.data.vote_count = vote_count;

    return next();
}

async function downvoteComment(req, res, next){
    let user = req.user;
    let answer_id = req.query.answer_id;
    let comment_id = req.query.comment_id;

    let { success, vote, error, vote_count } = await handleVoting(user, answer_id, comment_id, -1);

    res.data.success = success;
    res.data.error = error;
    res.data.vote = vote;
    res.data.vote_count = vote_count;

    return next();
}


async function unvoteComment(req, res, next){
    let user = req.user;
    let answer_id = req.query.answer_id;
    let comment_id = req.query.comment_id;

    let { success, vote, error, vote_count } = await handleVoting(user, answer_id, comment_id, 0);

    res.data.success = success;
    res.data.error = error;
    res.data.vote = vote;
    res.data.vote_count = vote_count;
    return next();
}


module.exports = {
    getComments,
    postComment,
    deleteComment,
     
    upvoteComment,
    downvoteComment,
    unvoteComment
};