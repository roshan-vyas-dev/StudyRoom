const express = require("express");

const router = express.Router();

const { startSession,endSession } = require("../controllers/studySessionController");

const { protect } = require("../middleware/authMiddleware");


router.post("/start", protect, startSession);
router.post("/end", protect, endSession);


module.exports = router;

