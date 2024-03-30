// Importing the 'express' module, which is the main module for the Express.js framework.
const express = require('express');


const { signup,signin,getUser,logout } = require('../controller/authController');
const jwtAuth = require('../middleware/jwtAuth');

// Creating a new instance of an Express router.
const authRouter = express.Router();



// Defining a POST route handler for the '/signup' endpoint on the 'authRouter'.
// When a POST request is made to '/signup', the 'signup' function imported from the 'authController' module will be invoked to handle the request.
authRouter.post('/signup', signup);

//?----- l2

authRouter.post('/signin', signin);
//?-----

//------------------------  l3

authRouter.get('/user',jwtAuth,getUser); //created to get information of user
authRouter.get('/logout',jwtAuth,logout)
//------------------------  l3

// Exporting the 'authRouter' instance, making it available for use in other parts of the application.
// Any file that imports this module will have access to the 'authRouter' and its defined routes.
module.exports = authRouter;
