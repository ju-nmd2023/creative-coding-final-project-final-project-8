let t = 0;
let rez = 0.01;

function setup() {
  createCanvas(600, 400);
  noStroke();
}

function draw() {
  loadPixels();

  let scale = rez;
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let n = noise(x * scale, y * scale, t);
      let bright = map(n, 0, 1, 0, 255);
      let idx = (x + y * width) * 4;
      pixels[idx + 0] = bright;
      pixels[idx + 1] = bright;
      pixels[idx + 2] = bright;
      pixels[idx + 3] = 255;
    }
  }

  updatePixels();

  t += 0.005;
}
