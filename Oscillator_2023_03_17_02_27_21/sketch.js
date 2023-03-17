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

let osc1, osc2, fft, playing;

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.mousePressed(playOscillator);
  osc1 = new p5.Oscillator('sine');
  osc2 = new p5.Oscillator('sine');
  osc1.freq(440);
  osc1.amp(10);
  osc2.freq(440);
  osc2.amp(10);
  osc2.phase(0.5)

  fft = new p5.FFT;

  playing = false;
}

function draw() {
  background(0);

  frameRate(1);


  // stroke(255);
  // strokeWeight(1);
  // translate(0, height / 2);
  // for (let i = 0; i < width; i++) {
  //   let h = 
  //   line()
  // }

  let spectrum = fft.analyze();
  noStroke();
  fill(255, 0, 255);
  for (let i = 0; i < spectrum.length; i++) {
    let x = map(i, 0, spectrum.length, 0, width);
    let h = -height + map(spectrum[i], 0, 255, height, 0);
    rect(x, height, width / spectrum.length, h);
  }

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
    osc1.start();
    osc2.start();
  } else {
    osc1.stop();
    osc2.stop();
  }
}