"use strict";

const gameBoard = (function () {
  const board = [];
  for (let i = 0; i < 9; i++) {
    board.push("");
  }

  const getBoard = () => board;

  const setMarker = (e) => {
    let marker = players.getActivePlayer().marker;

    if (board[e.id] === "") {
      getBoard().splice(e.id, 1, marker);
    } else return;
  };

  return { getBoard, setMarker };
})();

const Player = (marker) => {
  return { marker };
};

const players = (function () {
  const playerOne = Player("X");
  const playerTwo = Player("O");
  let activePlayer = playerOne;

  const getActivePlayer = () => {
    activePlayer = activePlayer === playerOne ? playerTwo : playerOne;

    return activePlayer;
  };

  return { getActivePlayer };
})();

const screenController = (function () {
  const container = document.querySelector(".container");
  container.style.gridTemplateColumns = `repeat(3, 1fr)`;
  const createGrid = (function () {
    for (let i = 0; i < 9; i++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.setAttribute("id", i);
      cell.addEventListener("click", () => {
        game.playRound(cell);
      });
      container.appendChild(cell);
    }
  })();

  const updateGrid = () => {
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell, index) => {
      cell.textContent = gameBoard.getBoard()[index];
    });
  };

  return { updateGrid };
})();

const game = (function () {
  const checkWin = () => {
    const winCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    winCombos.forEach((combo) => {
      const xWins = combo.every((cell) =>
        gameBoard.getBoard()[cell].includes("X")
      );
      if (xWins) {
        alert("X wins");
        return;
      }

      const oWins = combo.every((cell) =>
        gameBoard.getBoard()[cell].includes("O")
      );
      if (oWins) {
        alert("O wins");
        return;
      }
    });
  };

  const playRound = (e) => {
    gameBoard.setMarker(e);
    screenController.updateGrid();
    checkWin();
  };
  return { checkWin, playRound };
})();
