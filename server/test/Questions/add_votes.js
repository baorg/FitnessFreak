require('dotenv').config({ path: '../../.env' });
const faker = require('faker');
const fs = require('fs');
const mongoose = require('mongoose');
const path = require('path');
const { User, Ques } = require('../../Models');
const { exit } = require('process');
const { category } = require('../../config');
const { addVoteHandler, editVoteHandler } = require('../../Handlers/Question');
const {
    DATABASE_USER,
    DATABASE_PASSWORD,
    DATABASE_CLUSTER,
    DATABASE_NAME
} = process.env;

function handleSend(data) {
    console.log(' added :', data);
    return true;
}

async function createVote(user, question) {

    let req = {
        user: user,
        body: {
            quesId: question.id,
            isQues: 1
        }
    };
    let res = {
        send: (data) => console.log('Add Vote: ', data)
    };

    await addVoteHandler(req, res);

    res = {
        send: (data) => console.log('Edit Vote: ', data)
    }

    if (faker.random.boolean())
        req.body.up = 1;
    else
        req.body.down = 1;

    await editVoteHandler(req, res);

    return;
}

async function addVotes(count) {
    const connection = await mongoose.connect(
        `mongodb+srv://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_CLUSTER}/${DATABASE_NAME}?retryWrites=true&w=majority`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

    let filepath = path.join(path.dirname(path.dirname(__filename)), 'data.json');
    let data = JSON.parse(fs.readFileSync(filepath).toString());
    let users = data.users;
    let questions = await Ques.find({}).select('id').exec();

    console.log('File path: ', filepath);
    console.log('Total questions: ', questions.length);
    for (var i = 0; i < count; i++) {
        let user = await User.findOne({ username: faker.random.arrayElement(users).username }).exec();
        let question = faker.random.arrayElement(questions);
        console.log(`User ${user.id} liking ${question.id}`);
        await createVote(user, question);

    }

    return true;
}

function main() {
    let count = 10;
    console.log(process.argv);
    if (process.argv.length > 2)
        count = process.argv[2];
    return new Promise((resolve, reject) => {
        addVotes(count).then(val => {
            resolve(`${count} questions added.`);
        }).catch(err => {
            reject(err);
        });
    });
}


main().then(d => {
    console.log(d);
    exit();
}).catch(err => console.log('ERROR:', err));