class Coins {
    constructor({src,size}) {
        this.coins = Array.from({ length: size.x }, () => new Array(size.y));
        for (let x = 0; x < this.coins.length; x++) {
            for (let y = 0; y < this.coins[x].length; y++) {
                this.coins[x][y] = new Sprite({
                    src,
                    width: BOX_SIZE,
                    height: BOX_SIZE,
                    position: {
                        x: x * BOX_SIZE,
                        y: y * BOX_SIZE
                    },
                    box: {
                        x: 0,
                        y: 0,
                        width: BOX_SIZE,
                        height: BOX_SIZE,
                    }
                });
            }
        }
    }
    draw(state) {
        for (let x = 0; x < state.length; x++) {
            for (let y = 0; y < state[x].length; y++) {
                if (state[x][y].coins > 0 || state[x][y].owner !== -1) {                    
                    this.coins[x][y].box.x = BOX_SIZE * state[x][y].coins;
                    this.coins[x][y].box.y = BOX_SIZE * state[x][y].owner;
                    this.coins[x][y].draw();
                }
            }
        }
    }    
}