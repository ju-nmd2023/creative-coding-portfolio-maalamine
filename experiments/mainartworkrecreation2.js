let inc = 0.15;
let scl = 15;
let cols, rows;
let zoff = 0;
let particles = [];
let flowfield;
let synth;




function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  cols = floor(width / scl);
  rows = floor(height / scl);
  flowfield = new Array(cols * rows);

  for (let i = 0; i < 800; i++) {
    particles[i] = new Particle();
  }

  synth = new Tone.Synth(
  { 
  oscillator: { type: 'sine' }, 
  envelope: { attack: 0.1, decay: 0.2, sustain: 0.3, release: 1 } }
  )
  .toDestination();

}

function draw() {
  // fade effect
  noStroke();
  fill(0, 20);
  rect(0, 0, width, height);

  let yoff = 0;
  for (let y = 0; y < rows; y++) {
    let xoff = 0;
    for (let x = 0; x < cols; x++) {
      let angle = noise(xoff, yoff, zoff) * TWO_PI * 6;
      let v = p5.Vector.fromAngle(angle);
      v.setMag(1); // stronger field
      let index = x + y * cols;
      flowfield[index] = v;
      xoff += inc;
    }
    yoff += inc;
  }
  zoff += 0.01;

  for (let i = 0; i < particles.length; i++) {
    particles[i].follow(flowfield);
    particles[i].update();
    particles[i].edges();
    particles[i].show();
    if(random() < 0.3){
      let freq = map(particles[i].pos.x, 0, width, 200, 800);
      synth.triggerAttackRelease(freq, '8n');
      Tone.start();
    }
  }
}

class Particle {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxspeed = 4;
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
    stroke(255, 40);
    strokeWeight(2);
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
