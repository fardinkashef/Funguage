const fs = require("fs");
const path = require("path");
const multer = require("multer");

const sectionProfileImageUpload = multer({
  storage: multer.diskStorage({
    destination: async (req, file, cb) => {
      const { courseName } = req.body;
      fs.mkdir(
        path.join(
          __dirname,
          "..",
          "static-files",
          "profile-images",
          "sections",
          `${courseName}`
        ),
        { recursive: true },
        (err) => {
          if (err) {
            return console.error(err);
          } else {
            console.log("Directory created successfully!");
            cb(null, `static-files/profile-images/sections/${courseName}`);
          }
        }
      );
    },
    filename: (req, file, cb) => {
      const { sectionName } = req.body;
      // cb(null, file.originalname);
      cb(null, `${sectionName}.jpg`);
    },
  }),
});

module.exports = sectionProfileImageUpload;
