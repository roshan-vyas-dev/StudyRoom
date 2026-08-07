const User = require("../models/User");
const bcrypt = require("bcryptjs");


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

        const hashedPassword = await bcrypt.hash(password,10);

        const user = await User.create({
            username,
            email,
            password:hashedPassword
        })


        return res.status(201).json({
            message:"User registered successfully",
            user:{
                id:user._id,
                username:user.username,
                email:user.email
            }

        })

    } catch (error) {
       
        console.error("Register user error:", error); 
        
        return res.status(500).json({ message: "Something went wrong while registering the user" });


    }
}

module.exports ={registerUser}

