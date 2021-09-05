"use strict";

var time,dt;
var amplitude,frequency,speed;
var omega,k;
var scale;

function init(){
  stopped = 0;
  
  amplitude = 8;
  frequency = 0.5;
  speed = 10;
  document.getElementById("amplitude").value = amplitude;
  document.getElementById("frequency").value = frequency;
  document.getElementById("speed").value = speed;
  omega = frequency*2*Math.PI;
  k = omega/speed;
  document.getElementById("angfreq").innerHTML = omega.toPrecision(3);
  document.getElementById("wavenumber").innerHTML = k.toPrecision(3);

  
  time = 0;
  dt = 20;
  scale = 5;
  draw();
  time = 0;
  document.getElementById("timer").innerHTML = "t = 0.00s";
  
  drawaxes();
}

function update(){
  var a1 = document.getElementById("amplitude").value;
  var f1 = document.getElementById("frequency").value;
  var u1 = document.getElementById("speed").value;
  amplitude = a1;
  frequency = f1;
  speed = u1;
  omega = frequency*2*Math.PI;
  k = omega/speed;
  document.getElementById("angfreq").innerHTML = omega.toPrecision(2);
  document.getElementById("wavenumber").innerHTML = k.toPrecision(2);
  time -= dt*1e-3;
  draw();
}

function drawaxes(){
  var cnv = document.getElementById('animation');
  var ctx = cnv.getContext('2d');
  
  var w = cnv.width,h = cnv.height;
  
  ctx.lineWidth = 1;
  ctx.strokeStyle = 'black';
  ctx.beginPath();
  ctx.moveTo(0, h/2);
  ctx.lineTo(w, h/2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(w/2,0);
  ctx.lineTo(w/2,h);
  ctx.stroke();
}

let id = null;
var stopped = 0;

function stop(){
  stopped = 1;
  window.clearInterval(id);
}

function play(){
  if(stopped == 0) time = 0;
  stopped = 0;

  /* var cnv = document.getElementById('animation'); 
  var ctx = cnv.getContext('2d');
  ctx.clearRect(0,0,cnv.width,cnv.height);
  drawaxes(); */
 
  window.clearInterval(id);
  id = window.setInterval(draw,dt);
}

function draw(){
  time += dt*1e-3;
  document.getElementById("timer").innerHTML = "t = "+time.toPrecision(3)+" s";
  if(time > 10){
    window.clearInterval(id);
    return;
  }

  var cnv = document.getElementById('animation');
  var ctx = cnv.getContext('2d');
  ctx.clearRect(0,0,cnv.width,cnv.height);
  drawaxes();
  ctx.beginPath();
  
  var dx = 0.01;
  var len = Math.round((cnv.width/2)/dx);
  ctx.strokeStyle = 'blue';
  ctx.lineWidth = 3;
  for(var i = -len+1; i <= len-1; i++){
    var x = dx*i;
    var y = scale*(amplitude*Math.sin(omega*time-k*(x/scale)));
    if(i == -len+1) ctx.moveTo(cnv.width/2+x,cnv.height/2-y);
    else ctx.lineTo(cnv.width/2+x,cnv.height/2-y);
  }
  ctx.stroke();
}
