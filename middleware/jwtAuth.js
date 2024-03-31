// Importing the jsonwebtoken module
const JWT = require('jsonwebtoken');

// Middleware function for JWT authentication
const jwtAuth = (req, res, next) => {
    // Extracting the token from cookies or setting it to null if not present  //? Extract mean to remove or take out something
    const token = (req.cookies && req.cookies.token) || null;

    // Checking if token is missing
    if (!token) {
        return res.status(400).json({
            success: false,
            message: "Not authorized"
        });
    }

    try {
        // Verifying the token and extracting payload
        const payload = JWT.verify(token, process.env.SECRET);

        // Setting user information in the request object
        req.user = { id: payload.id, email: payload.email }; //here we had created user name object
    } catch (e) {
        // Handling verification errors
        return res.status(400).json({
            success: false,
            message: e.message
        });
    }

    // Passing control to the next middleware or route handler
    next();
};

// Exporting the jwtAuth middleware function
module.exports = jwtAuth;
