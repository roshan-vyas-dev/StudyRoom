const mongoose = require("mongoose");

const studySessionSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room"
    },
    startedAt: {
        type: Date,
        default: Date.now
    },
    endedAt: {
        type: Date,
        default: null
    }

});


const StudySession = mongoose.model("StudySession",studySessionSchema);

module.exports = StudySession;