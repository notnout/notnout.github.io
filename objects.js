

const boxes = (size) => size * BOX_SIZE;

const player1 = new Player({
    name: 'Keyan',
    index: { x: 1, y: 1 },
    src: './assets/player2.png',
    position: {
        x: Math.round(MAP_WIDTH / 2) * BOX_SIZE,
        y: Math.round(MAP_HEIGHT / 2) * BOX_SIZE
    },
    width: BOX_SIZE,
    height: BOX_SIZE,
    base: 'rightIdle',
    variants: {
        rightIdle: {
            x: boxes(5),
            y: boxes(0),
            width: boxes(3),
            height: boxes(1),
            frames: 3,
            frameBuffer: 24,
            loop: true
        },
        leftIdle: {
            x: boxes(5),
            y: boxes(1),
            width: boxes(3),
            height: boxes(1),
            frames: 3,
            frameBuffer: 24,
            loop: true
        },
        right: {
            x: boxes(14),
            y: 0,
            width: boxes(4),
            height: boxes(1),
            frames: 4,
            frameBuffer: 8,
            loop: true
        },
        left: {
            x: boxes(14),
            y: boxes(1),
            width: boxes(4),
            height: boxes(1),
            frames: 4,
            frameBuffer: 8,
            loop: true
        },
        place: {
            x: boxes(19),
            y: boxes(1),
            width: boxes(4),
            height: boxes(1),
            frames: 4,
            frameBuffer: 4,
            loop: false,
            onCompleteKey: 'rightIdle'
        }
    }
});

const player2 = new Player({
    name: 'Player 2',
    index: { x: MAP_WIDTH - 2, y: MAP_HEIGHT - 2 },
    ai: true,
    src: './assets/player1.png',
    position: { 
        x: Math.round(MAP_WIDTH / 2) * BOX_SIZE,
        y: Math.round(MAP_HEIGHT / 2) * BOX_SIZE
    },
    width: boxes(1),
    height: boxes(1),
    base: 'rightIdle',
    variants: {
        rightIdle: {
            x: boxes(5),
            y: 0,
            width: boxes(3),
            height: boxes(1),
            frames: 3,
            frameBuffer: 24,
            loop: true
        },
        leftIdle: {
            x: boxes(5),
            y: boxes(1),
            width: boxes(3),
            height: boxes(1),
            frames: 3,
            frameBuffer: 24,
            loop: true
        },
        right: {
            x: boxes(14),
            y: 0,
            width: boxes(4),
            height: boxes(1),
            frames: 4,
            frameBuffer: 8,
            loop: true
        },
        left: {
            x: boxes(14),
            y: boxes(1),
            width: boxes(4),
            height: boxes(1),
            frames: 4,
            frameBuffer: 8,
            loop: true
        },
        place: {
            x: boxes(19),
            y: boxes(1),
            width: boxes(4),
            height: boxes(1),
            frames: 4,
            frameBuffer: 4,
            loop: false,
            onCompleteKey: 'rightIdle'
        }
    }
});

const player3 = new Player({
    name: 'StackerGPT',
    index: { x: 1, y: MAP_HEIGHT - 2 },
    ai: true,
    src: './assets/player1.png',
    position: { 
        x: Math.round(MAP_WIDTH / 2) * BOX_SIZE,
        y: Math.round(MAP_HEIGHT / 2) * BOX_SIZE
    },
    width: boxes(1),
    height: boxes(1),
    base: 'rightIdle',
    variants: {
        rightIdle: {
            x: boxes(5),
            y: 0,
            width: boxes(3),
            height: boxes(1),
            frames: 3,
            frameBuffer: 24,
            loop: true
        },
        leftIdle: {
            x: boxes(5),
            y: boxes(1),
            width: boxes(3),
            height: boxes(1),
            frames: 3,
            frameBuffer: 24,
            loop: true
        },
        right: {
            x: boxes(14),
            y: 0,
            width: boxes(4),
            height: boxes(1),
            frames: 4,
            frameBuffer: 8,
            loop: true
        },
        left: {
            x: boxes(14),
            y: boxes(1),
            width: boxes(4),
            height: boxes(1),
            frames: 4,
            frameBuffer: 8,
            loop: true
        },
        place: {
            x: boxes(19),
            y: boxes(1),
            width: boxes(4),
            height: boxes(1),
            frames: 4,
            frameBuffer: 4,
            loop: false,
            onCompleteKey: 'rightIdle'
        }
    }
});


const map = new Sprite({
    src: './assets/background.png',
    position: { x: 0, y: 0 },
    width: canvas.width,
    height: canvas.height,
    box: {
        x: 0,
        y: 0,
        width: boxes(1),
        height: boxes(1),
        frames: 1,
        repeat: true
    },
});

const coins = new Coins({
    src: './assets/coins.png',
    size: {
        x: MAP_WIDTH,
        y: MAP_HEIGHT
    }
});

const game = new Game({
    config: {
        BOX_SIZE, 
        MAP_WIDTH, 
        MAP_HEIGHT, 
        SCALE, 
        NUM_PLAYERS, 
        VELOCITY
    }
});