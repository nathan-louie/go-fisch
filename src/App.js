import "./App.css";
import { useState } from "react";
import Chessboard from "react-simple-chessboard";
import SnackbarProvider from "react-simple-snackbar";
import Actions from "./components/Actions";

function App() {
  const [startPos, setStartPos] = useState(
    "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
  );

  return (
    <SnackbarProvider>
      <div className="App">
        <div className="header">
          <img src="gofisch.png" alt="Go Fisch" width="150" />
          <p>An easy way to start playing FischerRandom/Chess960 chess.</p>
        </div>
        <div className="main-actions">
          <div className="chessboard">
            <Chessboard position={startPos} />
          </div>
          <Actions startPos={startPos} setStartPos={setStartPos} />
        </div>
        <div className="footer">
          <p>
            Made by{" "}
            <a
              href="https://nathan.louie.ca/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Nathan
            </a>{" "}
            and{" "}
            <a
              href="https://emily.louie.ca"
              target="_blank"
              rel="noopener noreferrer"
            >
              Emily
            </a>{" "}
            Louie
          </p>
        </div>
      </div>
    </SnackbarProvider>
  );
}

export default App;
