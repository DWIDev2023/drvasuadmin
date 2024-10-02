const express = require("express");
const router = express.Router();
const htmlController = require("../controller/HtmlController");
const multerController = require("../controller/MulterController");
const appointmentController = require("../controller/AppointmentController");
const doctorController = require("../controller/DoctorController");
const authenticationController = require("../controller/AuthenticationController");
const blogController = require("../controller/BlogController");
const enquiryController = require("../controller/EnquiriesController");
const commentController = require("../controller/CommentController");
const serviceController = require("../controller/ServiceController");
const careerController = require("../controller/CareerController");
const mailinglistController = require("../controller/MailinglistController");
const healthPackageController = require("../controller/HealthPackageController");

router.route("/").get(htmlController.login);

router
  .route("/submitvideo")
  .post(multerController.uploadfile, htmlController.index);
router
  .route("/saveapplication")
  .post(multerController.uploadfile, careerController.saveapplication);
// router.route("/indextest").get(htmlController.indextest);

router
  .route("/submitappointment")
  .post(appointmentController.submitappointment);

router.route("/appointment").get(appointmentController.getappointmentsbyid);
router.route("/getappointments").get(appointmentController.getappointments);
router.route("/blogtest").get(htmlController.blogtest);

router.route("/blogtestsubmit").post(htmlController.blogtestsubmmit);

// authroutes
router.route("/adminlogin").get(htmlController.login);
router.route("/logout").get(authenticationController.logout);
router.route("/adminlogin").post(authenticationController.login);

//adminroutes
router
  .route("/dashboard")
  .get(authenticationController.checksession, doctorController.dashboard);
router
  .route("/alldoctors")
  .get(authenticationController.checksession, doctorController.alldoctors);
router.route("/getdoctors").get(doctorController.alldoctors);
router
  .route("/allpatients")
  .get(authenticationController.checksession, htmlController.allpatients);

router
  .route("/doctorprofile/:doctorid")
  .get(authenticationController.checksession, doctorController.doctorprofile);

router
  .route("/adddoctor")
  .get(authenticationController.checksession, htmlController.doctorform);
router
  .route("/doctorform")
  .post(multerController.uploadfile, doctorController.createdoctor);

router
  .route("/editprofile/:doctorid")
  .get(authenticationController.checksession, doctorController.doctorprofile);

router
  .route("/createblog")
  .get(authenticationController.checksession, htmlController.createblog);

router
  .route("/createblog")
  .post(multerController.uploadfile, blogController.createblog);

router
  .route("/viewblog/:slug")
  .get(authenticationController.checksession, blogController.viewblog);

router.route("/editblog/:blogid").post(blogController.createblog);

router
  .route("/editblog/:blogid")
  .get(authenticationController.checksession, blogController.viewblog);

router
  .route("/deleteappointment")
  .get(
    authenticationController.checksession,
    appointmentController.deleteappointmentbyid
  );

router
  .route("/downloadappointments")
  .get(
    authenticationController.checksession,
    appointmentController.downloadappointments
  );

router
  .route("/deleteblog")
  .get(authenticationController.checksession, blogController.deleteblogbyid);

router
  .route("/deletedoctor")
  .get(
    authenticationController.checksession,
    doctorController.deletedoctorbyid
  );

router
  .route("/changepassword/:id")
  .post(
    authenticationController.checksession,
    authenticationController.changePassword
  );

router
  .route("/uploadgalleryimage")
  .post(
    authenticationController.checksession,
    multerController.uploadfile,
    doctorController.uploadgalleryimage
  );

router
  .route("/deleteimagefromgallery")
  .get(
    authenticationController.checksession,
    doctorController.deleteimagefromgallery
  );

router.route("/contact").get(htmlController.enquiry);

router.route("/submitcontact").post(enquiryController.createenquiry);

router
  .route("/getenquiries")
  .get(
    authenticationController.checksession,
    enquiryController.getallenquiries
  );
router
  .route("/getallappointments")
  .get(
    authenticationController.checksession,
    appointmentController.getallappointments
  );

router
  .route("/getapplications")
  .get(
    authenticationController.checksession,
    enquiryController.getallapplications
  );
router
  .route("/getbookings")
  .get(
    authenticationController.checksession,
    healthPackageController.getallbookings
  );

router.route("/blogs").get(blogController.getallblogs);

router.route("/viewblog").get(blogController.viewblog);
router.route("/comment").post(commentController.submitcomment);

router.route("/index").get(doctorController.gethomepage);

router.route("/services").get(serviceController.getallservices);
router.route("/careers").get(careerController.getallcareers);

router
  .route("/addservice")
  .get(serviceController.getservicebyid);

router
  .route("/addservice")
  .post(authenticationController.checksession, serviceController.submitservice);
router
  .route("/editservice/:id")
  .post(
    authenticationController.checksession,
    serviceController.editservicebyid
  );

router
  .route("/addcareer/:id")
  .get(authenticationController.checksession, careerController.getcareerbyid);

router
  .route("/addcareer")
  .get(authenticationController.checksession, careerController.getcareerbyid);

router
  .route("/addcareer")
  .post(authenticationController.checksession, careerController.submitcareer);
router
  .route("/editcareer/:id")
  .post(authenticationController.checksession, careerController.editcareerbyid);
router
  .route("/deletecareer/:id")
  .get(authenticationController.checksession, careerController.deletecareer);


router
  .route("/addservice/:id")
  .get(serviceController.getservicebyid);
router
  .route("/deleteservice/:id")
  .get(authenticationController.checksession, serviceController.deleteservice);


router.route("/doctor/:name").get(doctorController.doctorprofile);
router.route("/team").get(doctorController.getdoctorsbasedondepartment);
router.route("/addtomailinglist").post(mailinglistController.submitmail);
router
  .route("/getbookedslots")
  .post(appointmentController.checkavailabletimeslots);
router
  .route("/getpackagebookedslots")
  .post(healthPackageController.checkavailabletimeslots);
router.route("/about").get(doctorController.about);
router.route("/healthPackages").get(healthPackageController.getAllPackages);
router.route("/packages").get(healthPackageController.getAllPackages);
router.route("/addpackage").post(healthPackageController.addPackage);
router.route("/addpackage").get(healthPackageController.getPackageById);
router
  .route("/addpackage/:id")
  .get(
    authenticationController.checksession,
    healthPackageController.getPackageById
  );
router
  .route("/editpackage/:id")
  .post(
    authenticationController.checksession,
    healthPackageController.editpackagebyid
  );
router
  .route("/savepackagebooking")
  .post(healthPackageController.savePackageBooking);
router
  .route("/createHealthPackages")
  .get(healthPackageController.getAllPackages);

module.exports = router;
