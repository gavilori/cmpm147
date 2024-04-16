// sketch.js - purpose and description here
// Author: Your Name
// Date:

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
let seed = 0;

const orange = "#d08c2a";
const mid_green = "#bcca62";
const dark_green = "#4f643a";
const tree_color = "#090b05";
const sand_color = "#192112";
const water_color = "#635729";
const cloudA = "#938849";
const cloudB = "#9f9b52";
const cloudC = "#b6b042";

// Globals


function resizeScreen() {
  centerHorz = canvasContainer.width() / 2; // Adjusted for drawing logic
  centerVert = canvasContainer.height() / 2; // Adjusted for drawing logic
  console.log("Resizing...");
  resizeCanvas(canvasContainer.width(), canvasContainer.height());
  // redrawCanvas(); // Redraw everything based on new size
}

// setup() function is called once when the program starts
function setup() {
  // place our canvas, making it fit our container
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
  canvas.parent("canvas-container");
  // resize canvas is the page is resized

  // create an instance of the class
  myInstance = new MyClass("VALUE1", "VALUE2");

  $(window).resize(function() {
    resizeScreen();
  });
  resizeScreen();
}

// draw() function is called repeatedly, it's the main animation loop
// modified code from: https://p5js.org/examples/color-linear-gradient.html 
function horizontalGradient(x, y, w, h, colorFrom, colorTo) {
  noFill();
  for (let i = y; i <= y + h; i++) {
    let inter = map(i, y, y + h, 0, 1);
    let c = lerpColor(colorFrom, colorTo, inter);
    stroke(c);
    line(x, i, x + w, i);
  }
  noStroke();
}

// noise code from: https://p5js.org/reference/#/p5/noise
function draw() {
  randomSeed(seed);
  background(dark_green);
  noStroke();
  
  // gradient background
  let yOffset = (mouseY - height/2);
  horizontalGradient(0, 0.07*yOffset - 20, width, height, color(dark_green), color(mid_green));
  
  // clouds
  const clouds = [cloudA, cloudB, cloudC]
  const numClouds = 3 + 10 * random();
  for (let i = 0; i < numClouds; i++) {
    let cloudFill = color(random(clouds));
    cloudFill.setAlpha(70 + 30 * random());
    fill(cloudFill);
    
    let x = width * random() + (0.05 * random() * millis()) % (width);
    let y = 60 * random() - 10;
    let r_x = 500 * random() + 250;
    let r_y = 20 * random() + 20;
    
    ellipse(x, y, r_x, r_y);
  }
  
  
  // sun
  fill(orange);
  ellipse(width/2, height/2 + 10 + 0.04*yOffset, 75)
  
  // water / horizon
  fill(water_color);
  rect(0, height/2 + 10, width);
  
  // sand
  fill(sand_color);
  
  beginShape();
  
  let noiseLevelSand = 10 + 5 * random();
  let noiseScaleSand = 0.01 + 0.01 * random();
  noiseDetail(4, 0.1)
  for (let x = 0; x < width; x++) {
    let nx = noiseScaleSand * x;
    let y = height/2 + 20 + noiseLevelSand * noise(nx);
    vertex(x, y);
  }
  
  vertex(width, height);
  vertex(0, height);
  
  
  endShape();
  
  
  // grassy hill section
  fill(tree_color);
  
  beginShape();
  
  let firstY;
  
  let noiseLevelTop = 20 + 10*random();
  let noiseScaleTop = 0.02 + 0.01 * random();
  noiseDetail(4, 0.2)
  for (let x = width/2; x < width; x++) {
    let nx = noiseScaleTop * x;
    let y = 110 + noiseLevelTop * noise(nx);
    vertex(x, y);
    
    if (x == width/2) {
      firstY = y;
    }
  }
  
  vertex(width, height);
  vertex(width/2, height);
  endShape();
  
  // left edge of grass
  beginShape();
  curveVertex(width/2, height);
  curveVertex(width/2, height);
  
  curveVertex(width/2 - 20 * random(), 170 + 20 * random());
  curveVertex(width/2 - 20 * random(), 120 + 10 * random());
  
  curveVertex(width/2, firstY);
  curveVertex(width/2, firstY);
  
  endShape();
  
  // trees
  noStroke();
  fill(tree_color);
  
  let numTrees = 3 * random();
  const yBottom = 140;
  const yTop = 0;
  for (let i = 0; i < numTrees; i++) {
    let w = 15 + 10 * random();
    let x = width/2 + (width/2) * random();
    
    // trunk
    quad(x, yBottom, x, yTop, x + w, yTop, x + w, yBottom);
    
    // leaves
    let yLeaf1 = 60 + 25 * random();
    let yLeaf2 = 30 + 15 * random();
    let yLeaf3 = 5 + 20 * random();
    let dist = -(40 + 30 * random());
    triangle(x-w, yLeaf1, x+w/2, dist, x+2*w, yLeaf1);
    triangle(x-w, yLeaf2, x+w/2, dist, x+2*w, yLeaf2);
    triangle(x-w, yLeaf3, x+w/2, dist, x+2*w, yLeaf3);
  }
}