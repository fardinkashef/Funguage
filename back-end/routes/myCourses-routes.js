const express = require("express");
const router = express.Router();

const myCoursesControllers = require("../controllers/myCourses-controllers");

const checkAuth = require("../middleware/check-auth");

router.use(checkAuth); // To protect the following routes

router.get("/all", myCoursesControllers.getAllCourses);
router.get("/all-ids", myCoursesControllers.getAllCoursesIds);
router.get("/:cid", myCoursesControllers.getCourseById);

//* This function adds a course id to user's enrolledCourses👇:
router.patch("/:cid", myCoursesControllers.courseEnroll);
router.delete("/:cid", myCoursesControllers.courseUnsubscribe);
router.get("/:cid/:sName", myCoursesControllers.getSection);

module.exports = router;
