// This library helps us with hashing passwords. We don't want passwords to be plain text.
const bcrypt = require("bcrypt");
// This library helps us with creating token
const jwt = require("jsonwebtoken");

const HttpError = require("../models/http-error");
const User = require("../models/user");

//////////////////////////////////////////////////////////

// const signup = async (req, res, next) => {
//   const { userName, email, passWord } = req.body;

//   let existingUser;
//   try {
//     existingUser = await User.findOne({ email: email });
//   } catch (err) {
//     const error = new HttpError(
//       "Signing up failed, please try again later.",
//       500
//     );
//     return next(error);
//   }

//   if (existingUser) {
//     const error = new HttpError(
//       "User exists already, please login instead.",
//       422
//     );
//     return next(error);
//   }
//   // Let's hash our passWord
//   let hashedPassword;

//   try {
//     hashedPassword = await bcrypt.hash(passWord, 12);
//   } catch (err) {
//     const error = new HttpError(
//       "Could not create user, please try again.",
//       500
//     );
//     return next(error);
//   }
//   // Let's hash our passWord

//   const createdUser = new User({
//     userName,
//     email,
//     // image: "https://live.staticflickr.com/7631/26849088292_36fc52ee90_b.jpg",
//     passWord: hashedPassword,
//     // places: [],
//     // courses: [],
//   });

//   try {
//     await createdUser.save();
//   } catch (err) {
//     const error = new HttpError("Signing up failed, please try again.", 500);
//     return next(error);
//   }
//   // I think we don't need to creat a token in sign up because in front end immediatly after sign up , we do log in and after logging in the token will be created. I don't actually use this sign up token now (actually I don't use sign up response at all)
//   let token;
//   try {
//     token = jwt.sign(
//       { userId: createdUser.id, email: createdUser.email },
//       "supersecret_dont_share",
//       { expiresIn: "1h" }
//     );
//   } catch (err) {
//     const error = new HttpError(
//       "Signing up failed, please try again later.",
//       500
//     );
//     return next(error);
//   }
//   /////////////
//   res
//     .status(201)
//     .json({ userId: createdUser.id, email: createdUser.email, token: token });
// };

//////////////////////////////////////////////////////////

// const login = async (req, res, next) => {
//   const { email, passWord } = req.body;
//   let existingUser;

//   try {
//     existingUser = await User.findOne({ email: email });
//   } catch (err) {
//     const error = new HttpError(
//       "Logging in failed, please try again later.",
//       500
//     );
//     return next(error);
//   }

//   if (!existingUser) {
//     const error = new HttpError(
//       "Invalid credentials, could not log you in.",
//       401
//     );
//     return next(error);
//   }

//   let isValidPassword = false;
//   try {
//     isValidPassword = await bcrypt.compare(passWord, existingUser.passWord);
//   } catch (err) {
//     const error = new HttpError(
//       "Could not log you in, please check your credentials and try again.",
//       500
//     );
//     return next(error);
//   }

//   if (!isValidPassword) {
//     const error = new HttpError(
//       "Invalid credentials, could not log you in.",
//       403
//     );
//     return next(error);
//   }

//   let token;
//   try {
//     token = jwt.sign(
//       { userId: existingUser.id, email: existingUser.email },
//       "supersecret_dont_share",
//       { expiresIn: "1h" }
//     );
//   } catch (err) {
//     const error = new HttpError(
//       "Logging in failed, please try again later.",
//       500
//     );
//     return next(error);
//   }

//   res.json({
//     userId: existingUser.id,
//     email: existingUser.email,
//     token: token,
//   });
// };
////////////
const loggedIn = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.json({ loggedIn: false });
  try {
    const verifiedToken = jwt.verify(token, "supersecret_dont_share");
    const { userId } = verifiedToken;
    const existingUser = await User.findById(userId);

    if (!existingUser) {
      const error = new HttpError("Couldn't find a user", 422);
      return next(error);
    }

    const response = { loggedIn: true, userName: existingUser.userName };
    res.json(response);
  } catch (err) {
    res.json({ loggedIn: false });
  }
};

const logOut = async (req, res, next) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
      secure: true,
      sameSite: "none",
    })
    .send();
};
//////////
// exports.signup = signup;
// exports.login = login;
exports.loggedIn = loggedIn;
exports.logOut = logOut;
