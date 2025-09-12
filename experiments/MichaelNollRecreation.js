const COLS = 28;     // number of columns
const ROWS = 28;     // number of rows
const MARGIN = 40;   // margin around the grid
const SEED = 12345;  // random seed
const BASE_DOT = 6;  // base dot size
const DOT_SCALE = 16;
const JITTER = 0.48; // jitter factor

function setup() {
  createCanvas(800, 800);
  noLoop();
  randomSeed(SEED);
  noiseSeed(SEED + 1);
}

function draw() {
  background(255);
  stroke(0);
  fill(0);

  const w = width - MARGIN * 2;
  const h = height - MARGIN * 2;
  const cellW = w / COLS;
  const cellH = h / ROWS;
  const cellSize = min(cellW, cellH);

  translate(MARGIN, MARGIN);

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const cx = (c + 0.5) * cellSize;
      const cy = (r + 0.5) * cellSize;

      const cellRand = randHash(SEED, c, r);

      const jitterX = (random(-1, 1) * JITTER) * cellSize;
      const jitterY = (random(-1, 1) * JITTER) * cellSize;

      const centerDist = dist(cx, cy, width / 2 - MARGIN, height / 2 - MARGIN);
      const maxCenter = dist(0, 0, (width - 2 * MARGIN) / 2, (height - 2 * MARGIN) / 2);
      const radialFactor = 1 - (centerDist / maxCenter);

      const randSizeFactor = pow(cellRand, 1.3);
      const dotRadius = BASE_DOT + randSizeFactor * DOT_SCALE * radialFactor;

      const x = cx + jitterX;
      const y = cy + jitterY;

      noStroke();
      fill(0);

      if (cellRand > 0.86) {
        // ring
        stroke(0);
        strokeWeight(max(1, dotRadius * 0.22));
        noFill();
        circle(x, y, dotRadius * 2.1);
      } else if (cellRand > 0.6) {
        // half-disc
        push();
        translate(x, y);
        rotate((cellRand - 0.5) * TWO_PI * 0.4);
        arc(0, 0, dotRadius * 2.0, dotRadius * 2.0, 0, PI + cellRand * PI);
        pop();
      } else {
        // filled disc
        noStroke();
        circle(x, y, dotRadius * 2.0);
      }
    }
  }
}

// deterministic hash → random [0,1)
function randHash(seed, x, y) {
  let n = (seed * 1315423911) ^ (x * 2654435761) ^ (y * 805459861);
  n = (n >>> 0);
  n ^= n << 13;
  n ^= n >>> 17;
  n ^= n << 5;
  return (n >>> 0) / 4294967296;
}