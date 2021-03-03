// var _ = require('lodash');
// var nodemailer = require('nodemailer');
// const mailgun = require("mailgun-js");
// const DOMAIN = "sandbox40fc43dd8a16407292bba2f8ef2d5ee5.mailgun.org";
// const mg = mailgun({ apiKey: "aba7720bd4e50e4ed124e8d04a66e606-e5da0167-d316974b", domain: DOMAIN });

const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");
const { CLIENT_DOMAIN } = require('../../config');
const { EMAIL_ID, EMAIL_PASSWORD, } = process.env;



let transporter = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    auth: {
        user: EMAIL_ID,
        pass: EMAIL_PASSWORD,
    },
});

let MailGenerator = new Mailgen({
    theme: "default",
    product: {
        name: "Fitness Freak",
        link: CLIENT_DOMAIN,
    },
});

module.exports = async function sendMail(to, subject, response) {
    let mail = MailGenerator.generate(response);
    
    let message = {
        from: EMAIL_ID,
        to: to,
        subject: subject,
        html: mail
    };
    try {
        let res = await transporter.sendMail(message);
        return true;
    } catch (err) {
        console.error('ERROR: ', err);
        return false;
    }
}