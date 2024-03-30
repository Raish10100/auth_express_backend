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
        const result = await userInfo.save()
        //?-L2----------👆👆


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



module.exports = {
    signup
}