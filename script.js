(function() {
"use strict";
const CANVAS_WIDTH = window.innerWidth;
const CANVAS_HEIGHT = window.innerHeight;
const canvas = document.getElementById('canvas');
let ctx;
let interval;
canvas.width  = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

// variables for random positioning algorithm
const numSamples = 50; 
let points = []; 
// adjust density based on screen size
const numberOfShapes = canvas.width * canvas.height / 4000;

const shapes = {
  rectangle: function (x,y) {
    const width = randomSmallSize();
    const height = randomSmallSize();
    ctx.fillRect(x, y, width, height);
  },
  
  circle: function (x,y) {
    const diameter = randomSmallSize();
    ctx.beginPath();
    ctx.arc(x, y, diameter/2, 0, Math.PI * 2, true);
    ctx.fill();
  },
  
  // x,y is the top corner of the triangle
  triangle: function (x,y) {
    const width = randomSmallSize();
    const height = width * Math.sqrt(3) / 2;
    ctx.beginPath();
    ctx.moveTo(x,y);
    ctx.lineTo(x - (width / 2), y + height);
    ctx.lineTo(x + width / 2, y + height);
    ctx.fill();
  },
};

function init() {
  if (canvas.getContext) {
    ctx = canvas.getContext('2d');
    canvas.addEventListener("click", drawShapes);
    drawShapes();
  } else {
    console.log('canvas unsupported');
  }
}

function drawShapes() {
  // stop existing interval and reset the canvas
  clearInterval(interval);
  points = [];
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let shapesDrawn = 0;
  interval = setInterval(() => {
    ctx.fillStyle = randomColor();
    randomlyPosition(rotate((randomShape())));
    shapesDrawn++;
    if (shapesDrawn >= numberOfShapes) clearInterval(interval);
  }, 5);
}

function randomColor() {
  const maxColor = parseInt('ffffff', 16);
  const randomHex = getRandomIntInRange(0,maxColor);
  return `#${randomHex.toString(16)}`;
}

function randomSmallSize() {
  return getRandomIntInRange(10, 15);
}

function randomShape() {
  const shapesKeys = Object.keys(shapes);
  const randomKey = shapesKeys[getRandomIntInRange(0, shapesKeys.length - 1)];
  return shapes[randomKey];
}

function rotate(shape) {
  return (x, y) => {
    ctx.save();
    ctx.translate(x, y); 
    ctx.rotate(2 * Math.PI * Math.random());
    shape(0,0);
    ctx.restore();
  }
}

function getRandomIntInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomlyPosition(shape) {
  const pos = getRandomPosition();
  shape(pos[0],pos[1]);
}


// Mitchell’s best-candidate algorithm
// https://bost.ocks.org/mike/algorithms/
// https://jsfiddle.net/pendensproditor/2XyV5
function getRandomPosition() {
  let bestPoint, bestDistance = 0;
  for (let i = 0; i < numSamples; ++i) {
    const newPoint = [Math.random() * canvas.width, Math.random() * canvas.height];
    if (!points.length) {
      points.push(newPoint);
      return newPoint;
    }

    const newDistance = findClosestDistance(newPoint);
    if (newDistance > bestDistance) {
      bestDistance = newDistance;
      bestPoint = newPoint;
    }
  }
  points.push(bestPoint);
  return bestPoint;
}

function distance(a, b) {
  const dx = a[0] - b[0],
      dy = a[1] - b[1];
  return Math.sqrt(dx * dx + dy * dy);
}

// this isn't very efficient for large numbers of points - todo optimise
function findClosestDistance(newPoint) {
  let bestDistance = null;
  points.forEach((p) => {
    let newPointDistance = distance(newPoint, p);
    if (newPointDistance < bestDistance || bestDistance == null) {
      bestDistance = newPointDistance;
    }
  })
  return bestDistance;
}

init();
})();


