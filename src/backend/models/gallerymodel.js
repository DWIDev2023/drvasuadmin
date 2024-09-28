const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema({

  imgsrc: {
    type: String,
  },

  doctorid:{
    type: mongoose.Schema.Types.ObjectId, ref: "doctor"
  },
  privateimg:{
    type:String
  }

},{ timestamps: true });

const gallery = new mongoose.model("gallery", gallerySchema);
module.exports = gallery ;
