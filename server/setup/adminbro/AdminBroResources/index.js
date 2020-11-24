const userResource = require('./User');
const questionResource = require('./Question');
const answerResource = require('./Answer');
const tagResource = require('./Tag');
const commentResource = require('./Comment');

const resources = [
    userResource,
    questionResource,
    answerResource,
    tagResource,
    commentResource
];

module.exports = resources;