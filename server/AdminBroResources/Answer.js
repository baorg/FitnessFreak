const { Ans } = require("../Models");

module.exports = {
    resource: Ans,
    options: {
        title: '_id',
        listProperties: ['_id', 'userId', 'quesId'],
        // filterProperties: ['_id', 'title', 'categoryName'],
        // showProperties:[],
        // editProperties: [],
    }
};