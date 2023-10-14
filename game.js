"use strict";

const gameBoard = (function () {
  let board = [];
  for (let i = 0; i < 9; i++) {
    board.push("");
  }

  const resetBoard = () => {
    board = [];
    for (let i = 0; i < 9; i++) {
      board.push("");
    }
  };

  const getBoard = () => board;

  const setMarker = (e) => {
    if (board[e.id] === "") {
      let marker = players.getActivePlayer().marker;
      getBoard().splice(e.id, 1, marker);
      game.setTurn();
    } else return;
  };

  return { getBoard, setMarker, resetBoard };
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
  const overlay = document.getElementById("overlay");
  const restartBtn = document.getElementById("restart-btn");
  const statusText = document.getElementById("status");
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

  const setStatusText = (text) => {
    statusText.textContent = text;
  };

  const toggleOverlay = () => {
    overlay.classList.toggle("active");
  };

  return { updateGrid, setStatusText, toggleOverlay, restartBtn };
})();

const game = (function () {
  let turns = 0;
  let isWin = false;
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
        screenController.setStatusText("X won!");
        screenController.toggleOverlay();
        isWin = true;
        return;
      }

      const oWins = combo.every((cell) =>
        gameBoard.getBoard()[cell].includes("O")
      );
      if (oWins) {
        screenController.setStatusText("O won!");
        screenController.toggleOverlay();
        isWin = true;
        return;
      }
    });

    if (turns === 9 && !isWin) {
      screenController.setStatusText("Tie!");
      screenController.toggleOverlay();
      return;
    }
    console.log({ turns });
  };

  const playRound = (e) => {
    gameBoard.setMarker(e);
    screenController.updateGrid();
    checkWin();
  };

  const setTurn = () => {
    turns++;
  };

  const restartGame = () => {
    turns = 0;
    isWin = false;
    gameBoard.resetBoard();
    gameBoard.getBoard();
    screenController.updateGrid();
  };

  screenController.restartBtn.addEventListener("click", () => {
    restartGame();
    screenController.toggleOverlay();
  });

  return { checkWin, playRound, setTurn };
})();
