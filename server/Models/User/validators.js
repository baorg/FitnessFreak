const { category } = require('../../config');

function validateEmail(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
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