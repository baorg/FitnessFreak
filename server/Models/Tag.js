const mongoose = require("mongoose");

const tagsSchema = new mongoose.Schema({
    tagname: String,
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ques' }]
});
tagsSchema.index({ tagname: "text" });

const Tag = new mongoose.model("Tag", tagsSchema);

module.exports = { tagsSchema, Tag };