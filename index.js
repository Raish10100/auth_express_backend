// lesing server in this file

require('dotenv').config();

const PORT = process.env.PORT || 5010;
const app = require('./app');


app.listen(PORT,() => {
    console.log(`Server start at http://localhost:${PORT}`);
})






































/*
// This file  server to listen on port 3010.

const PORT = process.env.PORT || 3010;
const app = require('./app')

app.listen(PORT,() => {
    console.log(`Server start at http://localhost:${PORT}`);
})

*/