const express = require("express");

const router = express.Router();

const { createRoom ,getRooms,getOneRoom} = require("../controllers/roomController");

const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createRoom);
router.get("/",protect,getRooms);
router.get("/:id",protect,getOneRoom);


module.exports = router;




