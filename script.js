const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

const colors = ["lightblue", "lightgreen", "lightpink", "lightyellow", "lightcyan"];
const eggWidth = 45;
const eggHeight = 55;
const catcherWidth = 100;
const catcherHeight = 100;

let eggs = [];
let score = 0;
let livesRemaining = 3;
let catcherX = canvasWidth / 2 - catcherWidth / 2;

function createEgg() {
    const x = Math.random() * (canvasWidth - eggWidth);
    const y = 0;
    const color = colors[Math.floor(Math.random() * colors.length)];
    eggs.push({ x, y, color });
    setTimeout(createEgg, 4000);
}

function moveEggs() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.fillStyle = 'seaGreen';
    ctx.fillRect(0, canvasHeight - 100, canvasWidth, 100);

    eggs.forEach((egg, index) => {
        egg.y += 10;
        if (egg.y + eggHeight > canvasHeight) {
            eggs.splice(index, 1);
            loseLife();
        } else {
            ctx.fillStyle = egg.color;
            ctx.fillRect(egg.x, egg.y, eggWidth, eggHeight);
        }
    });

    ctx.fillStyle = 'blue';
    ctx.fillRect(catcherX, canvasHeight - catcherHeight - 20, catcherWidth, catcherHeight);

    ctx.fillStyle = 'darkblue';
    ctx.font = '18px Arial';
    ctx.fillText('Score: ' + score, 10, 20);
    ctx.fillText('Lives: ' + livesRemaining, canvasWidth - 80, 20);

    requestAnimationFrame(moveEggs);
}

function loseLife() {
    livesRemaining -= 1;
    if (livesRemaining === 0) {
        alert('Game Over! Final Score: ' + score);
        document.location.reload();
    }
}

function catchEggs() {
    eggs.forEach((egg, index) => {
        if (egg.x > catcherX && egg.x + eggWidth < catcherX + catcherWidth && egg.y + eggHeight > canvasHeight - catcherHeight - 20) {
            eggs.splice(index, 1);
            score += 10;
        }
    });
    setTimeout(catchEggs, 100);
}

document.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' && catcherX > 0) {
        catcherX -= 20;
    } else if (event.key === 'ArrowRight' && catcherX < canvasWidth - catcherWidth) {
        catcherX += 20;
    }
});

createEgg();
moveEggs();
catchEggs();
