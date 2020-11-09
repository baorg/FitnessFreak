const findOrCreate = require("mongoose-findorcreate");
const mongoose = require("mongoose");


const commentSchema = new mongoose.Schema({
    comment : String,
    userId : {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});
const Comment = new mongoose.model("Comment", commentSchema);

const tagsSchema = new mongoose.Schema({

    tagname : String,
    quesId : {type: mongoose.Schema.Types.ObjectId, ref: 'Ques'},
});
const Tag = new mongoose.model("Tag", tagsSchema);


const answerSchema = new mongoose.Schema({
    upDown : [],
    answer : String,
    comments : [commentSchema],
    quesId : {type: mongoose.Schema.Types.ObjectId, ref: 'Ques'},
    userId : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
});
const Ans = new mongoose.model("Ans", answerSchema);

const quesSchema = new mongoose.Schema({
    upDown : [],
    question : String,
    answers : [{type: mongoose.Schema.Types.ObjectId, ref: 'Ans'}],
    categoryName : String,
    userId : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    tags : [String]
});
const Ques = new mongoose.model("Ques", quesSchema);


const userSchema = new mongoose.Schema({
    userName: String,
    firstName : String,
    lastName : String,
    createdAt : Date,
    googleId: String,
    facebookId : String,
    ProfileImage : String,
    question : [{type: mongoose.Schema.Types.ObjectId, ref: 'Ques'}],
    answer : [{type: mongoose.Schema.Types.ObjectId, ref: 'Ans'}],
    Bio : String,
    bookmarks : [{type: mongoose.Schema.Types.ObjectId, ref: 'Ques'}],
    followers : [String],
    following : [String],
    score : {totalScore : Number},
    notifications : [],
    attachments : [{url : String, type : String}]
});

userSchema.plugin(findOrCreate);
const User = new mongoose.model("User", userSchema);

module.exports = {

    User,
    Ans, 
    Ques,
    Tag, 
    Comment,
    userSchema
    
}