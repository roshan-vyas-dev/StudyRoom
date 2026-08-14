const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const roomRoutes = require("./routes/roomRoutes");
const studySessionRoutes = require("./routes/studySessionRoutes");



const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth",authRoutes);
app.use("/api/users",userRoutes);
app.use("/api/rooms",roomRoutes);
app.use("/api/study-sessions",studySessionRoutes);





app.get("/",(req,res)=>{
    res.send("Studyroom API is running");
});

module.exports=app;





