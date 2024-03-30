const express = require('express');
const app = express();
const authRouter = require('./router/authRoute');

app.use(express.json())

app.use("/api/auth",authRouter); ///?IMP---------------------prefix '/api/auth'------------------------------------------------------
app.use("/",(req,res,next) => { //USE is used to mount middleware functions at a specified path, which will be executed for every request that matches that path or any path that starts with it.
    res.status(200).json({data : "JWTauth server"})
});


module.exports = app ;