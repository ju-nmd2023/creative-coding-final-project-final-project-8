// Reference 1: https://editor.p5js.org/codingtrain/sketches/4ln5hPM4Y
// Reference 2: https://editor.p5js.org/hosken/sketches/LRCedfGPY

let stars = [];
let maxStars = 5000;
let starsPerFrame = 15;

function setup() {
  createCanvas(innerWidth, innerHeight);
  background(0);
}

function draw() {
  background(12, 12, 13); // To create a fading trail effect

  // Add new stars
  for (let i = 0; i < starsPerFrame; i++) {
    if (stars.length < maxStars) {
      stars.push({
        x: random(width),
        y: random(height),
        r: random(0.2, 0.6), // Size of the star
        baseAlpha: random(150, 255),
        colorShift: random(0.8, 1.1),
      });
    }
  }

  // Draw stars
  noStroke();
  for (let s of stars) {
    // Twinkle + change color over time
    let alpha = map(
      sin(frameCount * 0.01 + s.x * 0.05),
      -1,
      1,
      s.baseAlpha * 0.8,
      s.baseAlpha
    );
    let col = color(255 * s.colorShift, 200 * s.colorShift, 255, alpha);

    // Mouse interaction: when mouse is near, star grows
    let d = dist(mouseX, mouseY, s.x, s.y);
    let r = s.r + map(max(0, 50 - d), 0, 50, 0, 1.5);

    fill(col);
    ellipse(s.x, s.y, r, r);
  }
}
