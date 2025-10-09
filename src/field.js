// -------------------- Inspirations --------------------
// Variation of: https://codepen.io/pixelkind/pen/qBLbzoWconst

const size = 55;
const gap = 50;
const amount = 20;
const bubbleColor = [179, 188, 255];

function setup() {
  createCanvas(innerWidth, innerHeight);
  noLoop();
}

function drawCirclePattern(x, y, baseSize) {
  push();
  translate(x, y);

  for (let i = 0; i < 6; i++) {
    let alpha = map(i, 0, 5, 30, 100); // Inside to outside the transparency increases
    fill(bubbleColor[0], bubbleColor[1], bubbleColor[2], alpha);
    noStroke();

    rotate(radians(15 * i));
    ellipse(0, 0, baseSize * (1 + i * 0.3), baseSize * (1 + i * 0.3));
  }

  pop();
}

// -------------------- Background --------------------
function drawRadialGradient() {
  let centerX = width / 2;
  let centerY = height / 2;
  noStroke();
  for (let r = max(width, height); r > 0; r -= 5) {
    let inter = map(r, 0, max(width, height), 0, 1);
    let c = lerpColor(color(255, 150, 150), color(150, 0, 0), inter);
    fill(c);
    ellipse(centerX, centerY, r * 2, r * 2);
  }
}

function draw() {
  drawRadialGradient(); // Draw gradient background

  const startX = (width - (size + gap) * amount) / 2;
  const startY = (height - (size + gap) * amount) / 2;

  for (let i = 0; i < amount; i++) {
    for (let j = 0; j < amount; j++) {
      let x = startX + i * (size + gap);
      let y = startY + j * (size + gap);

      drawCirclePattern(x, y, size);
    }
  }
}
