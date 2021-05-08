import React from "react";
import { useSnackbar } from "react-simple-snackbar";

export default function Actions(props) {
  const [openSnackbar] = useSnackbar();

  const randomizeStartPos = () => {
    let newStartPos = "";
    // create function here
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
