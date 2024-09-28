const mongoose = require("mongoose");

const careerSchema = new mongoose.Schema({
  career_name: {
    type: String,
    required: true,
  },
  career_url: {
    type: String,
  },
  career_description: {
    type: String,
  },
  career_department: {
    type: String,
  },
  career_location: {
    type: String,
  },

}, { timestamps: true });

const career = new mongoose.model("career", careerSchema);
module.exports = career;
