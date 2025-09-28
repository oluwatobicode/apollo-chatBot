const express = require("express");
const conversationController = require("../controllers/conversationController");
const authController = require("../controllers/authController");
const messageController = require("../controllers/messageController");
const router = express.Router();

// this will apply authentication to ALL our routes in this router
router.use(authController.protectedRoutes);

// Now all our routes will be automatically protected
router
  .route("/")
  .post(conversationController.createConversation)
  .get(conversationController.getAllConversation);

router
  .route("/:id")
  .get(conversationController.getConversationById)
  .post(messageController.createMessage)
  .delete(conversationController.deleteConversation);

router.route("/:id/upload").post(messageController.uploadImage);

module.exports = router;
