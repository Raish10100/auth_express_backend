const mongoose = require('mongoose');


const MONGODB_URL = process.env.MONGODB_URL || "mongodb://localhost:27017/auth_express";

const databaseconnect = () => {
    mongoose
        .connect(MONGODB_URL)
        .then((conn) => console.log(`Connected to DB : ${conn.connection.host}`))
        .catch((e) => console.log(e.message));
} 



module.exports = databaseconnect;