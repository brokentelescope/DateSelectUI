let candles = [];
let candle_imgs = [];
let dragging = false; // Global flag to track if any object is being dragged

function preload() {
    // purple candle
    candle_imgs.push(loadImage('https://i.imgur.com/1IyBHyX.png'));
    // green candle
    candle_imgs.push(loadImage('https://i.imgur.com/mmvklo0.png'));
    // blue candle
    candle_imgs.push(loadImage('https://i.imgur.com/rWiDYd4.png'));
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    // Create multiple Candle objects
    for (let i = 1; i <= 100; i++) {
        let x = random(width - 50);
        let y = random(height - 50);
        // get random candle image
        let img = candle_imgs[Math.floor(Math.random() * candle_imgs.length)];
        candles.push(new Candle(x, y, 30, 200, img));
    }
}

function draw() {
    background(255);
    // Update and display all Candle objects
    for (let candle of candles) {
        candle.over();
        candle.update();
        candle.show();
    }
}

function mousePressed() {
    // Check all candles for mouse press in reverse order
    for (let i = candles.length - 1; i >= 0; i--) {
        let candle = candles[i];
        candle.pressed();
        if (candle.dragging) {
            // Move the clicked candle to the end of the array to ensure it is drawn on top
            candles.push(candles.splice(i, 1)[0]);
            break;  // Stop checking once the topmost candle is found
        }
    }
}

function mouseReleased() {
    // Release all candles
    for (let candle of candles) {
        candle.released();
    }
    dragging = false; // Reset the dragging flag when the mouse is released
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}