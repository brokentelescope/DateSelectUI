class Candle {
  constructor(x, y, w, h, img) {
      this.dragging = false; // Is the object being dragged?
      this.rollover = false; // Is the mouse over the ellipse?
      this.dragged = false; // if its been dragged
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      this.offsetX = 0;
      this.offsetY = 0;
      this.img = img;
      this.speedX = random(-1.5, 1.5);
      this.speedY = random(-1.5, 1.5);
  }
  
  over() {  
      // Is mouse over object
      if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
          this.rollover = true;
      } else {
          this.rollover = false;
      }
  }

  update() {
      // Adjust location if being dragged
      if (this.dragging) {
          this.x = mouseX + this.offsetX;
          this.y = mouseY + this.offsetY;
      }
  }

  show() {
      stroke(0);
      // Different fill based on state
      if (this.dragging) {
          fill(50);
      } else if (this.rollover) {
          fill(100);
      } else {
          fill(175, 200);
      }
      image(this.img, this.x, this.y, this.w, this.h);
  }

  pressed() {
      // Did I click on the rectangle?
      if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
          this.dragging = true;
          this.dragged = true;
          // If so, keep track of relative location of click to corner of rectangle
          this.offsetX = this.x - mouseX;
          this.offsetY = this.y - mouseY;
      }
  }

  released() {
      // Quit dragging
      this.dragging = false;
  }

  moveRandomly() {
    if (this.dragged === false) {
        this.x += this.speedX;
        this.y += this.speedY;

        // Change direction when hitting the edge of the canvas
        if (this.x <= 0 || this.x + this.w >= width) {
            this.speedX *= -1;
        }

        if (this.y <= 0 || this.y + this.h >= height) {
            this.speedY *= -1;
        }
    }
    
}
}
