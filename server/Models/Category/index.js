const mongoose = require('mongoose');
const categorySchema = require('./schema');


const Category = new mongoose.model("Category", categorySchema);

module.exports = {
    categorySchema,
    Category
}