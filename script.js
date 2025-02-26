const board = document.getElementById("board");
let cells = [];
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];

function createBoard() {
    board.innerHTML = "";
    gameState.forEach((_, index) => {
        let cell = document.createElement("div");
        cell.classList.add("cell");
        cell.setAttribute("data-index", index);
        cell.addEventListener("click", handleMove);
        board.appendChild(cell);
        cells.push(cell);
    });
}

function handleMove(event) {
    let index = event.target.getAttribute("data-index");
    if (gameState[index] !== "") return;
    
    gameState[index] = currentPlayer;
    event.target.innerText = currentPlayer;

    if (checkWin()) {
        setTimeout(() => alert(`${currentPlayer} Wins!`), 100);
        resetGame();
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function checkWin() {
    const winPatterns = [
        [0,1,2], [3,4,5], [6,7,8], // Rows
        [0,3,6], [1,4,7], [2,5,8], // Columns
        [0,4,8], [2,4,6]  // Diagonals
    ];
    
    return winPatterns.some(pattern => 
        gameState[pattern[0]] !== "" &&
        gameState[pattern[0]] === gameState[pattern[1]] &&
        gameState[pattern[1]] === gameState[pattern[2]]
    );
}

function resetGame() {
    gameState = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    cells.forEach(cell => cell.innerText = "");
}

createBoard();