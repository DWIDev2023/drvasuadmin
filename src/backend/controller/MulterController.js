const multer = require("multer");
const path = require("path");

let storage = multer.diskStorage({
  filename: function (req, file, callback) {
    let filename = Date.now() + file.originalname;
    req.filename = filename
    // console.log("file: ", filename);

    callback(null, filename);
  },
  destination: function (req, file, callback) {
    // console.log("path: ", path.dirname("../"));
    // console.log(path.dirname("./"));
    // console.log(path.dirname(__dirname));
    callback(
      null,
      path.join(path.dirname(__dirname) + "../../client/staticfiles/uploads")
    );
    // path.join(__dirname + "/userData")
  },
});

let multerinit = multer({
  storage: storage,
});

function uploadfile(req, res, next) {
  // let upload = multerinit.single("myfile");
  let upload = multerinit
  .fields(
    [
        {
            name:'myfile',
            maxCount:1
        },
    ]
);
  upload(req, res, next);
}

module.exports = {
  uploadfile,
};
