import React from "react";
import { useSnackbar } from "react-simple-snackbar";

export default function Actions(props) {
  const [openSnackbar] = useSnackbar();

  const getStartPos = () => {
    let rank = new Array(8),
      d = function (num) {
        return Math.floor(Math.random() * ++num);
      },
      emptySquares = function () {
        let arr = [];
        for (let i = 0; i < 8; i++) {
          if (rank[i] === undefined) {
            arr.push(i);
          }
        }
        return arr;
      };
    rank[d(2) * 2] = "B";
    rank[d(2) * 2 + 1] = "B";
    rank[emptySquares()[d(5)]] = "Q";
    rank[emptySquares()[d(4)]] = "N";
    rank[emptySquares()[d(3)]] = "N";
    for (let x = 1; x <= 3; x++) {
      rank[emptySquares()[0]] = x === 2 ? "K" : "R";
    }
    return rank;
  }

  const randomizeStartPos = () => {
    let str = getStartPos().join("");
    let newStartPos = str.toLowerCase() + "/pppppppp/8/8/8/8/PPPPPPPP/" + str + " w KQkq - 0 1";
    props.setStartPos(newStartPos);
  };

  const handleOnFocus = (event) => {
    event.target.select();
    handleCopyAndAlert();
  };

  const handleCopyAndAlert = () => {
    openSnackbar("Copied FEN to clipboard!", 1000);
    navigator.clipboard.writeText(props.startPos);
  };

  return (
    <div>
      <button onClick={randomizeStartPos}>uwu</button>
      <input
        value={props.startPos}
        readOnly
        onFocus={handleOnFocus}
        onClick={handleOnFocus}
      />
      <button onClick={handleCopyAndAlert}>owo</button>
    </div>
  );
}
