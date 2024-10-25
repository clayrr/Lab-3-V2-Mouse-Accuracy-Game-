//maya

var gameTime = 30;  
var totalTargets = 0;
var targetsClicked = 0;
var missedTargets = 0; 
var targetInterval = null; 
var gameTimer = null;  
var remainingTime = gameTime; 

// Start button
var startButton = document.getElementById("startGame");
startButton.addEventListener('click', startGame); 

// Scoreboard elements
var totalTargetsDisplay = document.getElementById("totalTargets");
var targetsClickedDisplay = document.getElementById("targetsClicked");
var missedTargetsDisplay = document.getElementById("missedTargets");
var finalScoreDisplay = document.getElementById("finalScore");
var scoreboard = document.getElementById("scoreboard");

function startGame() {
    resetGame();
    targetInterval = setInterval(spawnTarget, 1000);  
    gameTimer = setInterval(updateTimer, 1000);  
    setTimeout(endGame, gameTime * 1000);  
}

function spawnTarget() {
    totalTargets++;
    var target = document.createElement("div");
    target.classList.add("target");

    var maxX = gameArea.offsetWidth - 50;  
    var maxY = gameArea.offsetHeight - 50;  
    var randomX = randomValue(0, maxX);
    var randomY = randomValue(0, maxY);

    target.style.left = `${randomX}px`;
    target.style.top = `${randomY}px`;
    target.style.width = "50px";  
    target.style.height = "50px";  
    target.style.backgroundColor = "red";  
    target.style.position = "absolute"; // Ensure targets are positioned absolutely
    target.style.transition = "transform 0.5s";  

    document.body.appendChild(target);

    target.style.transform = "scale(1.5)";  
    setTimeout(() => {
        target.style.transform = "scale(0.5)";  
    }, 500); 

    target.addEventListener('click', () => {
        targetsClicked++;
        document.body.removeChild(target);  
    });

    setTimeout(() => {
        if (document.body.contains(target)) {
            missedTargets++;
            document.body.removeChild(target);  
        }
    }, 1500);  
}

function resetGame() {
    totalTargets = 0;
    targetsClicked = 0;
    missedTargets = 0; 
    clearTargets(); 

    remainingTime = gameTime;  
    document.getElementById("timerDisplay").textContent = `Time left: ${remainingTime}s`; 
}

function updateTimer() {
    remainingTime--; 
    document.getElementById("timerDisplay").textContent = `Time left: ${remainingTime}s`; 

    if (remainingTime <= 0) {
        clearInterval(gameTimer); 
    }
}

function endGame() {
    clearTargets();
    displayScore(); 
    clearInterval(gameTimer);
    clearInterval(targetInterval); 
}

function clearTargets() {
    var targets = document.querySelectorAll('.target');
    targets.forEach(target => target.remove());
}

function displayScore() {
    
   totalTargetsDisplay.textContent= `Total targets: ${totalTargets}`;
   targetsClickedDisplay.textContent= `Targets clicked: ${targetsClicked}`;
   missedTargetsDisplay.textContent= `Missed targets: ${missedTargets}`;
   finalScoreDisplay.textContent= `Final score: ${calculateScore()}`;
   scoreboard.classList.remove("hidden"); 
}

function calculateScore() {
   return Math.floor((targetsClicked / totalTargets) * 100) || 0; 
}

function randomValue(min, max) {
   return Math.random() * (max - min) + min; 
}
