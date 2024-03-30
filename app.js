//Server setup is defined in this file.

// Importing the 'express' module, which is the main module for the Express.js framework.
const express = require('express');

// Creating an instance of the Express application.
const app = express();

// Importing the 'authRouter' module from the './router/authRoute' file.
// This assumes that there is a file named 'authRoute.js' inside a 'router' directory in the same directory as this file.
const authRouter = require('./router/authRouter');

// ---------
const databaseconnect = require('./config/databaseConfig');
const cookieParser = require('cookie-parser') 
// ?-----------l4
const cors = require('cors');
// ?-----------l4

databaseconnect()
// ---------



// Middleware: Parsing incoming request bodies with JSON payloads.
// This middleware parses incoming request bodies with JSON payloads and populates the 'req.body' property with the parsed JSON data.
//Parses incoming request bodies with JSON payloads: This middleware specifically targets requests that contain JSON data in their body. It takes the raw JSON data from the request body and parses it into a JavaScript object, making it easier for you to work with within your routes or other middleware.
app.use(express.json());
app.use(cookieParser());
// ?-----------l4

app.use(cors({
    origin: [process.env.CLIENT_URL],
    credentials : true
}))
// ?-----------l4

// Mounting the 'authRouter' middleware at the '/api/auth/' path.
// This means that all routes defined in the 'authRouter' will be prefixed with '/api/auth/'.
app.use("/api/auth/", authRouter);

// Default route handler for the root path ('/').
// This route handler responds with a JSON object containing the message "JWTauth server".
app.use('/', (req, res) => {
    res.status(200).json({ data: "JWTauth server" });
});

// Exporting the Express application instance.
// This makes the 'app' object available for use in other parts of the application.
module.exports = app;
