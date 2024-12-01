const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const userController = require("../controller/user.contoller");
const { authUser } = require("../middleware/auth.middleware");

router.post(
  "/register",
  [
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters long"),

    body("email").isEmail().withMessage("Invalid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be atleast 6 characters"),
  ],
  userController.registerUser
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be atleast 6 characters"),
  ],
  userController.loginUser
);

router.get("/profile", authUser, userController.getUserProfile);

router.get("/logout", userController.logoutUser);

module.exports = router;
