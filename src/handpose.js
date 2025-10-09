// ---------------- Particle System 1 ----------------
let particles1 = [];

// ---------------- Particle System 2 (3D + Hand Control) ----------------
let particles2 = [];
let factor = 100;
let colors = [];

// ---------------- Handpose ----------------
let handpose;
let video;
let hands = [];
let handOffsetX = 0;
let handOffsetY = 0;
let particleSpeed = 0;

function preload() {
  handpose = ml5.handPose();
}

function setup() {
  createCanvas(640, 480);
  noStroke();

  // Setup camera for hand tracking
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  handpose.detectStart(video, getHandsData);

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

function draw() {
  // ---------------- Hand Detection Overlay ----------------
  background(0); // fully clear for System 1
  image(video, 0, 0, 200, 150); // small video preview

  // Process any detected hands
  if (hands.length > 0) {
    for (let hand of hands) {
      let indexFinger = hand.index_finger_tip;
      let thumb = hand.thumb_tip;

      let centerX = (indexFinger.x + thumb.x) / 2;
      let centerY = (indexFinger.y + thumb.y) / 2;
      let distance = dist(indexFinger.x, indexFinger.y, thumb.x, thumb.y);

      // Visualize pinch
      ///Pinching (distance between thumb and index) controls particleSpeed (depth speed)
      // Draw a visual for the pinch
      // if the ellipse is big the particles go faster
      // if the ellipse is small the particles go slower

      let c = random(colors);
      noStroke();
      fill(c);
      ellipse(centerX, centerY, distance * 1.5);

      // Map hand movement to particle motion
      handOffsetX = map(centerX, 0, video.width, -5, 5);
      handOffsetY = map(centerY, 0, video.height, -5, 5);
      particleSpeed = map(distance, 0, 150, -1, 7);
    }
  }

  // ---------------- Particle System 1 ----------------
  blendMode(SCREEN);
  for (let p of particles1) {
    p.update();
    p.render();
  }

  // ---------------- Particle System 2 ----------------
  blendMode(BLEND);
  push();
  translate(width / 2, height / 2);

  fill(0, 20);
  rect(-width / 2, -height / 2, width, height);

  for (let v of particles2) {
    // Move according to hand
    v.x += handOffsetX * 2;
    v.y += handOffsetY * 2;
    v.z -= particleSpeed;

    let x = v.x / v.z;
    let y = v.y / v.z;

    let maxSize = map(particleSpeed, -5, 5, 10, 60);
    let d = map(v.z, 0, width, maxSize, 3);

    let c = random(colors);

    fill(c);
    noStroke();
    ellipse(x, y, d * 0.6, d * 0.6);

    noFill();
    stroke(red(c), green(c), blue(c), 100);
    strokeWeight(1);
    ellipse(x, y, d, d);

    // Reset when too close
    if (v.z < 1) {
      v.x = random(-width * factor, width * factor);
      v.y = random(-height * factor, height * factor);
      v.z = width;
    }
  }

  pop();
}

// ---------------- Particle1 Class (using lines) ----------------
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
    let x1 = width / 2;
    let y1 = height / 2;
    let x2 = width / 2 + cos(this.angle) * this.dist;
    let y2 = height / 2 + sin(this.angle) * this.dist;

    stroke(
      red(this.color),
      green(this.color),
      blue(this.color),
      this.alpha * 0.7
    );
    strokeWeight(this.size);
    line(x1, y1, x2, y2);
  }
}

// ---------------- Handpose Callback ----------------
function getHandsData(results) {
  hands = results;
}
