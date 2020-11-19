const { Ques } = require("../../Models");

module.exports = {
    resource: Ques,
    options: {
        title: 'title',
        listProperties: ['_id', 'title', 'userId', 'categoryName', 'created_at'],
        filterProperties: ['_id', 'title', 'categoryName', 'created_at'],
        // showProperties:[],
        // editProperties: [],
    }
};

// ['upDown', 'title', 'question', 'answers', 'categoryName', 'userId', 'tags', 'attachments', 'created_at']