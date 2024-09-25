const fs = require("fs");
const path = require("path");
const multer = require("multer");

const courseProfileImageUpload = multer({
  storage: multer.diskStorage({
    destination: async (req, file, cb) => {
      fs.mkdir(
        path.join(__dirname, "..", "static-files", "profile-images", "courses"),
        { recursive: true },
        (err) => {
          if (err) {
            return console.error(err);
          } else {
            console.log("Directory created successfully!");
            cb(null, `static-files/profile-images/courses`);
          }
        }
      );
    },
    filename: (req, file, cb) => {
      const { courseName } = req.body;
      cb(null, `${courseName}.jpg`);
    },
  }),
});

module.exports = courseProfileImageUpload;
