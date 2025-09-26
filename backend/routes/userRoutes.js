const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const router = express.Router();

router.use(authController.protectedRoutes);

router.route("/:id").get(userController.getProfile);
router.route("/profile").patch(userController.updateProfile);

module.exports = router;
