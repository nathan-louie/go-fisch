import "./App.css";
import { useState } from "react";
import Chessboard from "chessboardjsx";
import SnackbarProvider from "react-simple-snackbar";
import Actions from "./components/Actions";

function App() {
  const [startPos, setStartPos] = useState(
    "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
  );

  return (
    <SnackbarProvider>
      <div className="App">
        <div className="chessboard">
          <Chessboard
            width={400}
            draggable={false}
            position={startPos}
            boardStyle={{ border: "0.5em solid white" }}
            darkSquareStyle={{ backgroundColor: "#7A98BB" }}
            lightSquareStyle={{ backgroundColor: "#DCE4E9" }}
          />
        </div>
        <Actions startPos={startPos} setStartPos={setStartPos} />
      </div>
    </SnackbarProvider>
  );
}

export default App;
