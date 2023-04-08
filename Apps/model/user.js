const mongoose = require('mongoose')
const Joi = require('joi')
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required : true,
      },
      email: {
        type: String,
        unique: true,
      },
      password: {
        type: String,
        required: true,
        minlength : 5,
        maxlength : 256,
      },
    phone : {
        type : Number,
        minlength : 10,
        maxlength : 15,
    },
    role : {
        type : String,
        enum : ["user","admin"],
        default : "user"
    },
    

})

const User = mongoose.model('User',userSchema,'User');

const schema = Joi.object({
    username : Joi.string().min(5).max(255).required(),
    password : Joi.string().min(5).max(255).required(),
    email : Joi.string().min(5).max(255).email(),
    phone : Joi.string().min(10).max(15),
    role : Joi.string().min(3).max(255),

}) 

exports.User = User;
exports.schema = schema;