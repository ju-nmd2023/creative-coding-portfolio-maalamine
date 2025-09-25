const GRID_ROWS_VAR1 = 12;
const GRID_COLS_VAR1 = 12;
const CELL_SIZE_VAR1 = 45;

function setup() {
  createCanvas(600, 800);
  background(255);
  stroke(0);
  strokeWeight(1.8);
  noFill();

  for (let i = 0; i < GRID_COLS_VAR1; i++) {
    for (let j = 0; j < GRID_ROWS_VAR1; j++) {
      let x = i * CELL_SIZE_VAR1 + CELL_SIZE_VAR1 / 2 + 20 + random(-5, 5);
      let y = j * CELL_SIZE_VAR1 + CELL_SIZE_VAR1 / 2 + 20 + random(-5, 5);

      push();
      translate(x, y);

      let angle = random([-PI/6, -PI/12, 0, PI/12, PI/6]);
      rotate(angle);

      let size = random(30, 50);
      rectMode(CENTER);
      rect(0, 0, size, size);

      // multiple diagonals with noise
      let offset = 10;
      line(-size/2 + random(-offset, offset), -size/2 + random(-offset, offset),
           size/2 + random(-offset, offset), size/2 + random(-offset, offset));

      line(-size/2 + random(-offset, offset), size/2 + random(-offset, offset),
           size/2 + random(-offset, offset), -size/2 + random(-offset, offset));

      pop();
    }
  }
}
