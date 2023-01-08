const mongoose = require('mongoose');
const { getMongoConfig } = require('../session/session.config');

const MONGO_URI = process.env.MONGO_URI;

const mongooseConnect = () => {
    mongoose.set("strictQuery", false);
    mongoose.connect(MONGO_URI, getMongoConfig()).then(() => {
        console.info(`MongoDB connected on ${MONGO_URI}`);
    }).catch(err => {
        console.error(err);
        process.exit();
    })    
}

module.exports = mongooseConnect;