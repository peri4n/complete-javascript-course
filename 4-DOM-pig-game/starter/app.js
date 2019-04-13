/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

const scoreToWin = 100;
var currentPlayer, currentScore, globalScores;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
    var roll = rollDice();
    console.log('Player ' + currentPlayer + ' rolled a ' + roll);

    document.querySelector('.dice').style.display = 'block';
    document.querySelector('.dice').src = 'dice-' + roll + '.png'

    if (roll !== 1) {
        // Add roll to the current score
        currentScore += roll;

        // Update UI with the current score
        document.getElementById('current-' + currentPlayer).textContent = currentScore;
    } else {
        // Switch players
        currentPlayer = toggle(currentPlayer);

        // Hide dice
        document.querySelector('.dice').style.display = 'none';
    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    // Add score to global score
    globalScores[currentPlayer] += currentScore;

    // Update UI
    document.getElementById('score-' + currentPlayer).textContent = globalScores[currentPlayer];

    // Switch players
    currentPlayer = toggle(currentPlayer);

    // Hide dice
    document.querySelector('.dice').style.display = 'none';
});

function toggle(currentPlayer) {
    // Reset current score
    currentScore = 0;

    // Update UI
    document.getElementById('current-' + currentPlayer).textContent = currentScore;
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    // Return other player
    return Math.abs(currentPlayer - 1);
}

function rollDice() {
    return Math.floor(Math.random() * 5) + 1;
}

function init() {
    currentScore = 0;
    currentPlayer = 0;
    globalScores = [0, 0];
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.querySelector('.dice').style.display = 'none';
}
