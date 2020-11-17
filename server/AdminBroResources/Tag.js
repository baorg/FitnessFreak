const { Tag } = require("../Models");

module.exports = {
    resource: Tag,
    options: {
        title: 'tagName',
        listProperties: ['_id', 'tagName', 'score.totalScore', ],
        showProperties: ['_id', 'tagName', 'quesId'],
        editProperties: ['_id', 'tagName'],
        filterProperties: ['_id', 'tagName', 'quesId']
    },
};


// tagname,
// quesId,