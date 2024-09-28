const appointmentmodel = require("../models/appointmentmodel");
const doctormodel = require("../models/doctormodel");
const fastcsv = require("fast-csv");
const fs = require("fs");
const ws = fs.createWriteStream("upcomingappointments.csv");
var nodemailer = require("nodemailer");

const submitappointment = async (req, res, next) => {
  let doctor = await doctormodel.find({ _id: req.body.preferredDoctor });
  let doctorname = doctor[0].firstName + " " + doctor[0].lastName;
	
  const appointmentData = {
    patientName: req.body.patientName.toLowerCase(),
    patientEmail: req.body.patientEmail,
    patientMobile: req.body.patientMobile,
    patientGender: req.body.patientGender,
    patientAge: req.body.patientAge,
    appointmentDate: req.body.appointmentDate,
    appointmentTime: req.body.appointmentTime,
    pastconsultation: req.body.pastconsultation,
    preferredDoctor: doctorname.toLowerCase(),
    preferredDepartment: req.body.preferredDepartment,
    doctorid: req.body.preferredDoctor,
    appointmentstatus: req.body.appointmentstatus || false,
    notes: req.body.notes || ""

  };
console.log(appointmentData)
  const appointmentId = req.query.id;
  if (appointmentId) {
    // Update existing appointment
    await appointmentmodel.findByIdAndUpdate(appointmentId, appointmentData);
  } else {
    // Create new appointment
    await appointmentmodel.create(appointmentData);
  }
  const departments = {
    '1': 'Joint Replacement',
    '2': 'General Orthopedics',
    '3': 'Sports Medicine',
    '4': 'Robotic Knee Replacement'
  };

  const genders = {
    'male': 'Male',
    'female': 'Female'
  };
  let departmentText = departments[req.body.preferredDepartment] || 'Not specified';
  let genderText = genders[req.body.patientGender] || 'Not specified';

let msg = `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; }
    .header { color: #333366; font-size: 24px; margin-bottom: 20px; }
    .content { margin-top: 10px; }
    .field { font-weight: bold; }
    .value { margin-left: 10px; }
  </style>
</head>
<body>
  <div class="header">New Appointment Booked</div>
  <div class="content">
    <div><span class="field">Patient Name:</span><span class="value">${req.body.patientName}</span></div>
    <div><span class="field">Appointment Date:</span><span class="value">${req.body.appointmentDate}</span></div>
    <div><span class="field">Appointment Time:</span><span class="value">${req.body.appointmentTime}</span></div>
    <div><span class="field">Doctor:</span><span class="value">${doctorname}</span></div>
    <div><span class="field">Department:</span><span class="value">${departmentText}</span></div>
    <div><span class="field">Patient Email:</span><span class="value">${req.body.patientEmail}</span></div>
    <div><span class="field">Patient Mobile:</span><span class="value">${req.body.patientMobile}</span></div>
    <div><span class="field">Patient Gender:</span><span class="value">${genderText}</span></div>
    <div><span class="field">Patient Age:</span><span class="value">${req.body.patientAge}</span></div>
  </div>
 </body>
</html>`;

  if (!appointmentId) {
    sendemail("juvvadivasudeva@gmail.com", "Appointment Booking", msg);
  }
 if (appointmentId) {
res.redirect("/getallappointments")
}
else{
  res.status(200).json({
    result: {
      status: 200,
      message: "form submitted succesfully",
      data: [],
      error: null,
    },
  });
}
  // return "form Submitted successfully";
};

const getappointments = async (req, res, next) => {
  const getappointments = await appointmentmodel.find();

  res.send(getappointments);
};

const getallappointments = async (req, res) => {
  let allappointments = await appointmentmodel.find({}).sort({ createdAt: -1 });
  res.render("appointmentlist", {
    allappointments,
  });
};



const getappointmentsbyid = async (req, res, next) => {
  appointmentid = req.query.id || 0;
  let appointmentinfo = [];
  let doctors = await doctormodel.find({});


  if (appointmentid) {
    appointmentinfo = await appointmentmodel.find({ _id: appointmentid });
    
  if (req.query.reqtype == "api") {
    return  res.status(200).json({
        result: {
          status: 200,
          message: "appointments retrieved successfully",
          data: { appointmentinfo },
          error: null,
        },
      });
  
    }
    res.render("appointment", {
      appointmentinfo,
      doctors,
    });
  } else {
    res.render("appointment", {
      appointmentinfo,
      doctors,
    });
  }
};
const deleteappointmentbyid = async (req, res, next) => {
  appointmentid = req.query.id;
  await appointmentmodel.findOneAndDelete({ _id: appointmentid });
  res.redirect("/getallappointments");
};

const downloadappointments = async (req, res) => {
  console.log("totalupappointments");

  totalupappointments = await appointmentmodel.find({
    appointmentstatus: false,
  });

  console.log(totalupappointments);

  fastcsv
    .write(totalupappointments, {
      headers: true,
      transform: function (row) {
        return {
          patientname: row.patientName,
          patientEmail: row.patientEmail,
          patientMobile: row.patientMobile,
        };
      },
    })
    .pipe(ws);

  ws.on("finish", function () {
    // Download the file

    res.download("upcomingappointments.csv", () => {
      // Then delete the csv file in the callback
      fs.unlinkSync("upcomingappointments.csv");
    });
  });
};

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'juvvadivasudeva@gmail.com',
    pass: 'ggso ogye adxs gwpp'
  }
});

const sendemail = async (recipient, subject, message) => {
  try {
    let mailOptions = {
      from: '"Admin" <juvvadivasudeva@gmail.com>',
      to: recipient,
      subject: subject,
      text: message,
      html: `<b>${message}</b>`
    };

    let info = await transporter.sendMail(mailOptions);
console.log(info)
    return { message: 'Email sent successfully', info: info,success:true };
  } catch (error) {
console.log(error.message)
    throw new Error(`Error sending email: ${error.message}`);
  }
};

//const sendemail = (email, subject, message) => {
  // var transporter = nodemailer.createTransport({
  //   service: 'gmail',
  //   auth: {
  //      type: 'OAuth2',
  //         user: "mailto:support@kaizenoncology.com",
  //         pass: "KaiZen@426",
  //         clientId: "264679094058-fkrn9vkca359gqve6u6kj7vjierc1uqa.apps.googleusercontent.com",
  //         clientSecret: "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",
  //         refreshToken: "1//042JZblYLWBdACgYIARAAGAQSNwF-L9Iru1nG1ul-_tud-ScZeNaUT2E9Dh2tK0Tmt_bNlKVQFy_ayAj1wckGYr1fVRZywCEIJ-w"
  //   }
  // });
  // var mailOptions = {
  //   from: 'support@kaizenoncology.com',
  //   to: `mailto:${email}`,
  //   subject:`${subject}`,
  //   text: `${message}`,
  // };
  // transporter.sendMail(mailOptions, function(error, info){
  //   if (error) {
  //     console.log(error);
  //   } else {
  //     console.log('Email sent: ' + info.response);
  //   }
  // });
//};

const checkavailabletimeslots = async (req, res) => {
  let date = req.body.date;
  let bookedslots = [];
  let appointment = await appointmentmodel.find({ appointmentDate: date });

  for (let i = 0; i < appointment.length; i++) {
    let time = appointment[i].appointmentTime;
    bookedslots.push(time);
  }

  res.json({ bookedslots });
};

module.exports = {
  submitappointment,
  getappointments,
  getappointmentsbyid,
  deleteappointmentbyid,
  downloadappointments,
  sendemail,
  checkavailabletimeslots,
  getallappointments
};
