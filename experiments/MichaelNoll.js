const NUM_LINES = 40;   // how many polylines
const STEPS = 20;       // segments per polyline
const STEP_LENGTH = 40; // max step size

function setup() {
  createCanvas(800, 800);
  background(255);
  stroke(0);
  noFill();

  // generate multiple random polylines
  for (let i = 0; i < NUM_LINES; i++) {
    drawRandomPolyline();
  }
}

function drawRandomPolyline() {
  // start from a random position
  let x = random(width);
  let y = random(height);

  beginShape();
  vertex(x, y);

  for (let s = 0; s < STEPS; s++) {
    // pick a random angle and step length
    let angle = random(TWO_PI);
    let len = random(STEP_LENGTH);

    x += cos(angle) * len;
    y += sin(angle) * len;

    // keep inside canvas
    x = constrain(x, 0, width);
    y = constrain(y, 0, height);

    vertex(x, y);
  }

  endShape();
}