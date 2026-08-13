require("dotenv").config();



const app = require("./app");
const http = require("http");
const connectDB = require("./config/db");

const { Server } = require("socket.io");

connectDB();


const server = http.createServer(app);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
})

// socket

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173"
    }
});




io.on("connection", (socket) => {
    console.log("User connected :", socket.id);

    socket.on("join-room", (roomId) => {
        socket.join(roomId);

        console.log("User joined room:", roomId);

        socket.to(roomId).emit("user-joined");
    });

})

