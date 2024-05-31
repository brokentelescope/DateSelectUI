let cake;
let currentAngle = 0;
let isDragging = false;
let centerX, centerY;
const daysPerDegree = 365 / 360;
const currentDate = new Date();
const dateDisplay = document.getElementById('date-display');

function preload() {
    cake = loadImage('https://media.istockphoto.com/vectors/birthday-cake-vector-id181700213?k=20&m=181700213&s=612x612&w=0&h=gkhoLFofbHyE7smGs0ugQ0d2uYZ9s7ShX_ak5vc0ja0=');
}

function setup() {
    createCanvas(400, 400);
    centerX = width / 2;
    centerY = height / 2;
}

function draw() {
    background(240);
    translate(centerX, centerY);
    rotate(radians(currentAngle));
    imageMode(CENTER);
    Image(cake, 0, 0, 200, 200);
    if (isDragging) {
        const angle = degrees(atan2(mouseY - centerY, mouseX - centerX));
        const deltaAngle = angle - currentAngle;
        currentAngle += deltaAngle;
        updateDateDisplay(currentAngle);
    }
}

function mousePressed() {
    if (dist(mouseX, mouseY, centerX, centerY) < 100) {
        isDragging = true;
    }
}

function mouseReleased() {
    isDragging = false;
}

function updateDateDisplay(angle) {
    const daysSpun = Math.round(angle * daysPerDegree);
    const birthDate = new Date(currentDate);
    birthDate.setDate(birthDate.getDate() - daysSpun);
    dateDisplay.textContent = "Your birth date is approximately: " + birthDate.toDateString();
}