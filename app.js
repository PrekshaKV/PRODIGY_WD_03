document.addEventListener("DOMContentLoaded", () => {
    const entryPage = document.getElementById("entry_page");
    const mainPage = document.getElementById("main_page");
    const winnerPage = document.getElementById("winner_page");

    const xChooseButton = document.getElementById("x_choose");
    const oChooseButton = document.getElementById("o_choose");
    const xWinsDisplay = document.querySelectorAll("#x_wins");
    const oWinsDisplay = document.querySelectorAll("#o_wins");
    const turnDisplayX = document.getElementById("x_turn");
    const turnDisplayO = document.getElementById("o_turn");
    const gameCells = document.querySelectorAll(".box");
    const winnerText = document.getElementById("paragraph_choose");
    const playAgainButton = document.getElementById("play_again");

    let currentPlayer = null;
    let board = Array(9).fill(null);
    let xWins = 0;
    let oWins = 0;

    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    // Function to start the game
    const startGame = (player) => {
        currentPlayer = player;
        entryPage.style.display = "none";
        mainPage.style.display = "block";
        winnerPage.style.display = "none"; // Hide winner page when starting a new game
        updateTurnDisplay();
    };

    // Function to update the turn display
    const updateTurnDisplay = () => {
        turnDisplayX.style.display = currentPlayer === "X" ? "block" : "none";
        turnDisplayO.style.display = currentPlayer === "O" ? "block" : "none";
    };

    // Function to check for a winner
    const checkWinner = () => {
        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }
        return board.every(cell => cell) ? "Draw" : null;
    };

    // Function to handle the end of the game
    const endGame = (winner) => {
        mainPage.style.display = "none";
        winnerPage.style.display = "block";

        if (winner === "X") {
            xWins++;
            xWinsDisplay.forEach(display => display.textContent = `'X' Wins: ${xWins} times`);
            winnerText.textContent = "Player X Won The Game!";
        } else if (winner === "O") {
            oWins++;
            oWinsDisplay.forEach(display => display.textContent = `'O' Wins: ${oWins} times`);
            winnerText.textContent = "Player O Won The Game!";
        } else {
            winnerText.textContent = "It's a Draw!";
        }
    };

    // Event listener for game cells
    gameCells.forEach((cell, index) => {
        cell.addEventListener("click", () => {
            if (!board[index]) {
                board[index] = currentPlayer;
                cell.textContent = currentPlayer;
                const winner = checkWinner();
                if (winner) {
                    endGame(winner);
                } else {
                    currentPlayer = currentPlayer === "X" ? "O" : "X";
                    updateTurnDisplay();
                }
            }
        });
    });

    // Event listener for player selection
    xChooseButton.addEventListener("click", () => startGame("X"));
    oChooseButton.addEventListener("click", () => startGame("O"));

    // Event listener for replay
    playAgainButton.addEventListener("click", () => {
        // Reset the game
        board.fill(null);
        gameCells.forEach(cell => cell.textContent = "");
        winnerPage.style.display = "none"; // Hide winner page
        entryPage.style.display = "block"; // Show entry page
    });

    // Initialize visibility
    entryPage.style.display = "block";
    mainPage.style.display = "none";
    winnerPage.style.display = "none";
});
