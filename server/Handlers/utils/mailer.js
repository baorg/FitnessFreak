// var _ = require('lodash');
// var nodemailer = require('nodemailer');
const mailgun = require("mailgun-js");
const DOMAIN = "sandbox40fc43dd8a16407292bba2f8ef2d5ee5.mailgun.org";
const mg = mailgun({ apiKey: "aba7720bd4e50e4ed124e8d04a66e606-e5da0167-d316974b", domain: DOMAIN });


module.exports = function sendMail(email, subject, text) {
    // use default setting
    const data = {
        from: "Mailgun Sandbox <postmaster@sandbox40fc43dd8a16407292bba2f8ef2d5ee5.mailgun.org>",
        to: email,
        subject: subject,
        html: text
    };
    mg.messages.SendTemplateData
    mg.messages().send(data, function(error, body) {
        if (error) {
            console.error('ERROR: ', error);
            return false;
        } else {
            console.log('Mail sent to : ', email);
            return true;
        }
    });
};