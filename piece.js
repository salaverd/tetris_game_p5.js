class Piece {
    constructor() {
        this.shape = random(shapes);
        this.color = color(random(100, 255), random(100, 255), random(100, 255));
        this.x = floor(cols / 2) - 1;
        this.y = 0;

        if (!this.canMove(0, 0)) {
            gameOver = true;
        }
    }

    show() {
        fill(this.color);
        for (let i = 0; i < this.shape.length; i++) {
            for (let j = 0; j < this.shape[i].length; j++) {
                if (this.shape[i][j] === 1) {
                    rect((this.x + j) * 30, (this.y + i) * 30, 30, 30);
                }
            }
        }
    }

    moveDown() {
        if (this.canMove(0, 1)) {
            this.y++;
        } else {
            this.lock();
            currentPiece = new Piece();
            checkLines();
        }
    }

    move(dx) {
        if (this.canMove(dx, 0)) {
            this.x += dx;
        }
    }

    rotate() {
        let newShape = [];
        for (let j = 0; j < this.shape[0].length; j++) {
            newShape[j] = [];
            for (let i = this.shape.length - 1; i >= 0; i--) {
                newShape[j].push(this.shape[i][j]);
            }
        }

        let oldShape = this.shape;
        this.shape = newShape;

        if (!this.canMove(0, 0)) {
            this.shape = oldShape; // Revert if invalid
        }
    }

    canMove(dx, dy) {
        for (let i = 0; i < this.shape.length; i++) {
            for (let j = 0; j < this.shape[i].length; j++) {
                if (this.shape[i][j] === 1) {
                    let newX = this.x + j + dx;
                    let newY = this.y + i + dy;
                    if (newX < 0 || newX >= cols || newY >= rows || (newY >= 0 && grid[newY][newX] !== 0)) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    lock() {
        for (let i = 0; i < this.shape.length; i++) {
            for (let j = 0; j < this.shape[i].length; j++) {
                if (this.shape[i][j] === 1) {
                    let x = this.x + j;
                    let y = this.y + i;
                    if (y >= 0) {
                        grid[y][x] = this.color;
                    }
                }
            }
        }
    }
}