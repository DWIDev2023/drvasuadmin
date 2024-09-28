const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { stringify } = require("nodemon/lib/utils");

const doctorSchema = new mongoose.Schema({
  imgsrc:{
    type:String,
    required:true
  },
urlname:{
    type:String 
  },

  doctorbanner:{
    type:String,
    required:true
  },
  doc_profile:{
    type:String,
    required:true
  },
  doctorabout:{
    type:String,
    required:true
  },
  designation:{
    type:String,
    required:true

  },
department:{
    type:String,
    required:true

  },

  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  pincode: {
    type: Number,
    required: true,
  },
  doctorEmail: {
    type: String,
    required: true,
  },
  doctorMobile: {
    type: Number,
    required: true,
  },
  education: [
    {
      institution: {
        type: String,
        required: true,
      },
      subject: {
        type: String,
        required: true,
      },
      startingDate: {
        type: String,
        required: true,
      },
      completedDate: {
        type: String,
        required: true,
      },
      degree: {
        type: String,
        required: true,
      },
      grade: {
        type: String,
        required: true,
      },
    },
  ],
extrainfo:{
type:String
},
  experience: [
    {
      company: {
        type: String,
        required: true,
      },
      location: {
        type: String,
        required: true,
      },
      jobposition: {
        type: String,
        required: true,
      },
      periodfrom: {
        type: String,
        required: true,
      },
      periodto: {
        type: String,
        required: true,
      },
    },
  ],
  service: [
    {
      service_name: {
        type: String
      },
      service_img: {
        type: String
      },
service_displayurl: {
        type: String
      },

      service_desc: {
        type: String      },
service_id: {
        type: String      }

    },
  ],
  password: {
    type: String,
    required: true,
  },
  role:{
    type:Number,
    required:true
  },
  visibility:{
    type:Boolean,
    default:true
  },
  placeid:{
    type:String,
  }
  
},{ timestamps: true });

doctorSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }

  next();
});

const doctor = new mongoose.model("doctor", doctorSchema);
module.exports = doctor;
