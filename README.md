# gofisch
I got hooked on playing chess ever since the pandemic started. I wanted a way to play Fischer Random chess, but there was no convenient way to do so on any popular chess websites. Thus, I made my own website to help others more easily play Fischer Random chess.

You can see the live project [here](https://gofisch.netlify.app).

## What is Fischer Random Chess?
Fischer Random chess, also known as Chess960, is a variation of chess invented by Bobby Fischer. The deviation from regular chess is that the starting position of the pieces on the back ranks is randomized following certain rules.
* The bishops must be placed on opposite-colour squares
* The King must be placed on a square between the rooks

# Features

In gofisch, users can randomize the starting position until they get one that they like.

Then, they can invite a friend to play a game from that starting position on Lichess.

Or, they can copy the FEN position to play a game from that starting position on another chess website.

# Stack
* This project was bootstrapped with Create React App
* Utilized the [Lichess](https://lichess.org/api) API for the open challenge creation
* Used [react-simple-chessboard](https://www.npmjs.com/package/react-simple-chessboard) for displaying the chessboard