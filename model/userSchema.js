const mongoose = require('mongoose');

const { Schema } = mongoose ; 

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
},{timestamps: true}
)

const useModel = mongoose.model('user',userSchema);

module.exports = useModel;