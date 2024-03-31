const express = require('express');
const authRouter = express.Router();
const { signup,signin,getUser } = require('../controller/authController');
const jwtAuth = require('../middleware/jwtAuth')

authRouter.post('/signup',signup);
authRouter.post('/signin',signin);
authRouter.get('/user',jwtAuth,getUser)


module.exports = authRouter;
