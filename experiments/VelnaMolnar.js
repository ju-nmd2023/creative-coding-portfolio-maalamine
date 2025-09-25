const GRID_ROWS = 10;
const GRID_COLS = 10;
const CELL_SIZE = 50;

function setup() {
  createCanvas(600, 800);
  background(255);
  stroke(0);
  strokeWeight(2);
  noFill();

  for (let i = 0; i < GRID_COLS; i++) {
    for (let j = 0; j < GRID_ROWS; j++) {
      let x = i * CELL_SIZE + CELL_SIZE / 2 + 50;
      let y = j * CELL_SIZE + CELL_SIZE / 2 + 50;

      push();
      translate(x, y);

      // subtle rotation
      let angle = random([-PI/12, 0, PI/12]);
      rotate(angle);

      // draw square
      rectMode(CENTER);
      rect(0, 0, 40, 40);

      // add diagonal line inside square with slight random shift
      let offset = 5;
      line(-20 + random(-offset, offset), -20 + random(-offset, offset),
           20 + random(-offset, offset), 20 + random(-offset, offset));

      pop();
    }
  }
}
