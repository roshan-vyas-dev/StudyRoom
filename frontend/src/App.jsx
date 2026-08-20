import socket from "./services/socket";
import { useState, useEffect } from "react";

function App() {
  const [roomId, setRoomId] = useState("");
  const [message, setMessage] = useState("");

  function handleJoinRoom() {
    socket.emit("join-room", roomId);
  }

  useEffect(() => {
    socket.on("join-error", (message) => {
      console.error(message);
    });

    socket.on("user-joined", () => {
      setMessage("A user joined the room");
    });

    return () => {
      socket.off("join-error");
      socket.off("user-joined");
    };
  }, []);

  return (
    <div>
      <h1>app</h1>

      <p>{message}</p>

      <input
        type="text"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      />
      <button onClick={handleJoinRoom}>Join Room</button>
    </div>
  );
}

export default App;
