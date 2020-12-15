require('dotenv').config({ path: '../../.env' });
const faker = require('faker');
const fs = require('fs');
const mongoose = require('mongoose');
const path = require('path');
const { User } = require('../../Models');
const { exit } = require('process');

const {
    DATABASE_USER,
    DATABASE_PASSWORD,
    DATABASE_CLUSTER,
    DATABASE_NAME
} = process.env;


async function add_following(username1, username2) {
    let user1 = await User.findOne({ username: username1 }).exec();
    let user2 = await User.findOne({ username: username2 }).exec();

    await User.addFollowing(user1._id, user2._id);
    console.log(`${user1.username} started following ${user2.username}`);
    return;
}


async function add_random_followings(num) {

    const connection = await mongoose.connect(
        `mongodb+srv://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_CLUSTER}/${DATABASE_NAME}?retryWrites=true&w=majority`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

    let filepath = path.join(path.dirname(path.dirname(__filename)), 'data.json');
    console.log('File path: ', filepath);
    let data = JSON.parse(fs.readFileSync(filepath).toString());
    let users = data.users;

    console.log('Users: ', users.length);

    for (var i = 0; i < num; i++) {
        let [user1, user2] = faker.random.arrayElements(users, 2);
        await add_following(user1.username, user2.username);
    }

    return;
}

function main() {
    let count = 10;
    console.log(process.argv);
    if (process.argv.length > 2)
        count = process.argv[2];

    add_random_followings(count)
        .then(val => {
            console.log('Done.');
            exit(0);
        })
        .catch(err => {
            console.log('ERROR: ', err);
            exit(1);
        });
}

main();