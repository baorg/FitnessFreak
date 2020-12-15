require('dotenv').config({ path: '../../.env' });
const faker = require('faker');
const fs = require('fs');
const mongoose = require('mongoose');
const path = require('path');
const { exit } = require('process');
const { User } = require('../../Models');

const {
    DATABASE_USER,
    DATABASE_PASSWORD,
    DATABASE_CLUSTER,
    DATABASE_NAME
} = process.env;


async function createUser() {
    let first_name = faker.name.firstName();
    let last_name = faker.name.lastName();
    let username = faker.internet.userName(first_name, last_name).toLowerCase().replace(/[^\w.]/g, '_');
    let email = faker.internet.email(first_name, last_name);
    let password = faker.internet.password(10);
    let profile_image = faker.image.image();

    let data = await User.find({ $or: [{ username: username }, { email: email }] }).exec();
    if (data.length > 0)
        return await createUser();
    else {
        let user = new User({
            first_name: first_name,
            last_name: last_name,
            username: username,
            email: email,
            profile_image: profile_image
        });
        user = await user.setPassword(password);
        user = await user.save();
        return { user, password };
    }
}

async function addUsers(count) {
    const connection = await mongoose.connect(
        `mongodb+srv://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_CLUSTER}/${DATABASE_NAME}?retryWrites=true&w=majority`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

    let filepath = path.join(path.dirname(path.dirname(__filename)), 'data.json');
    let data = JSON.parse(fs.readFileSync(filepath).toString());
    console.log('File path: ', filepath);
    for (var i = 0; i < count; i++) {
        let { user, password } = await createUser();
        data.users.push({
            username: user.username,
            password: password,
        });
        console.log(`${i+1}. Created user ${user.username}`);
    }
    fs.writeFileSync('../data.json', JSON.stringify(data, null, '\t'));
    return true;
}

function main() {
    let count = 10;
    console.log(process.argv);
    if (process.argv.length > 2)
        count = process.argv[2];
    return new Promise((resolve, reject) => {
        addUsers(count).then(val => {
            resolve(`${count} users added.`);
        }).catch(err => {
            reject(err);
        });
    });
}


main().then(d => {
    console.log(d);
    exit();
}).catch(err => console.log('ERROR:', err));