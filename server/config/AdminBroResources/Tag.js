const { Tag } = require("../../Models");

module.exports = {
    resource: Tag,
    options: {
        title: 'tagname',
        listProperties: ['_id', 'tagname'],
        showProperties: ['_id', 'tagname', 'quesId'],
        editProperties: ['_id', 'tagname'],
        filterProperties: ['_id', 'tagname', 'quesId']
    },
};


// tagname,
// quesId,