const mongoose = require("mongoose");


const commentSchema = new mongoose.Schema({
    comment: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});
const Comment = new mongoose.model("Comment", commentSchema);

module.exports = { commentSchema, Comment };