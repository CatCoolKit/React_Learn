import { useEffect, useState } from "react";
import "./App.css";
import io from "socket.io-client";
import Input from "./components/input";

function App() {
  const [score, setScore] = useState({});
  const [scores, setAllScores] = useState([]);
  const socket = io("http://localhost:3000");

  function connectSocket() {
    socket.on("connection", (socket) => {
      console.log(socket);
    });
  }

  function handleInput(event) {
    let { name, value } = event.target;
    let currentObj = { [name]: value };

    setScore((prev) => ({ ...prev, ...currentObj }));
  }

  function sendScores() {
    socket.emit("scores", score);

    socket.on("playerScores", (data) => {
      setAllScores(data);
    });
  }

  useEffect(() => {
    connectSocket();
  }, []);

  return (
    <>
      <h1>React Multiplayer Dashboard</h1>

      <Input
        name="name"
        placeholder="Enter your Name"
        handleInput={handleInput}
      />
      <Input
        name="score"
        placeholder="Enter your Score"
        handleInput={handleInput}
      />

      <button className="send-scores" onClick={sendScores}>
        Send Scores
      </button>

      {scores.length > 0 ? (
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th>Score</th>
            </tr>

            {scores.map((score, index) => (
              <tr key={score.id || index}>
                <td>{score?.name}</td>
                <td>{score?.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <></>
      )}
    </>
  );
}

export default App;
