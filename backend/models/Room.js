const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 20
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }


}, { timestamps: true });


const Room = mongoose.model("Room", roomSchema);

module.exports = Room;

