const StudySession = require("../models/StudySession");
const Room = require("../models/Room");

const startSession = async (req, res) => {

    try {

        const { roomId } = req.body;
        const userId = req.user._id;

        if (!roomId) {
            return res.status(400).json({
                message: "roomId is required"
            });
        }

        const room = await Room.findById(roomId);

        if (!room) {
            return res.status(404).json({
                message: "Room not found"
            });
        }

        const activeSession = await StudySession.findOne({
            user: userId,
            endedAt: null
        });

        if (activeSession) {
            return res.status(400).json({
                message: "User already has an active study session"
            });
        }

        const session = new StudySession({
            user: userId,
            room: roomId
        });

        await session.save();

        return res.status(201).json({
            message: "Study session started",
            session
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

};


const endSession = async (req, res) => {
    try {
        const userId = req.user._id;

        const session = await StudySession.findOne({
            user: userId,
            endedAt: null
        });

        if (!session) {
            return res.status(404).json({
                message: "No active study session found"
            });
        }

        session.endedAt = new Date();

        await session.save();

        return res.status(200).json({
            message: "Study session ended",
            session
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};


module.exports ={startSession,endSession};