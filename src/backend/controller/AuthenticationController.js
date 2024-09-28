const bcrypt = require("bcryptjs");
const doctormodel = require("../models/doctormodel");

const logout = (req, res) => {
  req.session.destroy();
  res.redirect("/adminlogin");
};

const checksession = (req, res, next) => {
  if (!req.session.user) {
    res.redirect("/adminlogin");
  } else {
    next();
  }
};

const redirecthome = (req, res, next) => {
  if (req.session.user) {
    res.redirect("/dashboard");
  } else {
    next();
  }
};

const login = async (req, res) => {
  if (req.body.email && req.body.password) {
    const finduser = await doctormodel.findOne({ doctorEmail: req.body.email,visibility:true });
    if (finduser) {
      const match = await bcrypt.compare(req.body.password, finduser.password);
      if (match) {
        req.session.user = finduser;
        req.flash("success", "login successful");
        res.redirect("/dashboard");
      } else {
        req.flash("error", "Invalid credentials");
        res.redirect("/adminlogin");
      }
    } else {
      req.flash("error", "Invalid credentials");
      res.redirect("/adminlogin");
    }
  }
};


const changePassword = async (req, res) => {
	if(req.body.new_password === req.body.confirm_password){
		const user = await doctormodel.findOne({ _id: req.params.id })
		user.password = req.body.new_password;
		await user.save();
		
		req.flash("success" , 'Password Changed Successfully');
		res.redirect(`/doctorprofile/${req.params.id}`); 
	} else {
		req.flash("error" , 'Passwords do not match');
    res.redirect(`/doctorprofile/${req.params.id}`);
	}
}

module.exports = {
  login,
  redirecthome,
  checksession,
  logout,
  changePassword
};
