const mongoose = require("mongoose");

const healthPackageSchema = new mongoose.Schema(
  {
    package_name: {
      type: String,
      required: true,
    },
    package_description: {
      type: String,
    },
    package_imgSrc: {
      type: String,
    },
  },
  { timestamps: true }
);
const healthPackage = new mongoose.model("healthPackage", healthPackageSchema);
module.exports = healthPackage;
