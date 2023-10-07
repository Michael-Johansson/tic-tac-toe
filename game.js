"use strict";

const container = document.querySelector(".container");
container.style.gridTemplateColumns = `repeat(${9 / 3}, 1fr)`;

const gameBoard = (function () {
  const board = [];

  for (let i = 0; i < 9; i++) {
    board.push("");
  }

  const getBoard = () => board;

  const setMarker = (player, index) => {
    board.splice(index, 1, player);
  };

  return { setMarker, getBoard };
})();

const Player = (marker) => {
  return { marker };
};

const players = (function () {
  const playerOne = Player("X");
  const playerTwo = Player("O");
  const activePlayer = playerOne;

  const setActivePlayer = () => {
    activePlayer = activePlayer === playerOne ? playerTwo : playerOne;
  };

  const getActivePlayer = () => activePlayer;

  return { setActivePlayer, getActivePlayer };
})();

const displayControl = (function () {
  const createGrid = (function () {
    for (let i = 0; i < 9; i++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      container.appendChild(cell);
    }
  })();

  const renderGrid = () => {
    container.childNodes.forEach((cell, index) => {
      cell.textContent = gameBoard.getBoard()[index];
    });
  };

  return { renderGrid };
})();
