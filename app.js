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
    5,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,5,
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
let pacmanDirection = -1;
let score = 0;

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
            case 4:
            className = 'empty';
            break;
            default:
            className = 'portal';
        }
        
        square = `<div class='${className}'><span class='debug-index'>${[i]}<span></div>`;
        squareArray = [...squareArray, square];
    }
    $grid.innerHTML = squareArray.join('');
    
    // Show debug index
    // document.querySelectorAll('.debug-index').forEach(el => el.style.display = 'block');
}
createBoard();
const $squares = document.querySelectorAll('.grid div');

// Create pacman
let $pacman = $squares[pacmanCurrentIndex];
$pacman.classList.add('pacman');

function createGhosts() {
    class Ghost {
        constructor(className, startIndex, speed) {
            this.className = className;
            this.startIndex = startIndex;
            this.speed = speed;
            this.currentIndex = startIndex;
            this.isScared = false;
            this.timerId = NaN;
        }
    }
    
    const ghosts = [
        new Ghost("blinky", 348, 250),
        new Ghost("pinky", 376, 400),
        new Ghost("inky", 351, 300),
        new Ghost("clyde", 379, 500),
    ];
    
    ghosts.forEach((ghost) => {
        const {className, startIndex} = ghost;
        $squares[startIndex].classList.add(`${className}`, "ghost");
    });
}
createGhosts();

function moveThroughPortal(index) {
    if(index === 364) {
        return 391;
    } else return 364;
}

function eatPacDot(index) {
    $squares[index].classList.remove('pac-dot');
    $scoreDisplay.textContent = score++;
}

function isWithinBoundaries(position, direction) {
    if(!(position + width >= width * width && direction === width) || // if object doesnt hit bottom
    !(position % width === width - 1 && direction === 1) || // if object doesnt hit right wall
    !(position % width === 0 && direction === -1) || // if object doesnt hit left wall
    !(position - width < 0 && direction === -width)) {// if object doesnt hit top
        return true;
    } else return false;
}

function animatePacman(pacmanDirection = -1) {
    // check if pacman is within boundary
    if(isWithinBoundaries(pacmanCurrentIndex, pacmanDirection)) {
        // calculate pacman moves
        $squares[pacmanCurrentIndex].classList.remove('pacman');
        pacmanCurrentIndex += pacmanDirection;
        
        // if he hits wall or ghost-lair, back out
        if ($squares[pacmanCurrentIndex].classList.contains('wall') ||
        $squares[pacmanCurrentIndex].classList.contains('ghost-lair')) {
            pacmanCurrentIndex -= pacmanDirection;
        }
        // if he goes through portal
        else if($squares[pacmanCurrentIndex].classList.contains('portal')) {
            pacmanCurrentIndex = moveThroughPortal(pacmanCurrentIndex);
        }
        // if he eats pac-dot
        else if($squares[pacmanCurrentIndex].classList.contains('pac-dot')) {
            eatPacDot(pacmanCurrentIndex);
        }
        
        // draw new pacman
        $squares[pacmanCurrentIndex].classList.add('pacman');
        console.log('pacmanCurrentIndex:', pacmanCurrentIndex);
    }
}

// Pacman control
document.addEventListener('keydown', event => {
    if(!isGameOver) {
        switch(event.code) {
            case 'ArrowDown':
            pacmanDirection = width;
            break;
            case 'ArrowUp':
            pacmanDirection = -width;
            break;
            case 'ArrowLeft': 
            pacmanDirection = -1;
            break;
            case 'ArrowRight': 
            pacmanDirection = 1;
            break;
            default: return;
        }
        animatePacman(pacmanDirection);
    }
});

function animateGhosts() {
    
}