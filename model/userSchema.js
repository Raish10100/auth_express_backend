const mongoose = require('mongoose');

const { Schema } = mongoose ; 
const JWT = require('jsonwebtoken')
const userSchema = new Schema({
    name: {
        type: String,
        require: [true,"user name is Required"],
        minlength: [5,"Name must be at least 5 char"],
        maxlength: [50,"Name must be less then 50 char"],
        trim : true
    },
    email: {
        type: String,
        require: [true,'user email is required'],
        unique: [true,"already registered"],
        lowercase: true,
    },
    password: {
        type: String,
        select: false
    },
    forgetPasswordToken: {
        type: String
    },
    forgetPasswordExpiryDate: {
        type: Date 
    }
},{timestamps: true} //? use for "createdAt" and "updatedAt"
)


userSchema.methods = {
    jwtToken() {        //? traditional ES6 object method syntax.//  It define by this also jwtToken: function(){return JWT.sign ....}
        return JWT.sign(   //?This is a function call to the sign method provided by a library called JWT. It is used to generate a JWT token.
            {id: this._id, email: this.email},  //?This is the payload of the JWT token. It typically contains the information you want to encode into the token. In this case, it includes the user's _id and email properties.
            process.env.SECRET,   //?This is the secret key used to sign the JWT token. It's important to keep this secret and not expose it publicly.
            {expiresIn: '24h'}
        )
    }
}



const userModel = mongoose.model('users',userSchema);

module.exports = userModel;