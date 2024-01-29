let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
const boardElement = document.getElementById('board');
const resetButton = document.getElementById('resetButton');

function initializeGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    renderBoard();
}

function renderBoard() {
    boardElement.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.textContent = gameBoard[i];
        cell.addEventListener('click', () => handleCellClick(i));
        boardElement.appendChild(cell);
    }
}

function handleCellClick(index) {
    if (gameBoard[index] === '' && !checkWinner()) {
        gameBoard[index] = currentPlayer;
        renderBoard();
        if (!checkWinner()) {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]             // diagonals
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            showResult(`${gameBoard[a]} wins!`);
            return true;
        }
    }

    if (!gameBoard.includes('')) {
        showResult('It\'s a draw!');
        return true;
    }

    return false;
}

function showResult(result) {
    const resultScreen = document.createElement('div');
    resultScreen.innerHTML = `<h2>${result}</h2><button onclick="resetGame()">New Game</button>`;
    document.body.innerHTML = '';
    document.body.appendChild(resultScreen);
}

function resetGame() {
    initializeGame();
    document.body.innerHTML = '';
    document.body.appendChild(document.getElementById('resetButton'));
    document.body.appendChild(document.createElement('script')).src = 'script.js';
}

// Initialize the game
initializeGame();
