// ---------------- Particle System 1 ----------------
let particles1 = [];

// ---------------- Particle System 2 ----------------
let particles2 = [];
let factor = 100;
let colors = [];

// ---------------- Static Starfield Layer ----------------
let staticLayer;
let stars = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  setupStars();

  // ---------------- Initialize Particle System 1 ----------------
  blendMode(SCREEN);
  for (let i = 0; i < 800; i++) {
    particles1.push(new Particle1());
  }

  // ---------------- Initialize Particle System 2 ----------------
  noFill();
  colors = [
    color(255, 120, 90, 200),
    color(220, 70, 60, 200),
    color(255, 180, 120, 200),
    color(190, 100, 200, 200),
    color(140, 120, 255, 200),
    color(100, 180, 255, 200),
    color(255, 220, 180, 200),
  ];

  for (let i = 0; i < 500; i++) {
    particles2[i] = createVector(
      random(-width * factor, width * factor),
      random(-height * factor, height * factor),
      random(width)
    );
  }
}

// ---------------- Setup Static Starfield Layer ----------------
function setupStars() {
  staticLayer = createGraphics(windowWidth, windowHeight);

  // Gradient Background
  let centerX = staticLayer.width / 2;
  let centerY = staticLayer.height / 2;
  for (let r = max(staticLayer.width, staticLayer.height); r > 0; r -= 5) {
    let inter = map(r, 0, max(staticLayer.width, staticLayer.height), 0, 1);
    let c = lerpColor(color(9, 16, 36), color(6, 37, 56), inter);
    staticLayer.fill(c);
    staticLayer.noStroke();
    staticLayer.ellipse(centerX, centerY, r * 2, r * 2);
  }

  // Create Twinkling Stars
  stars = [];
  for (let i = 0; i < 500; i++) {
    stars.push({
      x: random(width),
      y: random(height),
      size: random(2, 5),
      alpha: random(TWO_PI),
      glow: random(150, 255),
    });
  }
}

function draw() {
  // Static Background Layer
  image(staticLayer, 0, 0);

  // Twinkling Stars
  drawTwinkleStars();

  // Particle System 1
  blendMode(SCREEN);
  for (let p of particles1) {
    p.update();
    p.render();
  }

  // Particle System 2
  blendMode(BLEND);
  push();
  translate(width / 2, height / 2);
  fill(0, 20);

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

    v.z -= map(mouseX, 1, height, 1, 5);

    if (v.z < 1) {
      v.x = random(-width * factor, width * factor);
      v.y = random(-height * factor, height * factor);
      v.z = width;
    }
  }

  pop();
}

// ---------------- Draw Twinkling Stars ----------------
function drawTwinkleStars() {
  noStroke();

  for (let star of stars) {
    let brightness = abs(sin(star.alpha)) * star.glow;

    // Glow effect
    for (let r = 4; r > 0; r--) {
      fill(255, 240, 200, brightness / (r * 2.5));
      ellipse(star.x, star.y, star.size * r);
    }

    // Sparkle cross
    stroke(255, brightness);
    line(star.x - 2, star.y, star.x + 2, star.y);
    line(star.x, star.y - 2, star.x, star.y + 2);
    noStroke();

    star.alpha += 0.02;
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
    this.color = color(random(240, 255), random(100, 210), random(100, 140));
    this.alpha = random(180, 240);
    this.decay = random(0.5, 2);
    this.twinkleSpeed = random(0.05, 0.175);
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
    let x1 = width / 2;
    let y1 = height / 2;

    let x2 = width / 2 + cos(this.angle) * this.dist;
    let y2 = height / 2 + sin(this.angle) * this.dist;

    stroke(
      red(this.color),
      green(this.color),
      blue(this.color),
      this.alpha * 0.9
    );
    strokeWeight(this.size);
    line(x1, y1, x2, y2);
  }
}
