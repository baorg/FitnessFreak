module.exports = function hideEmail(email) {
    let res_mail = '';
    let k = 0;
    for (var i = 0; i < email.length; i++) {
        if (k < 2) {
            res_mail += email[i];
            k++;
        } else if (email[i] == '@') {
            res_mail += '@';
            k = 0;
        } else {
            res_mail += '*';
        }
    }

    return res_mail;
}