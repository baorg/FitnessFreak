function validateEmail(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
};

function validateUsername(username) {
    var re = /^[a-z0-9_]+$/;
    return re.test(username);
}

module.exports = {
    validateEmail,
    validateUsername
}