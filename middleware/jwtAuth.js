

// Importing the jsonwebtoken library
const JWT = require('jsonwebtoken');

// Middleware function for JWT authentication
const jwtAuth = (req, res, next) => {
    // Extracting token from cookies or setting it to null if not found
    const token = (req.cookies && req.cookies.token) || null;

    // If token doesn't exist, return error response
    if (!token) {
        return res.status(400).json({
            success: false,
            message: "Token doesn't exist."
        });
    }

    try {
        // Verifying the token using the secret key
        const payload = JWT.verify(token, process.env.SECRET);
        // Attaching user information to the request object
        req.user = { id: payload.id, email: payload.email };
    } catch (e) {
        // If token verification fails, return error response
        return res.status(400).json({
            success: false,
            message: e.message
        });
    }
    // Proceed to the next middleware
    next();
}

// Exporting the JWT authentication middleware
module.exports = jwtAuth;





















// const JWT = require('jsonwebtoken');

// const jwtAuth = (req,res,next) => {

//     const token = (req.cookies && req.cookies.token) || null ;

//     if (!token){
//         return res.status(400).json({
//             success : false,
//             message : "token doesn't exists "
//         })
//     }

//     try {
//         const payload = JWT.verify(token,process.env.SECRET);
//         req.user = { id: payload.id, email: payload.email};
//     }
//     catch (e) {
//         return res.status(400).json({
//             success : false,
//             message : e.message
//         })
//     }
//     next();
// }


// module.exports = jwtAuth ;