let particles = [];
let numParticles = 1000;
let attractors = [];

function setup() {
  createCanvas(600, 800);
  colorMode(HSB, 360, 100, 100, 100);
  background(0);

  // create a few attractors (invisible points)
  for (let i = 0; i < 5; i++) {
    attractors.push(createVector(random(width), random(height)));
  }

  // create particles
  for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle());
  }
}

function draw() {
  noStroke();
  fill(0, 0.05); // subtle fading
  rect(0, 0, width, height); 

  for (let p of particles) {
    p.update();
    p.show();
  }
}

class Particle {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = p5.Vector.random2D();
    this.acc = createVector(0, 0);
    this.hue = random(360);
    this.maxSpeed = 2;
  }

  update() {
    // find nearest attractor
    let closest = null;
    let closestDist = 1e9;
    for (let a of attractors) {
      let d = dist(this.pos.x, this.pos.y, a.x, a.y);
      if (d < closestDist) {
        closestDist = d;
        closest = a;
      }
    }

    // orbit around attractor + add noise
    if (closest) {
      let angle = atan2(this.pos.y - closest.y, this.pos.x - closest.x);
      let orbitForce = p5.Vector.fromAngle(angle + HALF_PI);
      orbitForce.setMag(0.05);

      let n = noise(this.pos.x * 0.005, this.pos.y * 0.005, frameCount * 0.002);
      let noiseForce = p5.Vector.random2D().mult(map(n, 0, 1, 0, 0.2));

      this.acc.add(orbitForce);
      this.acc.add(noiseForce);
    }

    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);

    // wrap edges
    if (this.pos.x > width) this.pos.x = 0;
    if (this.pos.x < 0) this.pos.x = width;
    if (this.pos.y > height) this.pos.y = 0;
    if (this.pos.y < 0) this.pos.y = height;
  }

  show() {
    stroke(this.hue, 80, 100, 50);
    strokeWeight(1);
    point(this.pos.x, this.pos.y);
  }
}
