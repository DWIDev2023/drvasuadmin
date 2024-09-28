const mongoose = require("mongoose");

const mailingSchema = new mongoose.Schema({
 email:{
    type: String,
    required: true,
 }
},{ timestamps: true });

const mailinglist = new mongoose.model("mailinglist", mailingSchema);
module.exports = mailinglist;
