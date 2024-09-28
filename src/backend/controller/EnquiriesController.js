const res = require("express/lib/response");
const enquirymodel = require("../models/enquiriesmodel");
const jobmodel = require("../models/jobmodel");
const appointmentcontroller = require('./AppointmentController')


const createenquiry = async (req, res, next) => {
  await enquirymodel.create(req.body);
  let msg = `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; }
    .header { color: #333366; font-size: 24px; }
    .content { margin-top: 20px; }
    .field { font-weight: bold; }
    .value { margin-left: 10px; }
  </style>
</head>
<body>
  <div class="header">Dear Team,</div>
  <div class="content">
    You have received a new enquiry from ${req.body.firstname || ''} ${req.body.lastname || ''}.<br>
    <div>Details of the enquiry:</div>
    <div><span class="field">Name:</span><span class="value">${req.body.firstname || ''} ${req.body.lastname || ''}</span></div>
    <div><span class="field">Email:</span><span class="value">${req.body.email || 'not mentioned'}</span></div>
    <div><span class="field">Phone Number:</span><span class="value">${req.body.phonenumber || 'not mentioned'}</span></div>
    <div><span class="field">Date:</span><span class="value">${req.body.date || 'not mentioned'}</span></div>
    <div><span class="field">Additional Message:</span><span class="value">${req.body.message || 'not mentioned'}</span></div>
  </div>
  <div class="footer">Please review the enquiry and respond promptly.</div>
  <div class="footer">Best Regards,</div>
  <div class="footer">Your Clinic Team</div>
</body>
</html>`;  
    appointmentcontroller.sendemail("juvvadivasudeva@gmail.com", "Enquiry", msg);


  res.status(200).json({
    result: {
      status: 200,
      message: "Enquiry submitted successfully",
      error: null,
    },
  });
  // res.redirect('/')
};

const getallenquiries = async (req, res) => {
  let allenquiries = await enquirymodel.find({}).sort({ createdAt: -1 });
  res.render("enquiries", {
    allenquiries,
  });

  // res.send(allenquiries)
};
const getallapplications = async (req, res) => {
  let allapplications = await jobmodel
    .find({})
    .sort({ createdAt: -1 })
    .populate("careerid");
  res.render("application", {
    allapplications,
  });

  // res.send(allenquiries)
};

module.exports = {
  createenquiry,
  getallenquiries,
  getallapplications,
};
