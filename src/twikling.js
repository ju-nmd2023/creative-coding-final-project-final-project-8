let stars = [];
let width = 800;
let height = 600;

function setup() {
  createCanvas(width, height);
  for (let i = 0; i < 500; i++) {
    stars.push({
      x: random(width),
      y: random(height),
      size: random(2, 5), // Increased size range
      alpha: random(TWO_PI),
      glow: random(150, 255), // Slightly stronger glow
    });
  }
}

function draw() {
  background(0);
  noStroke();

  for (let star of stars) {
    // Twinkling brightness
    let brightness = abs(sin(star.alpha)) * star.glow;

    // Glow effect with larger, softer circles
    for (let r = 4; r > 0; r--) {
      fill(255, 240, 200, brightness / (r * 2.5));
      ellipse(star.x, star.y, star.size * r);
    }

    // Sparkle cross (slightly bigger)
    stroke(255, brightness);
    line(star.x - 2, star.y, star.x + 2, star.y);
    line(star.x, star.y - 2, star.x, star.y + 2);
    noStroke();

    star.alpha += 0.02;
  }
}
