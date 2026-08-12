const express = require("express");

const router = express.Router();

const { createRoom ,getRooms,getOneRoom,updateRoom,deleteRoom} = require("../controllers/roomController");

const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createRoom);
router.get("/",protect,getRooms);
router.get("/:id",protect,getOneRoom);
router.patch("/:id",protect,updateRoom);
router.delete("/:id",protect,deleteRoom);



module.exports = router;




