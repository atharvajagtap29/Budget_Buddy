const mongoose = require('mongoose');

// Configure dotenv
require('dotenv').config();

const MONGO_URL = process.env.MONGO_URL;

if (MONGO_URL) {
    console.log(`Connection URL ::: ${MONGO_URL}`);
} else {
    console.log('No connection URL found');
}

const connectDatabase = () => {
    mongoose.connect(MONGO_URL!)
        .then(() => {
            console.log('Connected to MongoDB');
        })
        .catch((err: any) => {
            console.error('Error connecting to MongoDB ::: ', err);
        });
};

module.exports = connectDatabase;
