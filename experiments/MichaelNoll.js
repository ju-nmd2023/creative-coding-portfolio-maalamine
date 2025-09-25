const NUM_LINES = 12;
const STEPS = 40;
const STEP_X = 20;
const STEP_Y = 25;

function setup() {
  createCanvas(600, 800);
  background(255);
  stroke(0);
  strokeWeight(2);
  noFill();

  for (let i = 0; i < NUM_LINES; i++) {
    drawRandomPolyline();
  }
}

function drawRandomPolyline() {
  let x = width / 2 + random(-25, 25);
  let y = height / 2 - 200 + random(-150, 150);

  beginShape();
  vertex(x, y);

  for (let s = 0; s < STEPS; s++) {
    let dx = random([-STEP_X, STEP_X]);
    let dy = random(-STEP_Y, STEP_Y);

    x += dx;
    y += dy;

    let centerBias = (width / 2 - x) * 0.12;
    x += centerBias;

    x = constrain(x, 0, width);
    y = constrain(y, 0, height);

    vertex(x, y);
  }

  endShape();
}
