const $grid = document.querySelector('.grid');
const $scoreDisplay = document.querySelector('#score');

const width = 28;
const layout = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1 
]
let pacmanCurrentIndex = 500;
let isGameOver = false;
let direction = 1;

function createBoard() {
    let squareArray = [];
    let className = '';
    let square = '';
    
    for(let i in layout) {
        // Interpret styling rules according to element's values
        switch (layout[i]) {
            case 0:
            className = 'pac-dot';
            break;
            case 1:
            className = 'wall';
            break;
            case 2:
            className = 'ghost-lair';
            break;
            case 3:
            className = 'power-pellet';
            break;
            default: className = 'empty';
        }
        
        square = `<div class='${className}'><span class="debug-index">${[i]}<span></div>`;
        squareArray = [...squareArray, square];
    }
    $grid.innerHTML = squareArray.join('');
    
    // Show debug index
    // document.querySelectorAll('.debug-index').forEach(el => el.style.display = 'block');
    // console.log('squareArray:', squareArray.length)
}

createBoard();

const $squares = document.querySelectorAll('.grid div');
let $pacman = $squares[pacmanCurrentIndex];
$pacman.classList.add("pacman");

function animatePacman(direction) {
    // check if pacman is within boundary
    if(!(pacmanCurrentIndex + width >= width * width && direction === width) || // if he doesnt hit bottom
    !(pacmanCurrentIndex % width === width - 1 && direction === 1) || // if he doesnt hit right wall
    !(pacmanCurrentIndex % width === 0 && direction === -1) || // if he doesnt hit left wall
    !(pacmanCurrentIndex - width < 0 && direction === -width)) {// if he doesnt hit top
        
        // animate moves
        $squares[pacmanCurrentIndex].classList.remove("pacman");
        pacmanCurrentIndex += direction;
        // if he hits wall, back out
        if($squares[pacmanCurrentIndex].classList.contains('wall')) { 
            pacmanCurrentIndex -= direction;
            $squares[pacmanCurrentIndex].classList.add("pacman");
        } 
        // else if() {
        
        // }
        else {
            $squares[pacmanCurrentIndex].classList.add("pacman");
        }
    }
}

// Pacman control
document.addEventListener('keydown', event => {
    if(!isGameOver) {
        switch(event.code) {
            case "ArrowDown":
            direction = width;
            break;
            case "ArrowUp":
            direction = -width;
            break;
            case "ArrowLeft": 
            direction = -1;
            break;
            case "ArrowRight": 
            direction = 1;
            break;
            default: return;
        }
        animatePacman(direction);
    }
});