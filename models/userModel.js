const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email:{type:String, required:true},
    password:{type:String, required:true},
    followers:{type:Array},
    following:{type:Array}
})

const userModel = mongoose.model('userModel', userSchema)
module.exports = userModel