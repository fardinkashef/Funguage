// This library helps us with hashing passwords. We don't want passwords to be plain text.
const bcrypt = require("bcrypt");
// This library helps us with creating token
const jwt = require("jsonwebtoken");

const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const User = require("../models/user");

//////////////////////////////////////////////////////////
const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, "-passWord");
  } catch (err) {
    const error = new HttpError(
      "Fetching users failed, please try again later.",
      500
    );
    return next(error);
  }
  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

//////////////////////////////////////////////////////////

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }

  const { userName, email, passWord } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError(
      "User exists already, please login instead.",
      422
    );
    return next(error);
  }
  // Let's hash our passWord
  let hashedPassword;

  try {
    hashedPassword = await bcrypt.hash(passWord, 12);
  } catch (err) {
    const error = new HttpError(
      "Could not create user, please try again.",
      500
    );
    return next(error);
  }
  // Let's hash our passWord

  const createdUser = new User({
    userName,
    email,
    // image: "https://live.staticflickr.com/7631/26849088292_36fc52ee90_b.jpg",
    passWord: hashedPassword,
    // places: [],
    // courses: [],
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError("Signing up failed, please try again.", 500);
    return next(error);
  }

  let token;
  try {
    token = jwt.sign({ userId: createdUser._id }, "supersecret_dont_share", {
      expiresIn: "24h",
    });
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }
  /////////////
  // send the token in a HTTP-only cookie
  res
    .cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    })
    .send();
};

//////////////////////////////////////////////////////////

const login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }

  const { email, passWord } = req.body;
  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Logging in failed, please try again later.",
      500
    );
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      401
    );
    return next(error);
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(passWord, existingUser.passWord);
  } catch (err) {
    const error = new HttpError(
      "Could not log you in, please check your credentials and try again.",
      500
    );
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      403
    );
    return next(error);
  }

  let token;
  try {
    token = jwt.sign({ userId: existingUser._id }, "supersecret_dont_share", {
      expiresIn: "24h",
    });
  } catch (err) {
    const error = new HttpError(
      "Logging in failed, please try again later.",
      500
    );
    return next(error);
  }

  // send the token in a HTTP-only cookie
  res
    .cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    })
    .send();
};
////////////

const addWords = async (req, res, next) => {
  const userId = req.params.uid;
  const masteredWordsIds = req.body.masteredWordsIds;

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

  let newLearntWordsIds = [...user.learntWordsIds, ...masteredWordsIds];
  // Removing duplicate items:
  newLearntWordsIds = Array.from(new Set(newLearntWordsIds));
  user.learntWordsIds = newLearntWordsIds;
  try {
    user.save();
  } catch (err) {
    const error = new HttpError(
      "Some thing went wrong with saving new learnt words.",
      500
    );
    return next(error);
  }
  res.status(200);
};

//////////
exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
exports.addWords = addWords;
