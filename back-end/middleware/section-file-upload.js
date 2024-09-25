const fs = require("fs");
const path = require("path");
const multer = require("multer");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
  "video/mp4": "mp4",
};

const sectionFileUpload = multer({
  // limits: 500000,
  storage: multer.diskStorage({
    destination: async (req, file, cb) => {
      const { courseName, sectionName, fileType } = req.body;
      fs.mkdir(
        path.join(
          __dirname,
          "..",
          "static-files",
          "courses-files",
          `${courseName}`,
          `${sectionName}`
        ),
        { recursive: true },
        (err) => {
          if (err) {
            return console.error(err);
          } else {
            console.log("Directory created successfully!");
            cb(null, `static-files/courses-files/${courseName}/${sectionName}`);
          }
        }
      );
    },
    filename: (req, file, cb) => {
      const { sectionName, fileType } = req.body;
      // const ext = MIME_TYPE_MAP[file.mimetype];
      // cb(null, file.originalname);
      const fileExtension = fileType === "subtitle" ? "vtt" : "mp4";
      cb(null, `${sectionName}.${fileExtension}`);
    },
    // filename: (req, file, cb) => {
    //   const ext = MIME_TYPE_MAP[file.mimetype];
    //   cb(null, uuid() + "." + ext);
    // },
  }),
  // fileFilter: (req, file, cb) => {
  //   const isValid = !!MIME_TYPE_MAP[file.mimetype];
  //   let error = isValid ? null : new Error("Invalid mime type!");
  //   cb(error, isValid);
  // },
});

module.exports = sectionFileUpload;
