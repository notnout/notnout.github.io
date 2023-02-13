class Sprite {
    constructor({ position, src, box, width, height, variants, base }) {
        this.position = position;
        this.width = width;
        this.height = height;

        this.box = box;
        if (variants && base && base in variants) {
            this.box = variants[base];
        }
        this.variants = variants;

        this.loaded = false;
        this.image = new Image();
        this.image.src = src;
        this.image.onload = () => {
            this.loaded = true;
            if (this.box.repeat) this.createPattern();
        }

        this.currentFrame = 0;
        this.elapsedFrames = 0;
    }

    switchVariant(name) {
        if (!this.variants || !this.variants[name]) return;        
        this.currentFrame = 0;        
        this.box = this.variants[name];
    }

    createPattern() {
        const tempCanvas = document.createElement('canvas');
        const tempC = tempCanvas.getContext('2d');
        tempCanvas.width = this.box.width;
        tempCanvas.height = this.box.height;
        tempC.drawImage(this.image,
            this.box.x,
            this.box.y,
            this.box.width,
            this.box.height,
            0,
            0,
            this.box.width,
            this.box.height);
        this.pattern = c.createPattern(tempCanvas, 'repeat');
    }

    draw() {
        if (!this.loaded) return;
        if (this.box.repeat) {
            this.drawPattern();
        } else {
            this.drawCropbox();
        }
        this.updateFrames();
    }

    clear () {
        c.clearRect(0, 0, canvas.width, canvas.height);
    }

    drawPattern() {
        c.fillStyle = this.pattern;
        c.fillRect(0, 0, canvas.width, canvas.height);
        c.fillStyle = '';
    }

    drawCropbox() {
        const cropbox = {
            position: {
                x: this.box.x + (this.width * this.currentFrame),
                y: this.box.y,
            },
            width: this.width,
            height: this.height
        }
        c.drawImage(this.image,
            cropbox.position.x,
            cropbox.position.y,
            cropbox.width,
            cropbox.height,
            this.position.x,
            this.position.y,
            this.width,
            this.height);
    }

    updateFrames() {
        let frames = this.box.frames;
        if (!frames || frames <= 1) return;
        this.elapsedFrames++;
        if (this.elapsedFrames % (this.box.frameBuffer || 16) === 0) {
            if (this.currentFrame < frames - 1) {
                this.currentFrame++;
            } else if (this.box.loop) {
                this.currentFrame = 0;
                this.elapsedFrames = 0;
            } else {
                this.elapsedFrames = 0;
            }
        }
        if (this.box.onCompleteKey &&
            this.currentFrame === this.box.frames - 1) {
            this.switchVariant(this.box.onCompleteKey);
        }
    }
}
