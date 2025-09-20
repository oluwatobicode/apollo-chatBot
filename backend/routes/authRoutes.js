const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();

router.route("/login").post(authController.login);
router.route("/signup").post(authController.signUp);
router.route("/forgot-password").post(authController.forgotPassword);
router.route("/reset-password/:token").post(authController.resetPassword);
router.route("/logout").post(authController.logOut);

module.exports = router;
