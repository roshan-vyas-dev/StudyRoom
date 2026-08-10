const express = require("express");

const router = express.Router();

const { createRoom } = require("../controllers/roomController");

const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createRoom);


module.exports = router;




