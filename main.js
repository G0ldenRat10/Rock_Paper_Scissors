// Postavljanje

let scoreBoard; // postavljanje varijable 
setLocalStorage(); // funkcija pravi storage, ako postoji, ako ne preskace
scoreBoard = JSON.parse(localStorage.getItem('scoreBoard'));
let autoPlayInterval = null;

function pickComputerMove() {
    const randomNumber = Math.random(); // Po default-u da je od 0-1
    let robotsChoice = '';

    if (randomNumber < 1 / 3) {
        robotsChoice = 'rock';
        console.log(`Robots choice: ${robotsChoice}`);
        return robotsChoice;

    } else if (randomNumber < 2 / 3) {
        robotsChoice = 'paper';
        console.log(`Robots choice: ${robotsChoice}`);
        return robotsChoice;

    } else {
        robotsChoice = 'scissors';
        console.log(`Robots choice: ${robotsChoice}`);
        return robotsChoice;
    }
}

// Funkcije za vsRobot.html

function pickWinner(robotsChoice, playerChoice) {
    const humansEmoji = pickEmoji(playerChoice);
    const robotsEmoji = pickEmoji(robotsChoice);

    if (playerChoice === robotsChoice) {
        console.log('Its a DRAW!');
        scoreBoard.ties += 1;
        document.querySelector('.js-game-status').innerHTML = `It's a DRAW.`;
        document.querySelector('.js-gameinfo').innerHTML =
            `👤${humansEmoji} ${robotsEmoji}🤖`;
        document.querySelector('.js-scoreboard').innerHTML =
            `Wins: ${scoreBoard.wins}, Losses: ${scoreBoard.losses}, Ties: ${scoreBoard.ties}`;

    } else if (playerChoice === 'scissors' && robotsChoice === 'paper') {
        console.log('You win!');
        scoreBoard.wins += 1;
        document.querySelector('.js-game-status').innerHTML = `You WIN!`;
        document.querySelector('.js-gameinfo').innerHTML =
            `👤${humansEmoji} ${robotsEmoji}🤖`;
        document.querySelector('.js-scoreboard').innerHTML =
            `Wins: ${scoreBoard.wins}, Losses: ${scoreBoard.losses}, Ties: ${scoreBoard.ties}`;

    } else if (playerChoice === 'paper' && robotsChoice === 'rock') {
        console.log('You win!');
        scoreBoard.wins += 1;
        document.querySelector('.js-game-status').innerHTML = `You WIN!`;
        document.querySelector('.js-gameinfo').innerHTML =
            `👤${humansEmoji} ${robotsEmoji}🤖`;
        document.querySelector('.js-scoreboard').innerHTML =
            `Wins: ${scoreBoard.wins}, Losses: ${scoreBoard.losses}, Ties: ${scoreBoard.ties}`;

    } else if (playerChoice === 'rock' && robotsChoice === 'scissors') {
        console.log('You win!');
        scoreBoard.wins += 1;
        document.querySelector('.js-game-status').innerHTML = `You WIN!`;
        document.querySelector('.js-gameinfo').innerHTML =
            `👤${humansEmoji} ${robotsEmoji}🤖`;
        document.querySelector('.js-scoreboard').innerHTML =
            `Wins: ${scoreBoard.wins}, Losses: ${scoreBoard.losses}, Ties: ${scoreBoard.ties}`;

    } else {
        console.log('You lose!');
        scoreBoard.losses += 1;
        document.querySelector('.js-game-status').innerHTML = `You LOSE...`;
        document.querySelector('.js-gameinfo').innerHTML =
            `👤${humansEmoji} ${robotsEmoji}🤖`;
        document.querySelector('.js-scoreboard').innerHTML =
            `Wins: ${scoreBoard.wins}, Losses: ${scoreBoard.losses}, Ties: ${scoreBoard.ties}`;
    }

    // Cuvanje podataka unutar localStorage:
    localStorage.setItem('scoreBoard', JSON.stringify(scoreBoard));
}

function constructScoreBoard() {
    const scoreBoard = {
        wins: 0,
        losses: 0,
        ties: 0,
    };
    return scoreBoard;
}

function resetScoreBoard(scoreBoard) {
    if (scoreBoard.wins === 0 && scoreBoard.losses === 0 && scoreBoard.ties === 0) {
        alert(`Your scoreboard is already empty! Play before restarting!`);
        // do nothing 
    } else {
        scoreBoard.wins = 0;
        scoreBoard.losses = 0;
        scoreBoard.ties = 0;

        // Cuvanje podataka u localStorage:
        localStorage.setItem('scoreBoard', JSON.stringify(scoreBoard));

        console.log("Scoreboard was sucessfuly restarted.");

        // Menjanje paragraf tabele:
        document.querySelector('.js-game-status').innerHTML = ``;
        document.querySelector('.js-gameinfo').innerHTML = ``;
        document.querySelector('.js-scoreboard').innerHTML =
            `Wins:${scoreBoard.wins}, Losses: ${scoreBoard.losses}, Ties: ${scoreBoard.ties}`;
    }
}

function setLocalStorage() {
    if (localStorage.getItem('scoreBoard')) {
        // U ovom slucaju scoreBoard vec postoji napravljen
        // ako postoji vratice provera True, i ovaj deo koda ce se izvrsiti
        // Do nothing, just pass.
    } else {
        scoreBoard = constructScoreBoard();
        // U slucaju da ne postoji, i da tek pravimo scoreBoard:
        // Sacuvavamo u lokalnom podatku da scoreBoard ostane isti:
        localStorage.setItem('scoreBoard', JSON.stringify(scoreBoard));
    }
}

function pickEmoji(choice) {
    if (choice === 'rock') {
        const handEmoji = '✊';
        return handEmoji;
    } else if (choice === 'paper') {
        const handEmoji = '🖐️';
        return handEmoji;
    } else {
        const handEmoji = '✌️';
        return handEmoji;
    }
}

function singleAutoPlay() {

    randomDigit = Math.random();

    if (randomDigit < 0.33) {
        const playerChoice = 'rock';
        console.log(`Players choice: ${playerChoice}`);
        const robotsChoice = pickComputerMove();
        pickWinner(robotsChoice, playerChoice);
    } else if (randomDigit >= 0.33 && randomDigit < 0.66) {
        const playerChoice = 'paper';
        console.log(`Players choice: ${playerChoice}`);
        const robotsChoice = pickComputerMove();
        pickWinner(robotsChoice, playerChoice);
    } else {
        const playerChoice = 'scissors';
        console.log(`Players choice: ${playerChoice}`);
        const robotsChoice = pickComputerMove();
        pickWinner(robotsChoice, playerChoice);
    };
}

function startAutoPlay() {
    autoPlayInterval = setInterval(singleAutoPlay, 3000); // Na svake 3 sekunde
    console.log('Auto play started.');

    document.getElementById('autoplay_button_container').innerHTML = `
    <button title='Stop Auto Play' onclick='stopAutoPlay();' class='js-stop-auto-play' id="blue-neon">
        Stop Auto Play
    </button>
    `;
}

function stopAutoPlay() {
    clearInterval(autoPlayInterval); // Zaustavlja pokrenuti interval
    autoPlayInterval = null;
    console.log('Auto play stopped.');

    document.getElementById('autoplay_button_container').innerHTML = `
    <button title="Auto Play" onclick="
    startAutoPlay();
    " class="js-autoplay" id="blue-neon" >Auto Play</button>
    `;
}

// Funkcije za vsFriend.html


