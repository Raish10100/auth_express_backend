// This file sets up an Express server to listen on port 3010.

require('dotenv').config();  //this line is for '.env' file 

// Define the PORT variable using environment variables. 
// It takes the value of the PORT environment variable if defined, 
// otherwise defaults to 5001.
const PORT = process.env.PORT || 5001;

// Import the 'app' module from the './app' file.
// This assumes that there is a file named 'app.js' in the same directory as this file.
const app = require('./app');

// Start the server and make it listen on the specified PORT.
// The 'app.listen()' method binds and listens for connections on the specified PORT.
// When the server starts listening, it executes the callback function, which logs a message to the console.
app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`);
});
