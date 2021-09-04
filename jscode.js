"use strict";

var something;

function init() {
  
  something = 1;
  document.getElementById("something").value = something;
  drawsomething(something);
}

function drawsomething(something) {
  var Canvas = document.getElementById('animation');
  var Ctx = Canvas.getContext('2d');
  Ctx.clearRect(0, 0, Canvas.width, Canvas.height);
  
  ctx.moveTo(0, 0);
  ctx.lineTo(200, 100);
  ctx.stroke();
}
