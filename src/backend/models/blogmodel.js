const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  displayname: {
    type: String,
    required: true,
  },
  displayimg: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  doctorid: {
    type: mongoose.Schema.Types.ObjectId, ref: "doctor"
  },
  type: {
    type: Number,
    required: true
  },
  servicecategory: {
    type: Number,
    default: 1
  },
  videosrc: {
    type: String,
    required: true
  }
}, { timestamps: true });

const blog = new mongoose.model("blog", blogSchema);
module.exports = blog;
