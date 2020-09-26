"use strict";
const CANVAS_WIDTH = window.innerWidth;
const CANVAS_HEIGHT = window.innerHeight;
const canvas = document.getElementById('canvas');
let ctx;
canvas.width  = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

if (canvas.getContext) {
  ctx = canvas.getContext('2d');
} else {
  console.log('canvas unsupported');
}
canvas.addEventListener("click", draw);

function draw() {
  randomlyPosition(rectangle);
}

function getRandomIntInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomlyPosition(shape) {
  const x = getRandomIntInRange(0, CANVAS_WIDTH);
  const y = getRandomIntInRange(0, CANVAS_HEIGHT);

  ctx.fillStyle = "orange";
  shape(x,y);
}

function rectangle(x,y) {
  const rectWidth = getRandomIntInRange(10, CANVAS_WIDTH/6);
  const rectHeight = getRandomIntInRange(10, CANVAS_WIDTH/6);

  ctx.fillRect(x, y, rectWidth, rectHeight);
}



