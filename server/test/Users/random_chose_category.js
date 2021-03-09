require('dotenv').config({ path: '../../.env' });
const faker = require('faker');
const mongoose = require('mongoose');
const path = require('path');
const { exit } = require('process');
const { User } = require('../../Models');
const { category }  = require('../../config');

const {
    DATABASE_USER,
    DATABASE_PASSWORD,
    DATABASE_CLUSTER,
    DATABASE_NAME
} = process.env;

async function assignRandomCategory() {
    const connection = await mongoose.connect(
        `mongodb+srv://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_CLUSTER}/${DATABASE_NAME}?retryWrites=true&w=majority`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    
    let users = await User.find({}, "username first_name last_name score profile_image chosen_category").exec();
    
    for(var i=0;i<users.length;i++) {
        let user = users[i];
        user.chosen_category = faker.random.arrayElements(category, 2);
        await user.save();
        console.log(user.username, " : ", user.chosen_category);
    }
}

function main() {
    
    return new Promise((resolve, reject) => {
        assignRandomCategory().then(() => {
            resolve(`Categories added.`);
        }).catch(err => {
            reject(err);
        });
    });
}


main().then(d => {
    console.log(d);
    exit();
}).catch(err => console.log('ERROR:', err));