const express = require("express");
const conversationController = require("../controllers/conversationController");
const authController = require("../controllers/authController");
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
  .delete(conversationController.deleteConversation);

router.route("/:id/messages").post(conversationController.sendMessage);

module.exports = router;
