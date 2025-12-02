let inc = 0.1;      
let scl = 20;       
let cols, rows;
let zoff = 0;      
let particles = [];
let flowfield;

// --- NEW: color variables ---
let hueVal = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 255, 255, 255);
  background(0, 0, 15);   // soft grayish background

  cols = floor(width / scl);
  rows = floor(height / scl);
  flowfield = new Array(cols * rows);

  // create particles
  for (let i = 0; i < 600; i++) {
    particles[i] = new Particle();
  }
}

function draw() {
  let yoff = 0;
  for (let y = 0; y < rows; y++) {
    let xoff = 0;
    for (let x = 0; x < cols; x++) {
      let angle = noise(xoff, yoff, zoff) * TWO_PI * 4;
      let v = p5.Vector.fromAngle(angle);
      v.setMag(0.6);
      let index = x + y * cols;
      flowfield[index] = v;
      xoff += inc;
    }
    yoff += inc;
  }
  zoff += 0.003;

  // slowly shift colors
  hueVal = (hueVal + 0.2) % 360;

  for (let p of particles) {
    p.follow(flowfield);
    p.update();
    p.edges();
    p.show();
  }
}

// --------------------------------
// Particle Class (same as original)
// --------------------------------
class Particle {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxspeed = 2;
    this.prevPos = this.pos.copy();
  }

  follow(vectors) {
    let x = floor(this.pos.x / scl);
    let y = floor(this.pos.y / scl);
    let index = x + y * cols;
    let force = vectors[index];
    this.applyForce(force);
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  show() {
    // --- NEW: colorful flow lines ---
    stroke(hueVal, 200, 255, 30);  
    strokeWeight(1.5);

    line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
    this.updatePrev();
  }

  updatePrev() {
    this.prevPos.x = this.pos.x;
    this.prevPos.y = this.pos.y;
  }

  edges() {
    if (this.pos.x > width) {
      this.pos.x = 0;
      this.updatePrev();
    }
    if (this.pos.x < 0) {
      this.pos.x = width;
      this.updatePrev();
    }
    if (this.pos.y > height) {
      this.pos.y = 0;
      this.updatePrev();
    }
    if (this.pos.y < 0) {
      this.pos.y = height;
      this.updatePrev();
    }
  }
}
