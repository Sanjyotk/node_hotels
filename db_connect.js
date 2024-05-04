const mongoose = require('mongoose');
require('dotenv').config();

// const mongoURL = 'mongodb://127.0.0.1:27017/hotels';
const mongoURL = process.env.DB_URL;

mongoose.connect(mongoURL);

const db = mongoose.connection;

db.on('connected', () => {
    console.log("Connected to MongoDB server");
});

db.on('error', (err) => {
    console.error("Error connecting to MongoDB:", err);
});

db.on('disconnected', () => {
    console.log("Disconnected from MongoDB");
});

module.exports = db;