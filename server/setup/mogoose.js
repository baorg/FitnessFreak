const mongoose = require('mongoose')

async function setup() {
    mongoose.set("useCreateIndex", true);
    try {
        const connection = await mongoose.connect(
            `mongodb://${process.env.DATABASE_DOMAIN}/${process.env.DATABASE}`, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
        console.log('Connected to Mongo');
        return connection;
    } catch (err) {
        console.error("Some error ocurred during connection mongoose.");
        throw err;
    }
}

module.exports = setup;