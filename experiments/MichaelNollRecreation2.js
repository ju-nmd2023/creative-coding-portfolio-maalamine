const NUM_LINES_VAR2 = 15;
const STEPS_VAR2 = 60;

function setup() {
  createCanvas(600, 800);
  background(255);
  stroke(0);
  strokeWeight(2);
  noFill();

  for (let i = 0; i < NUM_LINES_VAR2; i++) {
    drawRandomPolylineVar2(i * 1000);
  }
}

function drawRandomPolylineVar2(seedOffset) {
  let x = width / 2 + random(-30, 30);
  let y = height / 2 - 200 + random(-150, 150);
  let noiseOffset = seedOffset;

  beginShape();
  vertex(x, y);

  for (let s = 0; s < STEPS_VAR2; s++) {
    let dx = map(noise(noiseOffset), 0, 1, -30, 30);
    let dy = map(noise(noiseOffset + 5), 0, 1, -25, 25);

    x += dx;
    y += dy;

    let centerBias = (width / 2 - x) * 0.1;
    x += centerBias;

    x = constrain(x, 0, width);
    y = constrain(y, 0, height);

    vertex(x, y);
    noiseOffset += 0.1;
  }

  endShape();
}
