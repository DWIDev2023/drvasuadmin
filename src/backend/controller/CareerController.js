const careermodel = require("../models/careermodel");
const jobmodel = require("../models/jobmodel");

const submitcareer = async (req, res) => {
  let data = {
    ...req.body,
  };

  await careermodel.create(data);

  res.redirect(`/careers`);
};

const saveapplication = async (req, res) => {
  let data = {
    ...req.body,
  };
  if (req.filename) {
    data.resume = req.filename;
  }

  await jobmodel.create(data);

  res.status(200).json({
    result: {
      status: 200,
      message: "application submitted successfully",
      data: [],
      error: null,
    },
  });
};

const getallcareers = async (req, res) => {
  let careers = await careermodel.find({});
  if (req.query.reqtype == "api") {
    res.status(200).json({
      result: {
        status: 200,
        message: "careers retrieved successfully",
        data: { careers },
        error: null,
      },
    });
  } else {
    res.render("career", {
      careers,
    });
  }
};

const getalljobs = async (req, res) => {
  let jobs = await jobmodel.find({}).populate("careerid");
  res.status(200).json({
    result: {
      status: 200,
      message: "Jobs retrieved successfully",
      data: { jobs },
      error: null,
    },
  });
};

const getcareerbyid = async (req, res) => {
  let formtype = req.query.formtype;
  if (formtype == "edit") {
    let career = await careermodel.find({ _id: req.params.id });

    res.render("addcareer", {
      career,
      formtype: "edit",
    });
  } else {
    res.render("addcareer", {
      formtype: "add",
    });
  }
};

const editcareerbyid = async (req, res) => {
  await careermodel.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    req.body,
    { new: true }
  );

  res.redirect("/careers");
};

const deletecareer = async (req, res) => {
  try {
    await careermodel.findByIdAndDelete(req.params.id);
    res.redirect("/careers");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  submitcareer,
  getallcareers,
  getcareerbyid,
  editcareerbyid,
  saveapplication,
  getalljobs,
  deletecareer
};
