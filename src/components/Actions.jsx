import React from "react";
import { useState } from "react";
import { useSnackbar } from "react-simple-snackbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard } from "@fortawesome/free-regular-svg-icons";
import { faRandom, faChessKnight } from "@fortawesome/free-solid-svg-icons";
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

export default function Actions(props) {
  const [openSnackbar] = useSnackbar();
  const [lichessLink, setLichessLink] = useState(
    "https://lichess.org/analysis"
  );
  const [minutesPerSide, setMinutesPerSide] = useState(10);
  const [incrementValue, setIncrementValue] = useState(10);

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
  };

  const randomizeStartPos = () => {
    let str = getStartPos().join("");
    let newStartPos =
      str.toLowerCase() + "/pppppppp/8/8/8/8/PPPPPPPP/" + str + " w KQkq - 0 1";
    props.setStartPos(newStartPos);

    let prms = new URLSearchParams({
      rated: false,
      "clock.limit": minutesPerSide * 60,
      "clock.increment": incrementValue,
      variant: "standard",
      fen: newStartPos,
    });

    makeLichessLink(prms);
  };

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
    window.open(lichessLink, "_blank");
  };

  const makeLichessLink = async (data) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: data,
    };
    const response = await fetch(
      `https://lichess.org/api/challenge/open`,
      requestOptions
    );
    const responseJson = await response.json();
    if (responseJson) {
      setLichessLink(responseJson.challenge.url);
    }
  };

  return (
    <div className="actions">
      <div className="main-group">
        <button onClick={randomizeStartPos} className="main-button">
          Randomize
          <FontAwesomeIcon style={{ "padding-left": "8px" }} icon={faRandom} />
        </button>
        <label>Minutes per side:</label>
        <Slider
          min={1}
          max={180}
          defaultValue={minutesPerSide}
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
          onChange={(value) => setMinutesPerSide(value)}
        />

        <label>Increment in seconds:</label>
        <Slider
          min={0}
          max={180}
          defaultValue={incrementValue}
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
          onChange={(value) => setIncrementValue(value)}
        />

        <button onClick={handleLichess} className="main-button">
          Play on Lichess
          <FontAwesomeIcon
            style={{ "padding-left": "8px" }}
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
