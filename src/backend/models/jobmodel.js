const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    resume: {
        type: String,
    },
    phonenumber: {
        type: String,
    },
    email: {
        type: String,
    },
    qualification: {
        type: String,
    },
    totalexp: {
        type: String,
    },
    location: {
        type: String,
    },
    careerid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'career',
        required: true
    }


}, { timestamps: true });

const job = new mongoose.model("job", jobSchema);
module.exports = job;
