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
        <div className="chessboard">
          <Chessboard position={startPos} />
        </div>
        <Actions startPos={startPos} setStartPos={setStartPos} />
      </div>
    </SnackbarProvider>
  );
}

export default App;
