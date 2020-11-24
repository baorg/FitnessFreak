const { Comment } = require("../../../Models");

module.exports = {
    resource: Comment,
    options: {
        // title: 'comment',
        listProperties: ['_id', 'userId'],
        // filterProperties: ['_id', 'comment', 'userId'],
        // showProperties:[],
        // editProperties: [],
    }
};


// ['comment', 'userId']