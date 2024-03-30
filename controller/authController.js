// Define a function named 'signup' that takes three parameters: 'req', 'res', and 'next'.

const userModel = require("../model/userSchema");
// --
const emailValidator = require("email-validator");
const bcrypt = require('bcrypt')

// ? signup method start-------------------------------------------------------

// This function is a route handler or controller function for handling the '/signup' route.
const signup = async (req, res, next) => {
  // Extracting data from the request body using object destructuring.
  // This assumes that the request body contains properties: 'name', 'email', 'password', and 'confirmPassword'.
  const { name, email, password, confirmPassword } = req.body;

  // Logging the extracted data to the console.
  console.log(name, email, password, confirmPassword);
  //---------------------

  if (!name || !email || !password || !confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "Every field is required",
    });
  }

  const validEmail = emailValidator.validate(email);



  if (!validEmail) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid email id",
    });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "password and confirm password doesn't match ",
    });
  }

  try {
    const userInfo = userModel(req.body);
    const result = await userInfo.save();

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch(e) {
    if (e.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Account already exists with provided email id",
      });
    }

    return res.status(400).json({
      success: false,
      message: e.message,
    });
  }

  //---------------------
};
// ? signup method end-------------------------------------------------------

// !------------------------------------------------------------------------------------------------------------------------------------------------------------------
//? signin method start -----------------------------------------------

const signin = async (req, res, next) => {
  const { email, password } = req.body;
  
  // send response with error message if email or password is missing
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "email and password are required"
    });
  }
  //  ! ----------------------  IMP field down side -----------------------------------------------------------------------------
   
    try {
      // check user exist or not
      const user = await userModel
        .findOne({//method to find single document that matches the specified criteria
          email
        })
        .select("+password");//this method is used to specify which field to include or exclude
  
      // If user is null or the password is incorrect return response with error message
      if (!user || !(await bcrypt.compare(password, user.password))) {
        // bcrypt.compare returns boolean value
        return res.status(400).json({
          success: true,
          message: "invalid credentials"
        });
      }
  
      // Create jwt token using userSchema method( jwtToken() )
      const token = user.jwtToken();
      user.password = undefined;
  
      const cookieOption = {
        maxAge: 24 * 60 * 60 * 1000, //24hr
        httpOnly: true //  not able to modify  the cookie in client side
      };
  
      res.cookie("token", token, cookieOption);
      res.status(200).json({
        success: true,
        data: user
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
  };
  
//  ! ----------------------  IMP field upper side -----------------------------------------------------------------------------
  

//?------------------------  l3

const getUser = async (req,res,next) => {
      const userId = req.user.id ;

      try{
        const user = await userModel.findById(userId);
        return res.status(200).json({
          success : true,
          data : user 
        })
      }
      catch(e){
        return res.status(400).json({
          success : false,
          message : e.message
      })
    }
};


const logout = (req,res) => {
    try {
      const cookieOption = {
        expires : new Date(),
        httpOnly : true 
      }
      res.cookie("token",null,cookieOption)
      res.status(200).json({
        success : true,
        message : "Logged Out"
      })
    }
    catch(e) {
      res.status(400).json({
        success : false,
        message : e.message
      })
    }
    
}
//?------------------------  l3 👆👆



// Exporting the 'signup' function as a property of an object.
// This allows the 'signup' function to be imported individually from other modules.
module.exports = {
  signup,
  signin,
  getUser,
  logout
};