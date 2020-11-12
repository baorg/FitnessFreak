const mongoose = require("mongoose");
const { quesSchema, Ques } = require('./Question');
const { userSchema, User } = require("./User");
const { tagSchema, Tag } = require("./Tag");
const { commentSchema, Comment } = require("./Comment");
const { answerSchema, Ans } = require("./Answer");


module.exports = {
    User,
    Ques,
    Ans,
    Tag,
    Comment,
    userSchema
}