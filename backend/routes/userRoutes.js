const express = require("express");

const router = express.Router();

const {getMyProfile,updateMyProfile} = require("../controllers/userController");

const {protect} = require("../middleware/authMiddleware");


router.get("/me",protect,getMyProfile);
router.patch("/me",protect,updateMyProfile);


module.exports = router;

