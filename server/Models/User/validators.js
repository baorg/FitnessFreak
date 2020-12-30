const { category } = require('../../config');

function validateEmail(email) {
    // Regular Expression from  https://emailregex.com/
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

function validateUsername(username) {
    var re = /^[a-zA-Z][._a-zA-Z0-9]+[_a-zA-Z0-9]$/;
    return re.test(username);
}

function validateCategory(cat) {
    return category.some(el => el === cat);
}

module.exports = {
    validateEmail,
    validateUsername,
    validateCategory
}