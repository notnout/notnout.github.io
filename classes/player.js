class Player extends Sprite {
    constructor({ name, index,ai, src, position, box, width, height, variants, base }) {
        super({ position, src, box, width, height,variants, base});
        this.name = name;
        this.index = index;
        this.score = 0;
        this.ai = ai;
    }

    update() {
        if (this.index.x * BOX_SIZE > this.position.x) {
            this.position.x += VELOCITY;
            if (this.index.x * BOX_SIZE <= this.position.x) {
                this.switchVariant('rightIdle');    
            } else {
                this.switchVariant('right');
            }
        }
        if (this.index.x * BOX_SIZE < this.position.x) {
            this.position.x -= VELOCITY;
            if (this.index.x * BOX_SIZE >= this.position.x) {
                this.switchVariant('leftIdle');
            } else {
                this.switchVariant('left');
            }
        }
        if (this.index.y * BOX_SIZE > this.position.y) {
            this.position.y += VELOCITY;
        }
        if (this.index.y * BOX_SIZE < this.position.y) {
            this.position.y -= VELOCITY;
        }
    }

    moveUp() {
        if (this.index.y > 0 &&
            this.index.y * BOX_SIZE >= this.position.y) {
            this.index.y--;
        }
    }
    
    moveRight() {
        if (this.index.x < MAP_WIDTH - 1 &&
            this.index.x * BOX_SIZE <= this.position.x) {
            this.index.x++;
        }
    }
    moveDown() {
        if (this.index.y < MAP_HEIGHT - 1 &&
            this.index.y * BOX_SIZE <= this.position.y) {
            this.index.y++;
        }
    }
    moveLeft() {
        if (this.index.x > 0 &&
            this.index.x * BOX_SIZE >= this.position.x) {
            this.index.x--;
        }
    }
}