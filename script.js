"use strict";
const CANVAS_WIDTH = window.innerWidth;
const CANVAS_HEIGHT = window.innerHeight;
const canvas = document.getElementById('canvas');
let ctx;
canvas.width  = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

// variables for random positioning algorithm
const numSamples = 50; 
const points = []; 
const numberOfShapes = 100;

function init() {
  if (canvas.getContext) {
    ctx = canvas.getContext('2d');
  } else {
    console.log('canvas unsupported');
  }
  canvas.addEventListener("click", draw);
}

function draw() {
  let shapesDrawn = 0;
  const interval = setInterval(() => {
    randomlyPosition(equilateralTriangle);
    shapesDrawn++;

    if (shapesDrawn === numberOfShapes) clearInterval(interval);
  }, 5);
}

function getRandomIntInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomlyPosition(shape) {
  const pos = getRandomPosition();

  ctx.fillStyle = "green";
  shape(pos[0],pos[1]);
}

function rectangle(x,y) {
  const rectWidth = getRandomIntInRange(10, 15);
  const rectHeight = getRandomIntInRange(10, 15);

  ctx.fillRect(x, y, rectWidth, rectHeight);
}

// x,y is the top corner of the triangle
function equilateralTriangle(x,y) {
  const triangleWidth = getRandomIntInRange(10, 15);
  const triangleHeight = triangleWidth * Math.sqrt(3) / 2;
  ctx.beginPath();
  ctx.moveTo(x,y);
  ctx.lineTo(x - (triangleWidth / 2), y + triangleHeight);
  ctx.lineTo(x + triangleWidth / 2, y + triangleHeight);
  ctx.fill();
}

// Mitchell’s best-candidate algorithm
// https://bost.ocks.org/mike/algorithms/
// https://jsfiddle.net/pendensproditor/2XyV5
function getRandomPosition() {
  let bestPoint, bestDistance = 0;
  for (let i = 0; i < numSamples; ++i) {
    const newPoint = [Math.random() * CANVAS_WIDTH, Math.random() * CANVAS_HEIGHT];
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


