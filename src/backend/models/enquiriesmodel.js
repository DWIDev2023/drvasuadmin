const mongoose = require("mongoose");

const enquiriesSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    email: {
      type: String,
    },
    phonenumber: {
      type: Number,
    },
    speciality: {
      type: String,
    },
    doctor: {
      type: String,
    },
    message: {
      type: String,
    },
    date: {
      type: String,
    },
  },
  { timestamps: true }
);

const enquiry = new mongoose.model("enquiry", enquiriesSchema);
module.exports = enquiry;
