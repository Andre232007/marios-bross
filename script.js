const startButton = document.querySelector('.start-button');
const menu = document.querySelector('.menu');
const container = document.querySelector('.container');
const clouds = document.querySelector('.clouds');
const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const gameOverDiv = document.querySelector('.game-over');
const scoreDisplay = document.querySelector('.score');

let score = 0;
let isGameActive = true;
let loop;


const updateScore = () => {
    scoreDisplay.innerHTML = `SCORE: ${score}`;
};

const jump = () => {
    if (!mario.classList.contains('jump')) {
        mario.classList.add('jump');
        setTimeout(() => mario.classList.remove('jump'), 500);
    }
};


const startGame = () => {
    menu.style.display = 'none'; 
    container.style.display = 'flex'; 
    isGameActive = true; 
    score = 0;
    updateScore(); 


    pipe.style.animation = 'pipe-animation 1.5s infinite linear';
    clouds.style.animation = 'clouds-animation 20s infinite';

  
    loop = setInterval(() => {
        const pipePosition = pipe.offsetLeft;
        const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
        const cloudsPosition = clouds.offsetLeft;

        if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 70) {
            pipe.style.animation = 'none'; 
            pipe.style.left = `${pipePosition}px`; // Congela o cano na posição da colisão

            mario.style.animation = 'none'; 
            mario.style.bottom = `${marioPosition}px`; 

            mario.src = './img/game-over.png'; 
            mario.style.width = '75px';
            mario.style.marginLeft = '50px';

            clouds.style.animation = 'none'; 
            clouds.style.left = `${cloudsPosition}px`; 

            isGameActive = false; 
            clearInterval(loop); 

            gameOverDiv.style.display = 'flex'; 
        }
    }, 10);
    const scoreInterval = setInterval(() => {
        if (isGameActive) {
            score++;
            updateScore();
        }
    }, 1000);
};

startButton.addEventListener('click', startGame);
document.addEventListener('keydown', jump);

