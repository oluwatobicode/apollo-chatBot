const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();

router.route("/login").post(authController.login);
router.route("/signup").post(authController.signUp);
router.route("/verifyemail").post(authController.verifyEmail);
router.route("/2fa").post(authController.twoFactorAuth);
router.route("/logout").post(authController.logOut);
router.route("/newpassword").post(authController.newPassword);

module.exports = router;
