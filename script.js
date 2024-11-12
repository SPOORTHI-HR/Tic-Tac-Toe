const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restart');
let currentPlayer = "X";
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];
const winConditions = [
[0, 1, 2],
[3, 4, 5],
[6, 7, 8],
[0, 3, 6],
[1, 4, 7],
[2, 5, 8],
[0, 4, 8],
[2, 4, 6]
];
const handleCellClick = (e) => {
const clickedCell = e.target;
const clickedCellIndex = clickedCell.getAttribute('data-index');
if (gameState[clickedCellIndex] !== "" || !gameActive) {
return;
}
updateCell(clickedCell, clickedCellIndex);
checkResult();
};
const updateCell = (cell, index) => {
gameState[index] = currentPlayer;
cell.textContent = currentPlayer;
};
const checkResult = () => {
let roundWon = false;
for (let i = 0; i < winConditions.length; i++) {
const winCondition = winConditions[i];
let a = gameState[winCondition[0]];
let b = gameState[winCondition[1]];
let c = gameState[winCondition[2]];
if (a === '' || b === '' || c === '') {
continue;
}
if (a === b && b === c) {
roundWon = true;
break;
}
}
if (roundWon) {
statusText.textContent = `Player ${currentPlayer} wins!`;
gameActive = false;
return;
}
if (!gameState.includes("")) {
statusText.textContent = 'Game ended in a draw!';
gameActive = false;
return;
}
currentPlayer = currentPlayer === "X" ? "O" : "X";
statusText.textContent = `Player ${currentPlayer}'s turn`;
};
const restartGame = () => {
currentPlayer = "X";
gameActive = true;
gameState = ["", "", "", "", "", "", "", "", ""];
statusText.textContent = `Player ${currentPlayer}'s turn`;
cells.forEach(cell => cell.textContent = "");
};
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame);
statusText.textContent = `Player ${currentPlayer}'s turn`;