const NUM_LINES_VAR1 = 20;
const STEPS_VAR1 = 50;

function setup() {
  createCanvas(600, 800);
  background(255);
  stroke(0);
  strokeWeight(1.5);
  noFill();

  for (let i = 0; i < NUM_LINES_VAR1; i++) {
    drawRandomPolylineVar1();
  }
}

function drawRandomPolylineVar1() {
  let x = width / 2 + random(-50, 50);
  let y = height / 2 - 200 + random(-150, 150);

  beginShape();
  vertex(x, y);

  for (let s = 0; s < STEPS_VAR1; s++) {
    let dx = random([-30, -15, 15, 30]);
    let dy = random(-30, 30);

    x += dx;
    y += dy;

    let centerBias = (width / 2 - x) * 0.15;
    x += centerBias;

    x = constrain(x, 0, width);
    y = constrain(y, 0, height);

    vertex(x, y);
  }

  endShape();
}
