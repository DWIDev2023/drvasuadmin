const packageModal = require("../models/healthPackageModal");
const packageBookingModal = require("../models/packagebookingsmodel");

const getAllPackages = async (req, res) => {
  let packages = await packageModal.find({});
  if (req.query.reqtype == "api") {
    res.status(200).json({
      result: {
        status: 200,
        message: "packages retrieved successfully",
        data: { packages },
        error: null,
      },
    });
  } else {
    res.render("healthpackages", {
      packages,
    });
  }
};
const getPackageById = async (req, res) => {
  let formtype = req.query.formtype;
  if (formtype == "edit") {
    let package = await packageModal.find({ _id: req.params.id });

    res.render("addPackage", {
      package,
      formtype: "edit",
    });
  } else {
    res.render("addPackage", {
      formtype: "add",
    });
  }
};
const addPackage = async (req, res) => {
  let data = {
    ...req.body,
  };

  await packageModal.create(data);
  res.redirect(`/packages`);
};
const editpackagebyid = async (req, res) => {
  await packageModal.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    req.body,
    { new: true }
  );

  res.redirect("/packages");
};

const savePackageBooking = async (req, res) => {
  let data = {
    ...req.body,
  };

  await packageBookingModal.create(data);

  res.status(200).json({
    result: {
      status: 200,
      message: "Package booked successfully",
      data: [],
      error: null,
    },
  });
};
const getallbookings = async (req, res) => {
  let allbookings = await packageBookingModal
    .find({})
    .sort({ createdAt: -1 })
    .populate("packageid");
  res.render("packagesBookings", {
    allbookings,
  });
};
const checkavailabletimeslots = async (req, res) => {
  let date = req.body.date;
  let bookedslots = [];
  let booking = await packageBookingModal.find({ date: date });

  for (let i = 0; i < booking.length; i++) {
    let time = booking[i].time;
    bookedslots.push(time);
  }

  res.json({ bookedslots });
};

module.exports = {
  editpackagebyid,
  getAllPackages,
  addPackage,
  getPackageById,
  savePackageBooking,
  getallbookings,
  checkavailabletimeslots,
};
