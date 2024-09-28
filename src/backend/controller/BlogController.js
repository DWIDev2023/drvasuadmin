const blogmodel = require("../models/blogmodel");
const reviewmodel = require("../models/reviewmodel");
const doctorsmodel = require("../models/doctormodel");
const mailinglistcontroller = require("./MailinglistController");
const commentmodel = require("../models/commentsmodel");

const createblog = async (req, res) => {
  let blogid = req.params.blogid;
  if (req.query.type == 1) {
    let displayname = req.body.videoname;
    let description = "0";
    let doctorid = req.query.doctorid;
    // let videosrc = "../uploads/"+req.filename
    let videosrc = req.body.videourl;
    let type = 1;

    let data = {
      displayname,
      description,
      doctorid,
      videosrc,
      type,
    };

    const createblog = await blogmodel.create(data, function (err, blog) {
      if (err) {
        console.log(err);
      }
      console.log(blog);
    });
    let msg = `new video added please check the video at ${videosrc}`;
    //mailinglistcontroller.sendmailstoall(msg);

    req.flash("success", "video added");
    res.redirect("/doctorprofile/" + doctorid);
  } else {
    if (req.query.formtype == "edit") {
      let data = req.body;
      const blog = await blogmodel.findOneAndUpdate(
        {
          _id: blogid,
        },
        data,
        { new: true }
      );

      req.flash("success", "blog updated");
res.redirect("/alldoctors");
    } else {
      const createblog = await blogmodel.create(req.body);
      let msg = `new Blog added please check the blog at https://kaizenoncology.com/viewblog?blogid=${createblog._id}&page=1`;
      //mailinglistcontroller.sendmailstoall(msg);

      req.flash("success", "blog created");
res.redirect("/alldoctors");
    }
  }
};

const viewblog = async (req, res) => {
  let blogid = req.params.blogid || req.query.blogid;
  let page = req.query.page;

  let bloginfo = 0;
  const formtype = req.query.formtype || 0;

  bloginfo = await blogmodel.find({ _id: blogid });
  let blogdesc = JSON.parse(bloginfo[0].description);

  let doctorinfo = await doctorsmodel.find({ _id: bloginfo[0].doctorid });
  let comments = await commentmodel.find({ blogid });
  let blogs = await blogmodel.find({ type: 0 }).sort({ createdAt: -1 });

  if (formtype) {
    res.render("createblog", {
      bloginfo,
      blogdesc,
      formtype,
    });
  } else if (page) {
    res.render("blogview", {
      bloginfo,
      blogdesc,
      doctorinfo,
      blogs,
      comments,
    });
  } else {
    res.render("viewblog", {
      bloginfo,
      blogdesc,
    });
  }
};

const deleteblogbyid = async (req, res, next) => {
  blogid = req.query.id;
  await blogmodel.findOneAndDelete({ _id: blogid });
  req.flash("success", "blog deleted");

  res.redirect("/alldoctors");
};

const getallblogs = async (req, res) => {
  const allblogs = await blogmodel.find({});
  const reviews = await reviewmodel.find({});

  const doctors = await doctorsmodel.find({ role: 0, visibility: true });
  if (req.query.reqtype == "api") {
    res.status(200).json({
      result: {
        status: 200,
        message: "blogs retrieved successfully",
        data: { allblogs, doctors, reviews },
        error: null,
      },
    });
  } else {
    res.render("blog", {
      allblogs,
      doctors,
    });
  }
};

module.exports = {
  createblog,
  viewblog,
  deleteblogbyid,
  getallblogs,
};
