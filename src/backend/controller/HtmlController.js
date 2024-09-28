const path = require("path");

let servicemodel = require('../models/servicemodel')

function index(req, res) {
  // res.render("index", {
  //   filename: req.filename,
  // });

  res.send(req.filename);
  // res.redirect('/index')
}

// function indextest(req, res) {
  // res.render("indextest");
  // res.redirect('/index')

// }

function appointment(req, res) {
  // let filepath = path.join(
  //   __dirname,
  //   "../../client/staticfiles/appointment.html"
  // );
  // res.sendFile(filepath);
  res.render('appointment')

  // res.render("appointment");
}

function blogtest(req, res) {
  res.render("blogtest");
}

function blogtestsubmmit(req, res) {
  res.send(req.body);
}

async function doctorform(req, res) {
  let doctorinfo = "new"
  let services = await servicemodel.find({})
  res.render("doc_form",{
    doctorinfo,
    services
  });
}

function login(req, res) {
  res.render("admin-login");
}
function doctorprofile(req, res) {
  res.render("doctor-profile");
}

function admindashboard(req, res) {
  res.render("doctors-dashboard");
}

function alldoctors(req, res) {
  res.render("all-doctors");
}

function allpatients(req, res) {
  res.render("all-paitents");
}

function createblog(req, res) {
  res.render("createblog",{
    formtype:'new',
    bloginfo:[{displayname:"",servicecategory:"",displayimg:""}]
  });
}


function enquiry(req,res){
  res.render("contact");
}


function addservice(req,res){
  res.render("addservice");
}

module.exports = {
  index,
  // indextest,
  appointment,
  blogtest,
  blogtestsubmmit,
  doctorform,
  login,
  doctorprofile,
  admindashboard,
  alldoctors,
  allpatients,
  createblog,
  enquiry,
  addservice
};
