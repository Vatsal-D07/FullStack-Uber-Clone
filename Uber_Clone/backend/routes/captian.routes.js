const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const captainController = require("../controller/captain.controller");
const { authCaptain } = require("../middleware/auth.middleware");

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .not()
      .isEmpty()
      .withMessage("First name must be at least 3 characters"),
    body("password").not().isEmpty().withMessage("Password is required"),
    body("vehicle.color").not().isEmpty().withMessage("Color is required"),
    body("vehicle.plate").not().isEmpty().withMessage("Plate is required"),
    body("vehicle.capacity")
      .not()
      .isEmpty()
      .withMessage("Capacity is required"),
    body("vehicle.vehicleType")
      .isIn(["car", "motorcycle", "auto"])
      .not()
      .isEmpty()
      .withMessage("Vehicle Type is required"),
  ],
  captainController.registerCaptain
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("password").not().isEmpty().withMessage("Password is required"),
  ],
  captainController.loginCaptain
);

router.get("/profile", authCaptain, captainController.getCaptainProfile);

router.get("/logout", authCaptain, captainController.logoutCaptain);

module.exports = router;
