import React from "react";
import { useSnackbar } from "react-simple-snackbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard } from "@fortawesome/free-regular-svg-icons";
import { faChessKnight } from "@fortawesome/free-solid-svg-icons";
import Slider, { SliderTooltip } from "rc-slider";
import "rc-slider/assets/index.css";

const { Handle } = Slider;

const handle = (props) => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <SliderTooltip
      prefixCls="rc-slider-tooltip"
      overlay={`${value} mins`}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle value={value} {...restProps} />
    </SliderTooltip>
  );
};

const handle2 = (props) => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <SliderTooltip
      prefixCls="rc-slider-tooltip"
      overlay={`${value} secs`}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle value={value} {...restProps} />
    </SliderTooltip>
  );
};

export default function GameActions(props) {
  const [openSnackbar] = useSnackbar();

  const handleOnFocus = (event) => {
    event.target.select();
    handleCopyAndAlert();
  };

  const handleCopyAndAlert = () => {
    openSnackbar("Copied FEN to clipboard!", 1000);
    navigator.clipboard.writeText(props.startPos);
  };

  const handleLichess = (e) => {
    e.preventDefault();
    window.open(props.lichessLink, "_blank");
  };

  return (
    <div className="actions">
      <div className="main-group">
        <h1>Create a game</h1>
        <label>Minutes per side:</label>
        <Slider
          min={1}
          max={180}
          defaultValue={props.minutesPerSide}
          handleStyle={{
            borderColor: "#378bfb",
            backgroundColor: "white",
          }}
          activeDotStyle={{
            borderColor: "#378bfb",
            backgroundColor: "#378bfb",
          }}
          trackStyle={{ backgroundColor: "#378bfb", height: 5 }}
          marks={{
            20: 20,
            40: 40,
            60: 60,
            80: 80,
            100: 100,
            120: 120,
            140: 140,
            160: 160,
            180: 180,
          }}
          handle={handle}
          onChange={(value) => props.setMinutesPerSide(value)}
        />

        <label>Increment in seconds:</label>
        <Slider
          min={0}
          max={180}
          defaultValue={props.incrementValue}
          handleStyle={{
            borderColor: "#378bfb",
            backgroundColor: "white",
          }}
          activeDotStyle={{
            borderColor: "#378bfb",
            backgroundColor: "#378bfb",
          }}
          trackStyle={{ backgroundColor: "#378bfb", height: 5 }}
          marks={{
            0: 0,
            20: 20,
            40: 40,
            60: 60,
            80: 80,
            100: 100,
            120: 120,
            140: 140,
            160: 160,
            180: 180,
          }}
          handle={handle2}
          onChange={(value) => props.setIncrementValue(value)}
        />

        <button onClick={handleLichess} className="main-button">
          Play on Lichess
          <FontAwesomeIcon
            style={{ paddingLeft: "8px" }}
            icon={faChessKnight}
          />
        </button>
      </div>

      <div className="copy-group">
        <label>Take this position somewhere else!</label>
        <div className="copy-link">
          <input
            className="fen-field"
            value={props.startPos}
            readOnly
            onFocus={handleOnFocus}
            onClick={handleOnFocus}
          />
          <button onClick={handleCopyAndAlert} className="copy-button">
            <FontAwesomeIcon icon={faClipboard} />
          </button>
        </div>
      </div>
    </div>
  );
}
