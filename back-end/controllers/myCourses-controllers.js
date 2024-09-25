const fs = require("fs");
const mongoose = require("mongoose");
const HttpError = require("../models/http-error");

const Course = require("../models/course");
const User = require("../models/user");

const getAllCourses = async (req, res, next) => {
  const userId = req.userId;

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not return the user.",
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError("There's not any user to return.", 404);
    return next(error);
  }

  let enrolledCourses;
  try {
    enrolledCourses = await Promise.all(
      user.enrolledCourses.map(async (courseId) => Course.findById(courseId))
    );
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find the user courses",
      500
    );
    return next(error);
  }

  if (!enrolledCourses) {
    const error = new HttpError(
      "There's not any courses for this user to return.",
      404
    );
    return next(error);
  }
  const coursesData = enrolledCourses.map((course) => ({
    id: course._id,
    name: course.profile.name,
    description: course.profile.description,
  }));
  const coursesProgress = enrolledCourses.map((course) => {
    const totalWordsNum = course.usedDatabaseWordIds.length;
    const learntWordsNum = course.usedDatabaseWordIds.filter((id) =>
      user.learntWordsIds.includes(id)
    ).length;
    return {
      courseId: course._id,
      percentage: Math.round((learntWordsNum / totalWordsNum) * 100),
      learntWordsNum,
      totalWordsNum,
    };
  });

  const response = { coursesData, coursesProgress };

  res.status(200).json(response);
};

const getAllCoursesIds = async (req, res, next) => {
  const userId = req.userId;

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not return the user.",
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError("There's not any user to return.", 404);
    return next(error);
  }

  const response = user.enrolledCourses;

  res.status(200).json(response);
};

const getCourseById = async (req, res, next) => {
  const userId = req.userId;
  const courseId = req.params.cid;

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not return the user.",
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError("There's not any user to return.", 404);
    return next(error);
  }

  let course;
  try {
    course = await Course.findById(courseId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a course.",
      500
    );
    return next(error);
  }

  if (!course) {
    const error = new HttpError(
      "Could not find a course for the provided id.",
      404
    );
    return next(error);
  }

  const sectionsProgress = course.sections.map((section) => {
    const totalWordsNum = section.usedDatabaseWordIds.length;
    const learntWordsNum = section.usedDatabaseWordIds.filter((id) =>
      user.learntWordsIds.includes(id)
    ).length;
    return {
      percentage: (learntWordsNum / totalWordsNum) * 100,
      learntWordsNum,
      totalWordsNum,
    };
  });

  const response = {
    name: course.profile.name,
    description: course.profile.description,
    sections: course.sections.map((section, index) => ({
      name: section.name,
      description: section.description,
      progress: sectionsProgress[index],
    })),
  };
  // res.json({ course: course.toObject({ getters: true }) });
  res.status(200).json(response);
};
const getSection = async (req, res, next) => {
  const userId = req.userId;
  const courseId = req.params.cid;
  const sectionName = req.params.sName;

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not return the user.",
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError("There's not any user to return.", 404);
    return next(error);
  }

  let course;
  try {
    course = await Course.findById(courseId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a course.",
      500
    );
    return next(error);
  }

  if (!course) {
    const error = new HttpError(
      "Could not find a course for the provided id.",
      404
    );
    return next(error);
  }

  const section = course.sections.find(
    (section) => section.name === sectionName
  );
  const extractDatabaseWordListIds = (databaseWordList) =>
    databaseWordList.reduce(
      (acc, databaseWord) => [...acc, databaseWord._id],
      []
    );

  const sectionWordsPairList = section.wordsPairList.filter(
    (pair) =>
      !extractDatabaseWordListIds(pair.databaseWordList).every((id) =>
        user.learntWordsIds.includes(id)
      )
  );

  const reviewWordIds = section.usedDatabaseWordIds.filter(
    (id) => !user.learntWordsIds.includes(id)
  );
  const response = {
    courseName: course.profile.name,
    sectionWordsPairList,
    reviewWordIds,
  };
  // res.json({ course: course.toObject({ getters: true }) });
  res.status(200).json(response);
};

//* This function adds a course id to user's enrolledCourses and responses with new enrolledCourses 👇:
const courseEnroll = async (req, res, next) => {
  const userId = req.userId;
  const courseId = req.params.cid;

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not return the user.",
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError("There's not any user to return.", 404);
    return next(error);
  }
  if (!user.enrolledCourses.includes(courseId))
    user.enrolledCourses.push(courseId);

  try {
    await user.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update user's courses.",
      500
    );
    return next(error);
  }

  const response = user.enrolledCourses;

  res.status(200).json(response);
};
const courseUnsubscribe = async (req, res, next) => {
  const userId = req.userId;
  const courseId = req.params.cid;

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not return the user.",
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError("There's not any user to return.", 404);
    return next(error);
  }

  const newEnrolledCourses = user.enrolledCourses.filter(
    (objectId) => objectId.toString() !== courseId
  );
  user.enrolledCourses = newEnrolledCourses;
  try {
    await user.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update user's courses.",
      500
    );
    return next(error);
  }

  const response = user.enrolledCourses;

  res.status(200).json(response);
};
exports.getAllCourses = getAllCourses;
exports.getAllCoursesIds = getAllCoursesIds;
exports.getCourseById = getCourseById;

exports.getSection = getSection;

exports.courseEnroll = courseEnroll;
exports.courseUnsubscribe = courseUnsubscribe;
