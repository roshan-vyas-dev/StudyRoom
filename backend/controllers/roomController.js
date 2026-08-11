const Room = require("../models/Room");


const createRoom = async (req, res) => {

    try {

        const { title } = req.body;

        if (!title) {
            return res.status(400).json({ message: "Title is required" });
        }

        const room = await Room.create({
            title,
            createdBy: req.user._id
        });

        return res.status(201).json({
            message: "Room created successfully",
            room: {
                title: room.title,
                createdBy: room.createdBy
            }
        });


    } catch (error) {
        res.status(500).json({ message: error.message });

    }



}


const getRooms = async (req, res) => {
    try {

        const rooms = await Room.find().populate("createdBy", "username profilePic");

        return res.status(200).json({ 
            message: "Rooms retrieved successfully",
            rooms 
        });

    } catch (error) {
       return res.status(500).json({
            message: error.message});
    }

}

module.exports = { createRoom, getRooms };


