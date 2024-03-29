// Importing the Mongoose library, which allows interaction with MongoDB
const mongoose = require('mongoose');

// Defining the MongoDB connection URL. If the environment variable MONGODB_URL is set, it will use that value; otherwise, it will default to 'mongodb://localhost:27017/auth_express'.
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/auth_express';

// Function to connect to the MongoDB database
const databaseconnect = () => {
    // Using Mongoose's connect method to establish a connection to the MongoDB database
    mongoose
        .connect(MONGODB_URL) // Connecting to the MongoDB database using the provided URL
        .then((conn) => console.log(`Connect to DB: ${conn.connection.host}`)) // If the connection is successful, log a message indicating the host to which the connection was made
        .catch((err) => console.log(err.message)); // If an error occurs during connection, log the error message
}

// Exporting the databaseconnect function to make it available for use in other parts of the application
module.exports = databaseconnect;
