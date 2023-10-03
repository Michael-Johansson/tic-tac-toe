"use strict";

// Game board
const gameBoard = (function () {
  const rows = 3;
  const columns = 3;
  const board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push("");
    }
  }

  const getWholeBoard = () => board[0].concat(board[1], board[2]);
  const boardLength = getWholeBoard().length;

  return { getWholeBoard, boardLength };
})();

//Player factory
const Player = (playerNum, marker) => {
  return { playerNum, marker };
};

const players = (function () {
  const playerOne = Player("1", "X");
  const playerTwo = Player("2", "O");
  let currentPlayer = playerOne;

  const updateCurrentPlayer = () => {
    return (currentPlayer =
      currentPlayer === playerOne ? playerTwo : playerOne);
  };

  let currenPlayerMarker = () => {
    return updateCurrentPlayer().marker;
  };

  return { playerOne, playerTwo, updateCurrentPlayer, currenPlayerMarker };
})();

// Game flow
const game = (function () {
  const board = gameBoard.getWholeBoard();

  const placeMarker = (marker, position) => {
    board.splice(position, 1, marker);
    console.log(board);
  };
  return { placeMarker, board };
})();

//Display controller
const displayControl = (function () {
  const generateGrid = (function (gridSize) {
    const container = document.querySelector(".container");
    container.style.gridTemplateColumns = `repeat(${gridSize / 3}, 1fr)`;

    for (let i = 0; i < gridSize; i++) {
      const cell = document.createElement("div");
      cell.dataset.position = i;
      cell.addEventListener("click", (e) => {
        const position = e.target.dataset.position;

        game.placeMarker(players.currenPlayerMarker(), position);
      });

      cell.classList.add("cell");
      container.appendChild(cell);
    }
  })(gameBoard.boardLength);

  return { generateGrid };
})();
