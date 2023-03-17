const mongoose = require('mongoose')


const postSchema = new mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String, required:true},
    CreatedTime: {type:String, required:true},
    comments:{type:Array},
    likes:{type:Array}
},
{
    timestamps:true
}
)

const postModel = mongoose.model("postModel", postSchema)

module.exports = postModel