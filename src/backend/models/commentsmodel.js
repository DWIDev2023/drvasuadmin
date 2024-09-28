const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema({
 name:{
    type: String,
    required: true,
 },
 email:{
    type: String,
    required: true,
 },
 comment:{
     type:String,
     required:true,
 },
 blogid:{
     type:mongoose.Schema.Types.ObjectId, ref: "blog"
 }
},{ timestamps: true });

const comment = new mongoose.model("comment", commentsSchema);
module.exports = comment;
