const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [ true, "obligatorio" ]
    }, 
    location : {
        type : String,
        required : [ true, "obligatorio" ]
    },
    gender : {
        type : String,
        required : [ true, "obligatorio" ]
    },
    age : {
        type : Number,
        required : [ true, "obligatorio" ]
    },
    vaccine_type : {
        type : String,
        required : [ true, "obligatorio" ]
    },
}, 
{ collection : "personas" });

const Post = mongoose.model("Post", postSchema);
module.exports = Post;