// elements
let character = document.getElementById("character");
let ground = document.getElementById("ground");
let scoreSpan = document.querySelector(".score span");

// parameters
let score = 0;

let characterBottom = parseInt(window.getComputedStyle(character).getPropertyValue('bottom'));
let characterRight = parseInt(window.getComputedStyle(character).getPropertyValue('right'));
let characterWidth = parseInt(window.getComputedStyle(character).getPropertyValue('width'));
let characterHeight = parseInt(window.getComputedStyle(character).getPropertyValue('height'));

let groundBottom = parseInt(window.getComputedStyle(ground).getPropertyValue('bottom'));
let groundRight = parseInt(window.getComputedStyle(ground).getPropertyValue('right'));
let groundWidth = parseInt(window.getComputedStyle(ground).getPropertyValue('width'));
let groundHeight = parseInt(window.getComputedStyle(ground).getPropertyValue('height'));

// const variables
const supportsTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0);

// variables
let isJumping = false;

// timers
let upTime;
let downTime;

// functions
function jump()
{
    if (isJumping) return;
    upTime = setInterval(() => {
        if (characterBottom >= groundHeight + 250) {
            clearInterval(upTime);
            downTime = setInterval(() => {
                if (characterBottom <= groundHeight + 10) {
                    clearInterval(downTime);
                    isJumping = false;
                }
                characterBottom -= 10;
                character.style.bottom = characterBottom + "px";
            }, 20);
        }
        characterBottom += 10;
        character.style.bottom = characterBottom + "px";
        isJumping = true;
    }, 20);
}

function control(e)
{
    if (e.key === "ArrowUp" || e.key === ' ') {
        jump();
    }
}

function generateObstacles()
{
    let obstacles = document.querySelector(".obstacles");
    let obstacle = document.createElement("div");
    obstacle.classList.add("obstacle");
    obstacles.appendChild(obstacle);

    let randomTimeout = Math.floor(Math.random() * 1000) + 1000;
    let obstacleRight = -30;
    let obstacleBottom = 100;
    let obstacleWidth = 30;
    let obstacleHeight = Math.floor(Math.random() * 50) + 50;
    obstacle.style.backgroundColor = "rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ")";

    function moveObject()
    {
        obstacleRight += 5;
        obstacle.style.right = obstacleRight + "px";
        obstacle.style.bottom = obstacleBottom + "px";
        obstacle.style.width = obstacleWidth + "px";
        obstacle.style.height = obstacleHeight + "px";

        if (characterRight >= obstacleRight - characterWidth &&
            characterRight <= obstacleRight + obstacleWidth &&
            characterBottom <= obstacleBottom + obstacleHeight) {
            alert("Game Over, your score is: " + score);
            clearInterval(obstacleInterval);
            clearTimeout(obstacleTimeout);
            location.reload();
        }
    }

    let obstacleInterval = setInterval(moveObject, 10*2);
    let obstacleTimeout = setTimeout(generateObstacles, randomTimeout);
}

function showScore()
{
    score++;
    scoreSpan.innerHTML = score;
}

// init
generateObstacles();
setInterval(showScore, 1000);

// events
window.addEventListener("keydown", control);
if (supportsTouch) window.addEventListener("touchstart", jump);