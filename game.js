class Game {
    constructor({ config }) {
        this.config = config;
        this.mode = 'WAITING'; // 'EXPANDING'
        this.end = false;
        this.expandCounter = 0;
        this.state = Array.from({ length: MAP_WIDTH }, () => new Array(MAP_HEIGHT));
        this.activePlayer = 0;
        this.queue = [];
        this.maxExpansions = 2;
        this.frameSkip = 3;
        this.frameCounter = 0;
        this.endOverlay = {
            opacity: 0
        };
        for (let x = 0; x < this.state.length; x++) {
            for (let y = 0; y < this.state[x].length; y++) {
                this.state[x][y] = {
                    coins: 0,
                    owner: -1
                };
            }
        }
    }

    // Process queue every 'frameSkip' frames. 
    update() {
        let expanded = 0;
        this.frameCounter++;
        if ((this.frameCounter - 1) % this.frameSkip === 0) {
            while (this.queue.length) {
                if (this.expandNeighbors(this.queue.pop())) expanded++;
                if (!this.queue.length) this.updateResults(players);
                if (expanded > this.maxExpansions) break;
                this.frameCounter = 1;
            }
        }
        this.mode = this.queue.length ? 'EXPANDING' : 'WAITING';
        if (this.mode == 'WAITING' && players[this.activePlayer].ai) this.playAI();        
        this.updateEnd();
    }

    placeCoin(player) {
        // check owner
        let state = this.state[player.index.x][player.index.y];
        if (state.owner !== -1 && state.owner !== this.activePlayer) return;
        // expand
        this.expandCounter = 0;
        player.switchVariant("place");
        this.expandPoint(player.index.x, player.index.y, this.activePlayer);
        this.frameCounter = 0;
        this.activePlayer = (this.activePlayer + 1) % NUM_PLAYERS;
        this.update();

        // wait until all is expanded and then switch active player. 
        // if active player is ai, then run ai once. 
    }

    playAI() {
        const player = players[this.activePlayer];
        // FIX BUGS
        // - the AI doesn't wait for expansion animations to finish
        // - the AI should not always go top left. 
        console.log('Running AI');
        let best = {
            x: player.index.x,
            y: player.index.y,
            coins: 0,
        }
        for (let x = 0; x < this.state.length; x++) {
            for (let y = 0; y < this.state[x].length; y++) {
                if (this.state[x][y].owner != this.activePlayer) continue;
                if (this.state[x][y].coins > best.coins) {
                    best = { x, y, coins: this.state[x][y].coins };
                }
            }
        }
        console.log(best, this.state[best.x][best.y]);
        player.index = { x: best.x, y: best.y };
        this.placeCoin(player);
        //this.activePlayer = (this.activePlayer + 1) % NUM_PLAYERS;
    }

    expandPoint(x, y, player) {
        this.queue.push({ x, y, player });
        this.mode = 'EXPANDING';
        this.state[x][y].coins++;
        this.state[x][y].owner = player;
    }

    expandNeighbors({ x, y, player }) {
        this.expandCounter++;
        let state = this.state[x][y];

        if (this.expandCounter > (MAP_WIDTH * MAP_HEIGHT * 8)) {
            // TODO: Do a better overflow/termination logic. 
            // E.g. terminate when one player has zero. 
            logError(`Overflow of expansions. Counter: ${this.expandCounter}.`)
            return;
        }

        let coinsNeeded = 3;
        if (x == 0 || x == MAP_WIDTH - 1) coinsNeeded -= 1;
        if (y == 0 || y == MAP_HEIGHT - 1) coinsNeeded -= 1;

        if (state.coins > coinsNeeded) {
            state.coins = state.coins - coinsNeeded - 1;
            if (x > 0) this.expandPoint(x - 1, y, player);
            if (y > 0) this.expandPoint(x, y - 1, player);
            if (x < MAP_WIDTH - 1) this.expandPoint(x + 1, y, player);
            if (y < MAP_HEIGHT - 1) this.expandPoint(x, y + 1, player);
            return true;
        }
        return false;
    }

    updateResults(players) {
        results.innerHTML = '';
        let counts = [0, 0, 0, 0];
        let total = 0;
        for (const column of this.state) {
            for (const box of column) {
                total += box.coins;
                if (box.owner >= 0) counts[box.owner] += box.coins;
            }
        }
        let playing = 0;
        for (let i = 0; i < players.length; i++) {
            if (counts[i] <= 0 && total > 5) {
                players[i].lost = true;                
            } else {
                playing++;
            }
            results.innerHTML += `${players[i].name}: ${game.formatSats(counts[i])}<br>`;
        }
        if (playing <= 1) {
            this.end = true;
        }        
    }

    updateEnd() {
        if (this.end) {
            if (this.endOverlay.opacity < 1) {
                this.endOverlay.opacity = this.endOverlay.opacity + 0.05;
            }
            c.save()
            c.globalAlpha = this.endOverlay.opacity;
            c.fillStyle = 'black';
            c.fillRect(0, 0, canvas.width, canvas.height);
            c.restore()
            return true;
        } else {
            this.endOverlay.opacity = 0;
        }
        return false;
    }

    formatSats(sats) {
        let btcFormat = new Intl.NumberFormat('en-US', {
            useGrouping: 'always', minimumFractionDigits: 2
        });
        return '₿ ' + btcFormat.format(sats / 100) +
            '<span style="opacity:6"> 000 000 sats </span>';
    }
}