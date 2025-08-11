const express = require("express");
const conversationController = require("../controllers/conversationController");
const router = express();

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
