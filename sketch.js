let candles = [];
let img;
let dragging = false; // Global flag to track if any object is being dragged

function preload() {
    // Load your image here
    img = loadImage('https://i.imgur.com/0L7xU5S.png');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    // Create multiple Candle objects
    for (let i = 0; i < 10; i++) {
        let x = random(width - 50);
        let y = random(height - 50);
        candles.push(new Candle(x, y, 50, 50, img));
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