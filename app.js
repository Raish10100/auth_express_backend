const express = require('express');
const app = express();
const authRouter = require('./router/authRoute');
//?-L2----------👇👇
const databaseconnect = require('./config/databaseConfig');
const cookieParser = require('cookie-parser');
//?-L2----------👆👆


//?-L2----------👇👇
databaseconnect()
//?-L2----------👆👆

app.use(express.json())

// Middleware to parse cookies attached to the request object
app.use(cookieParser());//? middleware must be used before your route handlers or middleware that need access to cookies.

app.use("/api/auth",authRouter); ///?IMP---------------------prefix '/api/auth'------------------------------------------------------
app.use("/",(req,res,next) => { //USE is used to mount middleware functions at a specified path, which will be executed for every request that matches that path or any path that starts with it.
    res.status(200).json({data : "JWTauth server"})
});


module.exports = app ;