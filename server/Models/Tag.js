const mongoose = require("mongoose");

const tagsSchema = new mongoose.Schema({
    tagname: String,
    quesId: { type: mongoose.Schema.Types.ObjectId, ref: 'Ques' },
});
const Tag = new mongoose.model("Tag", tagsSchema);

module.exports = { tagsSchema, Tag };