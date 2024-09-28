const mongoose = require("mongoose");

const packageBookingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phonenumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    message: {
      type: String,
    },
    packageid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "healthPackage",
      required: true,
    },
  },
  { timestamps: true }
);

const packageBooking = new mongoose.model(
  "packageBooking",
  packageBookingSchema
);
module.exports = packageBooking;
