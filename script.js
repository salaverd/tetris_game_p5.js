let cols = 10;
let rows = 20;
let dropInterval = 30;
let score = 0;
let grid;
let currentPiece;
let bonusButton;
let playAgainButton;
let frameCountTracker = 0;
let gameOver = false;

let shapes = [
    [[1, 1, 1], [0, 1, 0]],     // T shape
    [[1, 1, 1, 1]],             // I shape
    [[1, 1], [1, 1]],           // O shape
    [[1, 1, 0], [0, 1, 1]],     // S shape
    [[0, 1, 1], [1, 1, 0]],     // Z shape
    [[1, 0, 0], [1, 1, 1]],     // L shape
    [[0, 0, 1], [1, 1, 1]]      // J shape
];

function setup() {
    let canvas = createCanvas(300, 600);
    canvas.position((windowWidth - width) / 2, (windowHeight - height) / 2 - 50);
    grid = createGrid(cols, rows);
    currentPiece = new Piece();

    bonusButton = createButton('Clear a Line!');
    styleButton(bonusButton);
    bonusButton.position((windowWidth - 150) / 2, (windowHeight + height) / 2 - 30);
    bonusButton.mousePressed(clearRandomLine);

    playAgainButton = createButton('Play Again');
    styleButton(playAgainButton);
    playAgainButton.position((windowWidth - 150) / 2, (windowHeight + height) / 2 + 20);
    playAgainButton.mousePressed(restartGame);
    playAgainButton.hide();

    document.addEventListener('keydown', handleKeyPress);
}

function draw() {
    background(40);

    if (gameOver) {
        textSize(32);
        fill(255, 0, 0);
        textAlign(CENTER, CENTER);
        text('Game Over', width / 2, height / 2);
        noLoop();
        playAgainButton.show();
        return;
    }

    drawGrid(grid);
    currentPiece.show();

    fill(255);
    textSize(24);
    textAlign(LEFT, TOP);
    text(`Score: ${score}`, 10, 10);

    frameCountTracker++;
    if (frameCountTracker % dropInterval === 0) {
        currentPiece.moveDown();
    }
}

function createGrid(cols, rows) {
    let grid = [];
    for (let i = 0; i < rows; i++) {
        grid[i] = new Array(cols).fill(0);
    }
    return grid;
}

function drawGrid(grid) {
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            if (grid[y][x] === 0) {
                fill(80);
            } else {
                fill(grid[y][x]);
            }
            rect(x * 30, y * 30, 30, 30);
        }
    }
}


function handleKeyPress(event) {
    if (event.code === 'ArrowLeft') {
        currentPiece.move(-1);
    } else if (event.code === 'ArrowRight') {
        currentPiece.move(1);
    } else if (event.code === 'ArrowDown') {
        currentPiece.moveDown();
    } else if (event.code === 'ArrowUp') {
        currentPiece.rotate();
    }
}

function checkLines() {
    for (let y = rows - 1; y >= 0; y--) {
        if (grid[y].every(cell => cell !== 0)) {
            grid.splice(y, 1);
            grid.unshift(new Array(cols).fill(0));
            score += 100;
            y++;
        }
    }
}

function clearRandomLine() {
    let nonEmptyRows = [];
    for (let y = 0; y < rows; y++) {
        if (grid[y].some(cell => cell !== 0)) {
            nonEmptyRows.push(y);
        }
    }
    
    if (nonEmptyRows.length > 0 && score > 0) {
        let randomRow = random(nonEmptyRows);
        for (let x = 0; x < cols; x++) {
            grid[randomRow][x] = 0;
        }
        for (let y = randomRow; y > 0; y--) {
            grid[y] = [...grid[y - 1]];
        }

        grid[0] = new Array(cols).fill(0);
        score -= 50;
    }
}

function restartGame() {
    grid = createGrid(cols, rows);
    currentPiece = new Piece();
    gameOver = false;
    playAgainButton.hide();
    loop();
}

function styleButton(button) {
    button.style('background-color', '#007BFF');
    button.style('color', 'white');
    button.style('border', 'none');
    button.style('padding', '10px 20px');
    button.style('font-size', '16px');
    button.style('border-radius', '5px');
    button.style('cursor', 'pointer');
}


