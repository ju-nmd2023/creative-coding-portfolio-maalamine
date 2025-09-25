const GRID_ROWS_VAR2 = 15;
const GRID_COLS_VAR2 = 15;
const CELL_SIZE_VAR2 = 35;

function setup() {
  createCanvas(600, 800);
  background(255);
  stroke(0);
  strokeWeight(2);
  noFill();

  for (let i = 0; i < GRID_COLS_VAR2; i++) {
    for (let j = 0; j < GRID_ROWS_VAR2; j++) {
      if (random() < 0.15) continue; // some squares missing

      let x = i * CELL_SIZE_VAR2 + CELL_SIZE_VAR2 / 2 + 20 + random(-5, 5);
      let y = j * CELL_SIZE_VAR2 + CELL_SIZE_VAR2 / 2 + 20 + random(-5, 5);

      push();
      translate(x, y);

      let angle = map(i + j, 0, GRID_COLS_VAR2 + GRID_ROWS_VAR2, -PI/8, PI/8);
      rotate(angle);

      let size = random(25, 40);
      rectMode(CENTER);
      rect(0, 0, size, size);

      // add 2 intersecting diagonals with noise
      let offset = 8;
      line(-size/2 + random(-offset, offset), -size/2 + random(-offset, offset),
           size/2 + random(-offset, offset), size/2 + random(-offset, offset));
      line(-size/2 + random(-offset, offset), size/2 + random(-offset, offset),
           size/2 + random(-offset, offset), -size/2 + random(-offset, offset));

      pop();
    }
  }
}
