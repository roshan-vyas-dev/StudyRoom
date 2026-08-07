const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 20
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true

    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        select: false
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"

    },
    bio: {
        type: String,
        trim: true,
        default: ""

    },
    profilePic: {
        type: String,
        default: ""
    }

}, { timestamps: true });

userSchema.pre("save", async function () {
    if (!this.isModified("password")) {
        return;
    }

    this.password = await bcrypt.hash(this.password, 10);
});


userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};


const User = mongoose.model("User", userSchema);

module.exports = User;