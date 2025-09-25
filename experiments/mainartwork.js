let inc = 0.1;      // increment for noise field
let scl = 20;       // scale of flow field grid
let cols, rows;
let zoff = 0;       // z-offset for 3D noise
let particles = [];
let flowfield;

function setup() {
  createCanvas(600, 800);
  background(255);
  cols = floor(width / scl);
  rows = floor(height / scl);
  flowfield = new Array(cols * rows);

  // create lots of particles
  for (let i = 0; i < 500; i++) {
    particles[i] = new Particle();
  }
}

function draw() {
  let yoff = 0;
  for (let y = 0; y < rows; y++) {
    let xoff = 0;
    for (let x = 0; x < cols; x++) {
      let angle = noise(xoff, yoff, zoff) * TWO_PI * 4; // flow angle
      let v = p5.Vector.fromAngle(angle);
      v.setMag(0.5);
      let index = x + y * cols;
      flowfield[index] = v;
      xoff += inc;
    }
    yoff += inc;
  }
  zoff += 0.003;

  for (let i = 0; i < particles.length; i++) {
    particles[i].follow(flowfield);
    particles[i].update();
    particles[i].edges();
    particles[i].show();
  }
}

// Particle class
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
    stroke(0, 25);  // translucent black trails
    strokeWeight(1);
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
