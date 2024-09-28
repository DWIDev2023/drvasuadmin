const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
 name:{
    type: String,
    required: true,
 },
 text:{
     type:String,
     required:true,
 },
 image:{
     type:String,
     required:true
 },
 rating:{
    type:String,
    required:true
},
 doctorid:{
     type:mongoose.Schema.Types.ObjectId, ref: "doctor"
 }
},{ timestamps: true });

const review = new mongoose.model("review", reviewSchema);

module.exports = review;
