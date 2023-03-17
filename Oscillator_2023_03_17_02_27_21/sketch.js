var osc;

function setup() {
  createCanvas(400, 400);
  
  osc = new p5.Oscillator('sine');
  osc.freq(300);
  osc.amp(40);
  
  osc.start
}

function draw() {
  background(220);
}