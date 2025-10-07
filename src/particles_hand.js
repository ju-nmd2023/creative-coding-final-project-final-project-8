let particles = [];
let factor = 100;
let colors = [];
let handpose;
let video;
let hands = [];

function preload() {
  handpose = ml5.handPose();
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  handpose.detectStart(video, getHandsData);

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
    particles[i] = createVector(
      random(-width * factor, width * factor),
      random(-height * factor, height * factor),
      random(width)
    );
  }
}

function draw() {
  image(video, 0, 0, width, height);
  background(0, 40);

  translate(width / 2, height / 2);

  let particleSpeed = 0;
  let handOffsetX = 0;
  let handOffsetY = 0;

  for (let hand of hands) {
    let indexFinger = hand.index_finger_tip;
    let thumb = hand.thumb_tip;

    let centerX = (indexFinger.x + thumb.x) / 2;
    let centerY = (indexFinger.y + thumb.y) / 2;

    let distance = dist(indexFinger.x, indexFinger.y, thumb.x, thumb.y);

    let c = random(colors);
    noStroke();
    fill(c);
    ellipse(centerX - width / 2, centerY - height / 2, distance);

    handOffsetX = map(centerX, 0, width, -5, 5);
    handOffsetY = map(centerY, 0, height, -5, 5);

    particleSpeed = map(distance, 0, 150, -5, 5);
  }

  for (let v of particles) {
    v.x += handOffsetX;
    v.y += handOffsetY;
    v.z -= particleSpeed;

    let x = v.x / v.z;
    let y = v.y / v.z;

    let d = map(v.z, 0, width, 60, 3);

    let c = random(colors);

    fill(c);
    noStroke();
    ellipse(x, y, d * 0.6, d * 0.6);

    noFill();
    stroke(red(c), green(c), blue(c), 100);
    strokeWeight(1);
    ellipse(x, y, d, d);

    if (v.z < 1) {
      v.x = random(-width * factor, width * factor);
      v.y = random(-height * factor, height * factor);
      v.z = width;
    }
  }
}

function getHandsData(results) {
  hands = results;
}
