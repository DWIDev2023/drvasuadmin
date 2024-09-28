const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  patientName: {
    type: String,
    required: true,
  },
doctorid: {
    type: String,
    required: true,
  },

  patientEmail: {
    type: String
  },
  patientMobile: {
    type: Number,
    required: true,
  },
  patientGender: {
    type: String,
  },
  patientAge: {
    type: Number, 

  },
  appointmentDate: {
    type: String,
    required: true,
  },
  appointmentTime: {
    type: String,
 required: true,
  },
  pastconsultation: {
    type: String,
  },
  preferredDoctor: { 
    type: String,  }, 
  preferredDepartment: {
    type: String,
  },
  appointmentstatus:{
     type: Boolean, 
     default: false 
  },
notes:{
type:String
}
},{ timestamps: true });

const appointment = new mongoose.model("appointment", appointmentSchema);
module.exports = appointment;
