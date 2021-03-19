require('dotenv').config({ path: '../../.env' });
const faker = require('faker');
const fs = require('fs');
const mongoose = require('mongoose');
const path = require('path');
const { User, Ques } = require('../../Models');
const { exit } = require('process');
const { category } = require('../../config');
const { postQuestionHandler } = require('../../Handlers/Question');
const {
    DATABASE_USER,
    DATABASE_PASSWORD,
    DATABASE_CLUSTER,
    DATABASE_NAME
} = process.env;

function handleSend(isAuth, data, isSaved) {
    console.log('Question added :', data);
    return true;
}

async function createQuestion(user) {

    let title = faker.lorem.paragraph();
    let question = `<p>${faker.lorem.sentences(10)}</p>`;
    let categories = faker.random.arrayElements(category, faker.random.number(4) + 1);
    let tags = [];
    let attachments = [];
    let N = faker.random.number(5);
    for (var i = 0; i < N; i++) {
        attachments.push({
            url: faker.random.image(),
            type_: 'image'
        });
    }

    await postQuestionHandler({
        isAuthenticated: () => true,
        user: user,
        body: {
            category: categories,
            tags: [],
            question: question,
            title: title,
            attachments: attachments
        }
    }, {
        send: handleSend,
        data: {}
    }, handleSend);
    return;
}

async function addQuestions(count) {
    const connection = await mongoose.connect(
        `mongodb+srv://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_CLUSTER}/${DATABASE_NAME}?retryWrites=true&w=majority`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    
    console.log('Connected to database');

    let filepath = path.join(path.dirname(path.dirname(__filename)), 'data.json');
    let data = JSON.parse(fs.readFileSync(filepath).toString());
    let users = data.users;
    console.log('File path: ', filepath);
    for (var i = 0; i < count; i++) {
        let user = await User.findOne({ username: faker.random.arrayElement(users).username }).exec();
        await createQuestion(user);
        console.log(`${i+1}. Created user ${user.username}`);
    }

    return true;
}

function main() {
    let count = 10;
    console.log(process.argv);
    if (process.argv.length > 2)
        count = process.argv[2];
    return new Promise((resolve, reject) => {
        addQuestions(count).then(val => {
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