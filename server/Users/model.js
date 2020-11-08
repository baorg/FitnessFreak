const findOrCreate = require("mongoose-findorcreate");
const mongoose = require("mongoose");


const quesSchema = new mongoose.Schema({
    upDown : [],
    answers : [{}],
    categoryName : String,
    userId : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
});
const Ques = new mongoose.model("Ques", quesSchema);

const answerSchema = new mongoose.Schema({
    upDown : [],
    answer : String,
    comments : [commentSchema],
    quesId : {type: mongoose.Schema.Types.ObjectId, ref: 'Ques'},
    userId : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
});
const Ans = new mongoose.model("Ans", answerSchema);



const userSchema = new mongoose.Schema({
    userName: String,
    googleId: String,
    facebookId : String,
    ProfileImage : String,
    question : [{type: mongoose.Schema.Types.ObjectId, ref: 'Ques'}],
    answer : [{type: mongoose.Schema.Types.ObjectId, ref: 'Ans'}],
});

userSchema.plugin(findOrCreate);
const User = new mongoose.model("User", userSchema);

module.exports = {

    User,
    
}