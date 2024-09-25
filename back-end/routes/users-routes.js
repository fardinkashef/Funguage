const express = require("express");

const { check } = require("express-validator");

const usersController = require("../controllers/users-controllers");

const router = express.Router();

// router.get("/", usersController.getUsers);

router.post(
  "/signup",
  [
    check("email")
      .normalizeEmail() // Test@test.com => test@test.com
      .isEmail(),
    check("userName").isLength({ min: 3 }),
    check("passWord").isLength({ min: 8 }),
  ],
  usersController.signup
);

router.post(
  "/login",
  [
    check("email")
      .normalizeEmail() // Test@test.com => test@test.com
      .isEmail(),
    check("passWord").isLength({ min: 8 }),
  ],
  usersController.login
);
router.post("/:uid/add-words", usersController.addWords);

module.exports = router;
