const express = require("express");
const router = express.Router();

const coursesControllers = require("../controllers/courses-controllers");
const sectionFileUpload = require("../middleware/section-file-upload");

const courseProfileImageUpload = require("../middleware/course-profile-image-upload");
const sectionProfileImageUpload = require("../middleware/section-profile-image-upload");

const checkAuth = require("../middleware/check-auth");

router.get("/all", coursesControllers.getAllCourses);
router.get("/:cid", coursesControllers.getCourseById);
router.get("/:cid/:sName", coursesControllers.getSection);

// Checking auth
//// !!! I temperarily disabled auth check because I want to first finish the course create part
// router.use(checkAuth);
// router.post("/new", coursesControllers.createCourse);

/////// Let's only check if we can save the files
router.post(
  "/new/section",
  sectionFileUpload.single("file"),
  coursesControllers.fileSaved
);
router.post("/", coursesControllers.createCourse);
//////////////////
//* Routes for uploading files 👇:
router.post(
  "/upload/course-profile-image",
  courseProfileImageUpload.single("file"),
  coursesControllers.fileSaved
);
router.post(
  "/upload/section-profile-image",
  sectionProfileImageUpload.single("file"),
  coursesControllers.fileSaved
);

////////////
// router.post("/words", coursesControllers.words);
// router.post(
//   "/new/profile",
//   courseProfileImageUpload.single("image"),
//   coursesControllers.createCourseProfile
// );

/////// Let's check if we can save the files

// router.post(
//   "/",
//   fileUpload.single("image"),

//   [
//     check("word").not().isEmpty(),
//     // check("description").isLength({ min: 5 }),
//     // check("address").not().isEmpty(),
//   ],
//   coursesControllers.createCourse
// );

// router.patch(
//   "/:cid",
//   [
//     check("word").not().isEmpty(),
//     // check("description").isLength({ min: 5 })
//   ],
//   coursesControllers.updateCourse
// );

// router.delete("/:cid", coursesControllers.deleteCourse);

module.exports = router;
