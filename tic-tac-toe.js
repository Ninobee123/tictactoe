document.addEventListener("DOMContentLoaded", () => {
  const gameBoard = document.getElementById("gameBoard");
  const cells = document.querySelectorAll(".cell"); // Fixed typo: querySelectorAll should be used
  const StatusDisplay = document.getElementById("status");
  const NewGameButton = document.getElementById("NewGameButton");
  const resultScreen = document.getElementById("resultScreen");
  const resultMessage = document.getElementById("resultMessage");
  const playAgainButton = document.getElementById("playAgainButton");

  let currentPlayer = "X";
  let gameActive = true;
  let gameState = ["", "", "", "", "", "", "", "", ""];

  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const handleCellClick = (event) => {
    const clickedCell = event.target; // Fixed typo: clickCell should be clickedCell
    const clickedCellIndex = parseInt(clickedCell.getAttribute("data-index"));

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
      return;
    }

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    handleResultValidation();
  };

  const handleResultValidation = () => {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
      const [a, b, c] = winningConditions[i];
      if (
        gameState[a] &&
        gameState[a] === gameState[b] &&
        gameState[a] === gameState[c]
      ) {
        // Fixed comparison logic
        roundWon = true;
        break;
      }
    }

    if (roundWon) {
      resultMessage.textContent = `Player ${currentPlayer} wins!`; // Fixed template literal
      resultScreen.style.display = "flex";
      gameActive = false;
      return;
    }

    const roundDraw = !gameState.includes("");
    if (roundDraw) {
      resultMessage.textContent = "It's a draw!";
      resultScreen.style.display = "flex";
      gameActive = false;
      return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X"; // Fixed typo: "0" to "O"
    StatusDisplay.textContent = `Player ${currentPlayer}'s turn`; // Fixed template literal
  };

  const handleRestartGame = () => {
    currentPlayer = "X"; // Fixed typo: was using an array instead of a string
    gameActive = true;
    gameState = ["", "", "", "", "", "", "", "", ""]; // Reset gameState
    StatusDisplay.textContent = `Player ${currentPlayer}'s turn`;
    cells.forEach((cell) => (cell.textContent = ""));
    resultScreen.style.display = "none";
  };

  cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
  NewGameButton.addEventListener("click", handleRestartGame);
  playAgainButton.addEventListener("click", handleRestartGame);
});
