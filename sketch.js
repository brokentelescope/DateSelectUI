let candles = [];
let candle_imgs = [];
let dragging = false; // Global flag to track if any object is being dragged
let cake_top, cake_side;
const candle_width = 30;
const candle_height = 200;
const numCandles = 100;
let candleCount = 0;

function preload() {
    // purple candle
    candle_imgs.push(loadImage('https://i.imgur.com/1IyBHyX.png'));
    // green candle
    candle_imgs.push(loadImage('https://i.imgur.com/mmvklo0.png'));
    // blue candle
    candle_imgs.push(loadImage('https://i.imgur.com/rWiDYd4.png'));
    // cake side view
    cake_side = loadImage('https://i.imgur.com/nNur0sG.png');
    // cake top view
    cake_top = loadImage('https://i.imgur.com/PQaxfSL.png');
}

function setup() {
    createCanvas(windowWidth, windowHeight);


    const centerXStart = windowWidth * 0.3 - candle_width;
    const centerXEnd = windowWidth * 0.7;
    const centerYStart = windowHeight * 0.3 - candle_height;
    const centerYEnd = windowHeight * 0.7;

    for (let i = 1; i <= numCandles; i++) {
        while (true) {
            let x = random(width - 50), y = random(height - 50);
            if (!(x < centerXEnd && x > centerXStart && y < centerYEnd && y > centerYStart)) {
                let img = candle_imgs[Math.floor(Math.random() * candle_imgs.length)];
                candles.push(new Candle(x, y, candle_width, candle_height, img));
                break;
            }
        }
    }
    rect(centerXStart, centerYStart, centerXEnd - centerXStart, centerYEnd - centerYStart);

}

function draw() {
    background(255);
    const centerXStart = windowWidth * 0.3;
    const centerXEnd = windowWidth * 0.7;
    const centerYStart = windowHeight * 0.3;
    const centerYEnd = windowHeight * 0.7;
    fill(255, 0, 0, 50); // Red color with transparency
    noStroke();
    rect(centerXStart, centerYStart, centerXEnd - centerXStart, centerYEnd - centerYStart);

    // Update and display all Candle objects
    for (let candle of candles) {
        candle.over();
        candle.update();
        candle.show();
    }
    let candleCount = countCandlesInRectangle(centerXStart, centerXEnd, centerYStart, centerYEnd);
    document.getElementById('ageDisplay').innerHTML = 'Your age: ' + candleCount;
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

function countCandlesInRectangle(x1, x2, y1, y2) {
    let count = 0;
    for (let candle of candles) {
        if (candle.x >= x1 && candle.x <= x2 && candle.y >= y1 && candle.y <= y2) {
            count++;
        }
    }
    return count;
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

document.getElementById('ageForm').addEventListener('submit', function(event) {
    const candleCount = document.getElementById('ageDisplay').innerText.split(': ')[1];
    document.getElementById('candleCountInput').value = candleCount;
});