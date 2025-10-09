// Reference 1: https://editor.p5js.org/Drea007/sketches/JQHw7A49n
let particles = [];

function setup() {
  createCanvas(1230, 670);
  noStroke();

  // Set blend mode to SCREEN for soft particle glow
  // Reference: https://p5js.org/reference/p5/blendMode/
  blendMode(SCREEN);

  // Initialize particles
  for (let i = 0; i < 800; i++) {
    particles.push(new Particle());
  }
}

function draw() {
  background(0);

  // Update and render each particle
  for (let p of particles) {
    p.update();
    p.render();
  }
}

// ------------------------------- Particle Class ------------------------------
class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    // Random initial angle and distance
    this.angle = random(TWO_PI);
    this.dist = 0;

    // Random speed and size
    this.speed = random(1, 6);
    this.size = random(1, 4);

    this.color = color(random(240, 255), random(180, 210), random(100, 140));

    // Transparency for smooth glow
    this.alpha = random(180, 240);
    this.decay = random(0.5, 2);

    // Twinkle speed
    this.twinkleSpeed = random(0.05, 0.15);
  }

  update() {
    // Move particle outward
    this.dist += this.speed;

    // Twinkle effect
    this.alpha =
      200 + sin(frameCount * this.twinkleSpeed + this.angle) * 55 - this.decay;

    // Shrink particle slightly over time
    this.size *= 0.98;

    // Reset particle if it becomes invisible or moves off screen
    if (this.alpha <= 0 || this.dist > width) {
      this.reset();
    }
  }

  render() {
    // Calculate particle position in circular motion
    let x = width / 2 + cos(this.angle) * this.dist;
    let y = height / 2 + sin(this.angle) * this.dist;

    fill(red(this.color), green(this.color), blue(this.color), this.alpha);
    ellipse(x, y, this.size);

    // Soft glow trail
    fill(
      red(this.color),
      green(this.color),
      blue(this.color),
      this.alpha * 0.15
    );
    ellipse(x - cos(this.angle) * 8, y - sin(this.angle) * 8, this.size * 2.5);
  }
}
