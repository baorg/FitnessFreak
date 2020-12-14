const mongoose = require('mongoose')

async function setup() {
    mongoose.set("useCreateIndex", true);
    const {
        DATABASE_USER,
        DATABASE_PASSWORD,
        DATABASE_CLUSTER,
        DATABASE_NAME
    } = process.env;

    try {
        const connection = await mongoose.connect(
            `mongodb+srv://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_CLUSTER}/${DATABASE_NAME}?retryWrites=true&w=majority`, {
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