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
            `mongodb://${DATABASE_USER}:${DATABASE_PASSWORD}@cluster0-shard-00-00.jtaob.mongodb.net:27017,cluster0-shard-00-01.jtaob.mongodb.net:27017,cluster0-shard-00-02.jtaob.mongodb.net:27017/${DATABASE_NAME}?ssl=true&replicaSet=atlas-chroxk-shard-0&authSource=admin&retryWrites=true&w=majority`, {
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