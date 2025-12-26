let    player1Score = 0;
let player2Score = 0;
let currentPlayer = 1;
let player1Choice = null;
let player1Name = prompt("Enter name for Player 1:", "Player 1");
let player2Name = prompt("Enter name for Player 2:", "Player 2");

function playerIsNull() {
    if (player1Name === null || player1Name.trim() === "") {
        player1Name = "Player 1";
    }
    if (player2Name === null || player2Name.trim() === "") {
        player2Name = "Player 2";
    }
}

playerIsNull();

function scoreBoardStart(player1Name,player2Name) {
    document.querySelector('.js-scoreboard').innerHTML = `${player1Name}: ${player1Score} | ${player2Name}: ${player2Score}`
    document.querySelector('.js-game-status').innerHTML = `${player1Name}, make your choice!`
}

scoreBoardStart(player1Name, player2Name);

function handleChoice(choice) {

    const gameStatus = document.querySelector('.js-game-status');
    const gameInfo = document.querySelector('.js-gameinfo');
    const scoreboard = document.querySelector('.js-scoreboard');

    if (currentPlayer === 1) {
        player1Choice = choiceToEmoji(choice);
        gameStatus.textContent = `${player2Name}, your turn!`;
        currentPlayer = 2;
    } else {
        const player2Choice = choiceToEmoji(choice);
        gameStatus.textContent = ``;
        
        // Biram pobednika
        const winner = determineWinner(player1Choice, player2Choice);
        
        if (winner === 1) {
            player1Score++;
            gameInfo.textContent = `${player1Name} wins! ${player1Choice} beats ${player2Choice}!`;
        } else if (winner === 2) {
            player2Score++;
            gameInfo.textContent = `${player2Name} wins! ${player2Choice} beats ${player1Choice}!`;
        } else {
            gameInfo.textContent = `It's a tie! Both picked ${player1Choice}`;
        }
        
        // Updejt za Scoreboard
        scoreboard.textContent = `${player1Name}: ${player1Score} | ${player2Name}: ${player2Score}`;
        
        // Resetuj za sledecu rundu
        setTimeout(() => {
            gameStatus.textContent = `${player1Name}, make your choice!`;
            gameInfo.textContent = '';
            currentPlayer = 1;
            player1Choice = null;
        }, 2000);
    }
}

function determineWinner(choice1, choice2) {
    if (choice1 === choice2) return 0; 
    
    if (
        (choice1 === '✊' && choice2 === '✌️') ||
        (choice1 === '✋' && choice2 === '✊') ||
        (choice1 === '✌️' && choice2 === '✋')
    ) {
        return 1; 
    }
    
    return 2; 
}

function reset2PlayerGame() {
    player1Score = 0;
    player2Score = 0;
    currentPlayer = 1;
    player1Choice = null;
    scoreBoardStart(player1Name, player2Name);
    document.querySelector('.js-gameinfo').textContent = '';
    }

function choiceToEmoji(playerChoice) {
    if (playerChoice === 'rock') return '✊';
    if (playerChoice === 'paper') return '✋';
    if (playerChoice === 'scissors') return '✌️';
}