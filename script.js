
let cake;
let currentAngle = 0;
let isDragging = false;
let centerX, centerY;
let startAngle = 0;
const daysPerDegree = 365 / 360;
const currentDate = new Date();
const dateDisplay = document.getElementById('date-display');

function preload() {
    // Load the cake image from the provided URL
    cake = loadImage('https://i.imgur.com/mNuALV0.png');
}

function setup() {
    // Create a canvas and set the center coordinates
    const canvas = createCanvas(400, 400);
    canvas.parent('canvas-container');
    centerX = width / 2;
    centerY = height / 2;
}

function draw() {
    // Clear the background and draw the rotated cake image
    background(240);
    translate(centerX, centerY);
    rotate(radians(currentAngle));
    imageMode(CENTER);
    image(cake, 0, 0, 300, 300);
}

function mousePressed() {
    // Check if the mouse is within the cake's radius to start dragging
    if (dist(mouseX, mouseY, centerX, centerY) < 100) {
        isDragging = true;
        startAngle = degrees(atan2(mouseY - centerY, mouseX - centerX));
    }
}

function mouseDragged() {
    // Update the rotation based on the mouse movement while dragging
    if (isDragging) {
        const currentMouseAngle = degrees(atan2(mouseY - centerY, mouseX - centerX));
        const deltaAngle = currentMouseAngle - startAngle;
        currentAngle = (currentAngle + deltaAngle) % 360;
        if (currentAngle < 0) {
            currentAngle += 360;
        }
        startAngle = currentMouseAngle;
        updateDateDisplay(currentAngle);
    }
}

function mouseReleased() {
    // Stop dragging when the mouse is released
    isDragging = false;
}

function updateDateDisplay(angle) {
    let age = 0;
    const urlParams = new URLSearchParams(window.location.search);
    age = urlParams.get('candleCount');
    // Update the date display based on the current angle and age
    const daysSpun = Math.round(angle * daysPerDegree);
    const birthDate = new Date(currentDate);
    birthDate.setFullYear(birthDate.getFullYear() - age);
    birthDate.setDate(birthDate.getDate() - daysSpun);
    dateDisplay.textContent = "Your birth date is: " + birthDate.toDateString();
  
}

