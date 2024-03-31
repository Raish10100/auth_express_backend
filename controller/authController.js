const userModel = require("../model/userSchema");
const emailValidator = require('email-validator')

const signup = async (req,res,next) => {
    const { name,email,password,confirmPassword } = req.body;
    console.log(name,email,password,confirmPassword);


if(!name || !email || !password || !confirmPassword){
    return res.status(400).json({
        success: false,
        message: "Every field is required"
    })
}

const validEmail = emailValidator.validate(email);
if(!validEmail){
    return res.status(400).json({
        success: false,
        message: "Please provide a valid email id"
    })
}

if(password !== confirmPassword){
    return res.status(400).json({
        success: false,
        message: "password and confirm password doesn't match"
    })
}

    try {

        //?-L2----------👇👇
        const userInfo = userModel(req.body); //? ---------------very imp-----------       
        const result = await userInfo.save()  //? storing data in database  ,,,you can write ini different way also  const result = await userModel.create(req.body);



        res.status(200).json({
            success : true,
            data : result
        })
    }
    catch(e){
        if(e.code === 11000){
            return res.status(400).json({
                success : false,
                message: "Account already exists with provided email id"
            })
        }
        return res.status(400).json({
            success: false,
            message: e.message
        })
    }

   
}

const signin = async (req,res,next) => {
    const { email,password } = req.body

    if(!email || !password){
        return res.status(400).json({
            success: false,
            message: "Every field is required"
        })
    }

    const user = await userModel //? fetching value from database
        .findOne({
            email //?When the key and value have the same name, you can omit the key name and only specify the value.//({email: email}) // ({property: value})//property is from database and value is from email (from req.body)
        })
        .select('+password');


if(!user || user.password !== password){
    return res.status(400).json({
        success: false,
        message: "Invalid credentials" 
    })
}
try {
    const token = user.jwtToken(); // Generate JWT token using the custom method defined in the user schema //?When you call user.jwtToken(), you're invoking this method to generate a JWT token for the user.
    
    // Set the user's password to undefined to avoid sending it in the response
    user.password = undefined;
    
    // Configure options for the cookie
    const cookieOption = {
        maxAge: 24 * 60 * 60 * 1000, // Expires in 24 hours
        httpOnly: true // Cookie accessible only via HTTP(S) and not through JavaScript
    }; 
    
    // Set the token in a cookie and send it in the response
    res.cookie("token", token, cookieOption); // cookiename, value, options
    res.status(200).json({
        success: true,
        data: user // Send user data in the response
    });
} catch (e) {
    // Handle any errors that occur during token generation or sending the response
    return res.status(400).json({
        success: false,
        message: e.message // Send error message in the response
    });
}


}

const getUser = async (req,res,next) => {
    const userId = req.user.id;  //here user object is taken from req object ,,declaration of req.user is made in "jwtAuth.js" file

    try{
        const user = await userModel.findById(userId);                     
        return res.status(200).json({
            success: true,
            data: user 
        })
    } catch(e) {
        return res.status(400).json({
            success: false,
            message: e.message
        })
    }
}

module.exports = {
    signup,
    signin,
    getUser
}