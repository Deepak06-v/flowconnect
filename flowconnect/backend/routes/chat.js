const router = require("express").Router();
const { getMessages, sendMessage } = require("../controllers/chat.controller");
const { authenticateUser } = require("../middleware/auth");

router.get("/", authenticateUser, getMessages);
router.post("/", authenticateUser, sendMessage);

module.exports = router;
