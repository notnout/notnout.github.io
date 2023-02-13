
window.addEventListener('keydown', (event) => {
    let player = players[game.activePlayer];
    if (game.mode == 'EXPANDING') return; // Currently expanding. Disable inputs. 
    if (game.activePlayer.ai) return; // AI is playing. Disable inputs. 
    const m = {
        'w': 'ArrowUp',
        'a': 'ArrowLeft',
        's': 'ArrowDown',
        'd': 'ArrowRight',
        'f': 'Enter',
        'ArrowUp': 'ArrowUp',
        'ArrowLeft': 'ArrowLeft',
        'ArrowDown': 'ArrowDown',
        'ArrowRight': 'ArrowRight',
        'Enter': 'Enter',
        'e': 'e'
    }
    const handleKey = {
        'ArrowUp': () => player.moveUp(),
        'ArrowRight': () => player.moveRight(),
        'ArrowDown': () => player.moveDown(),
        'ArrowLeft': () => player.moveLeft(),
        'Enter': () => game.placeCoin(player),
        'e': () => game.end = !game.end // END GAME            
    };
    if (m[event.key] in handleKey) {
        handleKey[m[event.key]]();
        event.preventDefault();
    } else console.info('Unknown Key', event.key);
});

const tapHandler = (x, y) => {
    const rect = canvas.getBoundingClientRect();
    let player = players[game.activePlayer];
   
      // Get the current transformation matrix
  const matrix = c.getTransform();
  // Calculate the inverse transformation matrix
  const inverse = matrix.inverse();
  // Transform the touch coordinates from the scaled coordinate system to the original coordinate system
  const point = inverse.transformPoint({x,y});

  console.log('TAP', x, y);
  console.log('TRANSFORMED', point);
  //console.log('TAP', Math.floor((point.x - rect.left) / (BOX_SIZE * SCALE)), Math.floor((point.y - rect.top) / (BOX_SIZE * SCALE)));

    player.index = {
        // x: Math.floor((x ) / (BOX_SIZE )),
        // y: Math.floor((y ) / (BOX_SIZE ))
        x: Math.floor((x - rect.left) / (BOX_SIZE * SCALE)),
        y: Math.floor((y - rect.top) / (BOX_SIZE * SCALE))
    };
    map.placeCoin(player);
}

canvas.addEventListener('touchstart', (event) => {
    const touch = event.touches[0];
    tapHandler(touch.pageX, touch.pageY);
});
canvas.addEventListener('click',
    (event) => tapHandler(event.pageX, event.pageY));
