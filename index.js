const canvas = document.querySelector('#canvas');
const c = canvas.getContext('2d');

const results = document.getElementById('results');
const error = document.getElementById('error');
const logError = (msg) => { console.log(msg); error.innerHTML = msg; }

canvas.width = MAP_WIDTH * BOX_SIZE * SCALE;
canvas.height = MAP_HEIGHT * BOX_SIZE * SCALE;

c.imageSmoothingEnabled = false;
c.scale(SCALE, SCALE);
// canvas.style= `background-size: ${BOX_SIZE*SCALE}px`;

map.width = canvas.width
map.height = canvas.height

const players = [player1, player2, player3].slice(0, NUM_PLAYERS);

function animate() {
    window.requestAnimationFrame(animate);

    game.update();
    if (game.end) return;

    map.draw();

    coins.draw(game.state);

    for (const p of players) {
         p.draw();
         p.update();
    }
}

animate();


