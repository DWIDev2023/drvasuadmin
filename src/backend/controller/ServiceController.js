const servicemodel = require("../models/servicemodel");

const submitservice = async (req, res) => {
  let data = {
    ...req.body,
  };

  await servicemodel.create(data);

  res.redirect(`/services`);
};

const getallservices = async (req, res) => {
  let services = await servicemodel.find({});
  if (req.query.reqtype == "api") {
    res.status(200).json({
      result: {
        status: 200,
        message: "services retrieved successfully",
        data: { services },
        error: null,
      },
    });
  } else {
    res.render("services", {
      services,
    });
  }
};

const getservicebyid = async (req, res) => {
  let formtype = req.query.formtype;
if (req.query.reqtype == "api") {
let service = await servicemodel.find({ service_displayurl: req.params.id });
return res.status(200).json({
      result: {
        status: 200,
        message: "service retrieved successfully",
        data: { service },
        error: null,
      },
    });
}

  if (formtype == "edit") {
    let service = await servicemodel.find({ _id: req.params.id });

    res.render("addservice", {
      service,
      formtype: "edit",
    });
  } else {
    res.render("addservice", {
      formtype: "add",
    });
  }
};

const editservicebyid = async (req, res) => {

  await servicemodel.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    req.body,
    { new: true }
  );

  res.redirect("/services");
};

const deleteservice = async (req, res) => {
  try {
    await servicemodel.findByIdAndDelete(req.params.id);
    res.redirect("/services");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};


module.exports = {
  submitservice,
  getallservices,
  getservicebyid,
  editservicebyid,
deleteservice 
};
