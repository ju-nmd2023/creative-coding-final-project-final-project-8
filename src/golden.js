// ---------------- Particle System 1 ----------------
let particles1 = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  // Initialize particles1
  for (let i = 0; i < 800; i++) {
    particles1.push(new Particle1());
  }

  // ---------------- Particle System 2 ----------------
  noFill();
  factor = 100;
  colors = [
    color(255, 120, 90, 200),
    color(220, 70, 60, 200),
    color(255, 180, 120, 200),
    color(190, 100, 200, 200),
    color(140, 120, 255, 200),
    color(100, 180, 255, 200),
    color(255, 220, 180, 200),
  ];

  particles2 = [];
  for (let i = 0; i < 500; i++) {
    particles2[i] = createVector(
      random(-width * factor, width * factor),
      random(-height * factor, height * factor),
      random(width)
    );
  }
}

// ---------------- Draw Loop ----------------
function draw() {
  background(0);

  // Particle System 1
  blendMode(SCREEN);
  for (let p of particles1) {
    p.update();
    p.render();
  }

  // Particle System 2
  blendMode(BLEND);
  translate(width / 2, height / 2);
  for (let v of particles2) {
    let x = v.x / v.z;
    let y = v.y / v.z;

    let maxSize = map(mouseY, 0, height, 10, 60);
    let d = map(v.z, 0, width, maxSize, 3);

    let c = random(colors);

    fill(c);
    noStroke();
    ellipse(x, y, d * 0.6, d * 0.6);

    noFill();
    stroke(red(c), green(c), blue(c), 100);
    strokeWeight(1);
    ellipse(x, y, d, d);

    v.z -= map(mouseX, 0, width, -5, 5);

    if (v.z < 1) {
      v.x = random(-width * factor, width * factor);
      v.y = random(-height * factor, height * factor);
      v.z = width;
    }
  }
}

// ---------------- Particle1 Class ----------------
class Particle1 {
  constructor() {
    this.reset();
  }

  reset() {
    this.angle = random(TWO_PI);
    this.dist = 0;
    this.speed = random(1, 6);
    this.size = random(1, 4);
    this.color = color(random(240, 255), random(180, 210), random(100, 140));
    this.alpha = random(180, 240);
    this.decay = random(0.5, 2);
    this.twinkleSpeed = random(0.05, 0.15);
  }

  update() {
    this.dist += this.speed;
    this.alpha =
      200 + sin(frameCount * this.twinkleSpeed + this.angle) * 55 - this.decay;
    this.size *= 0.98;
    if (this.alpha <= 0 || this.dist > width) {
      this.reset();
    }
  }

  render() {
    let x = width / 2 + cos(this.angle) * this.dist;
    let y = height / 2 + sin(this.angle) * this.dist;

    fill(red(this.color), green(this.color), blue(this.color), this.alpha);
    ellipse(x, y, this.size);

    fill(
      red(this.color),
      green(this.color),
      blue(this.color),
      this.alpha * 0.15
    );
    ellipse(x - cos(this.angle) * 8, y - sin(this.angle) * 8, this.size * 2.5);
  }
}
