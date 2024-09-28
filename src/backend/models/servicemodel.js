const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  service_name: {
    type: String,
    required: true,
  },
  servicecategory: {
    type: Number,
  },
  service_displayurl: {
    type: String,
  },
service_title:{
    type: String
},
service_description:{
    type:String
},
service_keywords:{
    type:String
},
  service_url: {
    type: String,
  },
  serviceBanner_url: {
    type: String,
  },
  service_desc: {
    type: String,
  },
  service_causes: {
    type: String,
  },
  service_symptoms: {
    type: String,
  },
  service_treatment: {
    type: String,
  },
}, { timestamps: true });

const service = new mongoose.model("service", serviceSchema);
module.exports = service;
