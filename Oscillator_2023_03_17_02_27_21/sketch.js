// var osc;

// function preload() {
//   osc = new p5.Oscillator('sine');
//   osc.freq(300);
//   osc.amp(40);
// }

// function setup() {
//   createCanvas(400, 400);

//   osc.start();
// }

// function draw() {
//   background(220);

// }

var osc1, osc2, fft, playing, oscs, f;

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  pixelDensity(4);
  cnv.mousePressed(playOscillator);

  oscs = [];
  // let f = [9, 10, 11, 12];
  f = [10, 10.5, 11, 11.5, 12]
  // let f = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
  // let a = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];

  for (let i = 0; i < f.length; i++) {
    oscs.push(new p5.Oscillator('sin'));
    // oscs[i].amp(1 / a[i]);
    oscs[i].amp(1 / f.length);
    // oscs[i].freq(f[i] * 50);
    oscs[i].freq(1);
  }

  // osc1 = new p5.Oscillator('triangle');
  // osc2 = new p5.Oscillator('triangle');
  // osc1.amp(1);
  // osc2.amp(1);
  // osc2.phase(0.5)

  fft = new p5.FFT;

  playing = false;
}

function draw() {
  background(0);
  // frameRate(1);

  // osc1.freq(250 + 250 * sq(sin(frameCount * 0.005)));
  // osc2.freq(300 + 300 * sq(sin(frameCount * 0.005)));

  let spectrum = fft.analyze();
  push();
  translate(width / 2, height / 2);
  // noStroke();
  // fill(255, 192, 0);
  noFill();
  stroke(255, 192, 0);
  strokeWeight(0.25);
  for (let i = 0; i < spectrum.length; i++) {
    let angle = map(i, 0, spectrum.length, 0, TWO_PI);
    let radius = map(spectrum[i], 0, 255, 0, width / 2 - 20);
    let x1 = cos(angle);
    let y1 = sin(angle);
    let x2 = cos(angle + TWO_PI / spectrum.length);
    let y2 = sin(angle + TWO_PI / spectrum.length);
    triangle(0, 0, radius * x1, radius * y1, radius * x2, radius * y2);

    // let x = map(i, 0, spectrum.length, 0, width);
    // let h = -height + map(spectrum[i], 0, 255, height, 0);
    // rect(x, height, width / spectrum.length, h);
  }
  pop();

  let waveform = fft.waveform();
  noFill();
  beginShape();
  stroke(255);
  for (let i = 0; i < waveform.length; i++) {
    let x = map(i, 0, waveform.length, 0, width);
    let y = map(waveform[i], -1, 1, height / 2 - 50, height / 2 + 50);
    vertex(x, y);
  }
  endShape();
}


function playOscillator() {
  playing = !playing;

  if (playing) {
    // osc1.freq(200);
    // osc2.freq(200);
    // osc1.start();
    // osc2.start();
    // osc1.freq(500, 10);
    // osc2.freq(600, 10);

    for (let i in oscs) {
      oscs[i].start();
      oscs[i].freq(f[i] * 80, 10);
    }
  } else {
    // osc1.stop();
    // osc2.stop();

    for (let osc of oscs) {
      osc.stop();
    }
  }
}