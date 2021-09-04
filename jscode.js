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
  
  Ctx.moveTo(0, 0);
  Ctx.lineTo(1, 1);
  Ctx.stroke();
}
