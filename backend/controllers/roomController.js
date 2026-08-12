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
            message: error.message
        });
    }

}

const getOneRoom = async (req, res) => {

    try {

        const { id } = req.params;

        const room = await Room.findById(id).populate("createdBy", "username profilePic");

        if (!room) {
            return res.status(404).json({ message: "Room not found" })
        }

        return res.status(200).json({
            message: "Room retrieved successfully",
            room
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const updateRoom = async (req, res) => {

    try {

        const { id } = req.params;

        const { title } = req.body;

        if (!title) {
            return res.status(400).json({
                message: "Title is required"
            });
        }

        const room = await Room.findById(id);

        if (!room) {
            return res.status(404).json({ message: "Room not found" })
        }

        if (!room.createdBy.equals(req.user._id)) {
            return res.status(403).json({ message: "Not allowed to update this room" })

        }

        room.title = title;

        await room.save();

        await room.populate("createdBy", "username profilePic");

        return res.status(200).json({
            message: "Room title updated",
            room
        })

    } catch (error) {

        if (error.name === "ValidationError") {
            return res.status(400).json({
                message: error.message
            });
        }

        return res.status(500).json({
            message: error.message
        });

    }
}


const deleteRoom = async (req, res) => {

    try{

        const {id} = req.params;

        const room = await Room.findById(id);

        if(!room){
            return res.status(404).json({message:"Room not found"});
        }

        if(!room.createdBy.equals(req.user._id)){
            return res.status(403).json({message:"Not allowed to delete the room"})
        }

        await room.deleteOne();

        return res.status(200).json({
            message:"Room deleted  Successfully "
        })

        




    }catch(error){
        return res.status(500).json({message:error.message});
    }

}

module.exports = { createRoom, getRooms, getOneRoom, updateRoom,deleteRoom };


