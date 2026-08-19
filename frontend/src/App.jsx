import socket from "./services/socket";
import { useState ,useEffect} from "react";



function App() {

  const [roomId, setRoomId] = useState("");

  function handleJoinRoom() {
    socket.emit("join-room", roomId)

  }
  
  useEffect(() => {
    socket.on("join-error", (message) => {
      console.error(message);
    });
  }, [])

  return (
    <div>
      <h1>app</h1>

      <input type="text" value={roomId} onChange={(e) => setRoomId(e.target.value)} />
      <button onClick={handleJoinRoom}>Join Room</button>

    </div>

  )
}

export default App
