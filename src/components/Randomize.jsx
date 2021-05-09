import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRandom } from "@fortawesome/free-solid-svg-icons";

export default function Actions(props) {
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
      "clock.limit": props.minutesPerSide * 60,
      "clock.increment": props.incrementValue,
      variant: "standard",
      fen: newStartPos,
    });

    makeLichessLink(prms);
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
      props.setLichessLink(responseJson.challenge.url);
    }
  };

  return (
    <div className="main-group">
      <button onClick={randomizeStartPos} className="main-button">
        Randomize
        <FontAwesomeIcon style={{ paddingLeft: "8px" }} icon={faRandom} />
      </button>
    </div>
  );
}
