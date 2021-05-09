import "./App.css";
import { useState } from "react";
import Chessboard from "react-simple-chessboard";
import SnackbarProvider from "react-simple-snackbar";
import GameActions from "./components/GameActions";
import Randomize from "./components/Randomize";

function App() {
  const [startPos, setStartPos] = useState(
    "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
  );
  const [lichessLink, setLichessLink] = useState(
    "https://lichess.org/analysis"
  );
  const [minutesPerSide, setMinutesPerSide] = useState(10);
  const [incrementValue, setIncrementValue] = useState(10);

  return (
    <SnackbarProvider>
      <div className="App">
        <div className="header">
          <img src="gofisch.png" alt="Go Fisch" width="200" />
          <p>An easy way to start playing Fischer Random/Chess960 chess.</p>
        </div>
        <div className="main-actions">
          <div className="chessboard">
            <Chessboard position={startPos} />
            <Randomize
              setStartPos={setStartPos}
              setLichessLink={setLichessLink}
              minutesPerSide={minutesPerSide}
              incrementValue={incrementValue}
            />
          </div>
          <GameActions
            startPos={startPos}
            setStartPos={setStartPos}
            minutesPerSide={minutesPerSide}
            incrementValue={incrementValue}
            setMinutesPerSide={setMinutesPerSide}
            setIncrementValue={setIncrementValue}
            lichessLink={lichessLink}
          />
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
