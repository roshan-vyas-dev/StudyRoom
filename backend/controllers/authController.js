const User = require("../models/User");
const generateToken = require("../utils/generateToken");


const registerUser = async (req, res) => {
    try {

        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "Username, email and password are required" });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({ message: "user already existed" });
        }


        const user = await User.create({
            username,
            email,
            password
        });


        return res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }

        });

    } catch (error) {

        console.error("Register user error:", error);

        return res.status(500).json({ message: "Something went wrong while registering the user" });


    }
}


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "email and password are required" })
        }

        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }


        const isPasswordMatch = await user.matchPassword(password);

        if (!isPasswordMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const token = generateToken(user._id);

        return res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { registerUser, loginUser }

