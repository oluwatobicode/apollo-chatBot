const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.route("/profile").get(userController.getProfile);
router.route("/profile").patch(userController.updateProfile);

module.exports = router;
