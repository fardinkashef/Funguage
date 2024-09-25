const express = require("express");

const authController = require("../controllers/auth-controllers");

const router = express.Router();

router.get("/loggedin", authController.loggedIn);
router.get("/logout", authController.logOut);

// router.post(
//   "/signup",
//   usersController.signup
// );
// router.post("/login", usersController.login);

module.exports = router;
