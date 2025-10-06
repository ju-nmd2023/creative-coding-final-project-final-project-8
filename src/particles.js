let particles = [];
let factor = 100;
let colors = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
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
  background(0, 40);

  translate(width / 2, height / 2);

  for (let v of particles) {
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
