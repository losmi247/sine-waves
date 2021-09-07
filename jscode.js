"use strict";

var time,dt;
var amplitude1,frequency1,speed1,phase1;
var omega1,k1;
var amplitude2,frequency2,speed2,phase2;
var omega2,k2;
var scale;

var fr1,fr2;

function init(){
  stopped = 0;
  
  amplitude1 = 8;
  frequency1 = 0.5;
  speed1 = 10;
  phase1 = 0;
  document.getElementById("amplitude1").value = amplitude1;
  document.getElementById("frequency1").value = frequency1;
  document.getElementById("speed1").value = speed1;
  document.getElementById("phase1").value = phase1;
  omega1 = frequency1*2*Math.PI;
  k1 = omega1/speed1;
  document.getElementById("angfreq1").innerHTML = omega1.toPrecision(3);
  document.getElementById("wavenumber1").innerHTML = k1.toPrecision(3);
  
  amplitude2 = 8;
  frequency2 = 0.5;
  speed2 = 10;
  phase2 = 0;
  document.getElementById("amplitude2").value = amplitude2;
  document.getElementById("frequency2").value = frequency2;
  document.getElementById("speed2").value = speed2;
  document.getElementById("phase2").value = phase2;
  omega2 = frequency2*2*Math.PI;
  k2 = omega2/speed2;
  document.getElementById("angfreq2").innerHTML = omega2.toPrecision(3);
  document.getElementById("wavenumber2").innerHTML = k2.toPrecision(3);
  
  time = 0;
  dt = 30;
  scale = 5;
  draw1();
  time = 0;
  document.getElementById("timer").innerHTML = "t = 0.00s";
  
  
  
  fr1=440;
  fr2=441;
  document.getElementById("fr1").value = fr1;
  document.getElementById("fr2").value = fr2;
  on1 = on2 = 0;
}

function update(){
  var a2 = document.getElementById("amplitude2").value;
  var f2 = document.getElementById("frequency2").value;
  var u2 = document.getElementById("speed2").value;
  var p2 = document.getElementById("phase2").value;
  amplitude2 = a2;
  frequency2 = f2;
  speed2 = u2;
  phase2 = p2;
  omega2 = frequency2*2*Math.PI;
  k2 = omega2/speed2;
  document.getElementById("angfreq2").innerHTML = omega2.toPrecision(3);
  document.getElementById("wavenumber2").innerHTML = k2.toPrecision(3);
  /*time -= dt*1e-3;
  draw2();*/
  
  var a1 = document.getElementById("amplitude1").value;
  var f1 = document.getElementById("frequency1").value;
  var u1 = document.getElementById("speed1").value;
  var p1 = document.getElementById("phase1").value;
  amplitude1 = a1;
  frequency1 = f1;
  speed1 = u1;
  phase1 = p1;
  omega1 = frequency1*2*Math.PI;
  k1 = omega1/speed1;
  document.getElementById("angfreq1").innerHTML = omega1.toPrecision(3);
  document.getElementById("wavenumber1").innerHTML = k1.toPrecision(3);
  time -= dt*1e-3;
  draw1();
}

function drawaxes1(){
  var cnv = document.getElementById('wave1');
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

function drawaxes2(){
  var cnv = document.getElementById('wave2');
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

function drawaxes3(){
  var cnv = document.getElementById('sum');
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
  if(stopped == 0 || (stopped == 1 && time > 10)) time = 0;
  stopped = 0;

  /* var cnv = document.getElementById('animation'); 
  var ctx = cnv.getContext('2d');
  ctx.clearRect(0,0,cnv.width,cnv.height);
  drawaxes(); */
 
  window.clearInterval(id);
  id = window.setInterval(draw1,dt);
}

function draw1(){
  time += dt*1e-3;
  //document.getElementById("timer").innerHTML = "t = "+time.toPrecision(3)+" s";

  var cnv = document.getElementById('wave1');
  var ctx = cnv.getContext('2d');
  ctx.clearRect(0,0,cnv.width,cnv.height);
  drawaxes1();
  ctx.beginPath();
  
  var dx = 0.01;
  var len = Math.round((cnv.width/2)/dx);
  ctx.strokeStyle = 'blue';
  ctx.lineWidth = 3;
  for(var i = -len+1; i <= len-1; i++){
    var x = dx*i;
    var y = scale*(amplitude1*Math.sin(Math.sign(phase1)*Math.abs(phase1)+(omega1*time)-(k1*(x/scale))));
    if(i == -len+1) ctx.moveTo(cnv.width/2+x,cnv.height/2-y);
    else ctx.lineTo(cnv.width/2+x,cnv.height/2-y);
  }
  ctx.stroke();
  
  ctx.strokeStyle = 'red';
  ctx.fillStyle = 'red';
  ctx.beginPath();
  ctx.moveTo(cnv.width/2,cnv.height/2);
  var where = scale*(amplitude1*Math.sin(Math.sign(phase1)*Math.abs(phase1)+(omega1*time)));
  ctx.lineTo(cnv.width/2,cnv.height/2-where);
  ctx.fillRect(cnv.width/2-3,cnv.height/2-where,6,6);
  ctx.stroke();
  
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.strokeText("y="+where.toPrecision(2)+"px",450,260);
  
  time -= dt*1e-3;
  draw2();
  
  if(time > 10){
    window.clearInterval(id);
    return;
  }
}

function draw2(){
  time += dt*1e-3;
  //document.getElementById("timer").innerHTML = "t = "+time.toPrecision(3)+" s";

  var cnv = document.getElementById('wave2');
  var ctx = cnv.getContext('2d');
  ctx.clearRect(0,0,cnv.width,cnv.height);
  drawaxes2();
  ctx.beginPath();
  
  var dx = 0.01;
  var len = Math.round((cnv.width/2)/dx);
  ctx.strokeStyle = 'green';
  ctx.lineWidth = 3;
  for(var i = -len+1; i <= len-1; i++){
    var x = dx*i;
    var y = scale*(amplitude2*Math.sin(Math.sign(phase2)*Math.abs(phase2)+omega2*time-k2*(x/scale)));
    if(i == -len+1) ctx.moveTo(cnv.width/2+x,cnv.height/2-y);
    else ctx.lineTo(cnv.width/2+x,cnv.height/2-y);
  }
  ctx.stroke();
  
  ctx.strokeStyle = 'red';
  ctx.fillStyle = 'red';
  ctx.beginPath();
  ctx.moveTo(cnv.width/2,cnv.height/2);
  var where = scale*(amplitude2*Math.sin(Math.sign(phase2)*Math.abs(phase2)+omega2*time));
  ctx.lineTo(cnv.width/2,cnv.height/2-where);
  ctx.fillRect(cnv.width/2-3,cnv.height/2-where,6,6);
  ctx.stroke();
  
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.strokeText("y="+where.toPrecision(2)+"px",450,260);
  
  time -= dt*1e-3;
  drawsum();
}

function drawsum(){
  time += dt*1e-3;
  document.getElementById("timer").innerHTML = "t = "+time.toPrecision(3)+" s";

  var cnv = document.getElementById('sum');
  var ctx = cnv.getContext('2d');
  ctx.clearRect(0,0,cnv.width,cnv.height);
  drawaxes3();
  ctx.beginPath();
  
  var dx = 0.01;
  var len = Math.round((cnv.width/2)/dx);
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 3;
  for(var i = -len+1; i <= len-1; i++){
    var x = dx*i;
    var y1 = scale*(amplitude1*Math.sin(Math.sign(phase1)*Math.abs(phase1)+omega1*time-k1*(x/scale)));
    var y2 = scale*(amplitude2*Math.sin(Math.sign(phase2)*Math.abs(phase2)+omega2*time-k2*(x/scale)));
    var y = y1+y2;
    if(i == -len+1) ctx.moveTo(cnv.width/2+x,cnv.height/2-y);
    else ctx.lineTo(cnv.width/2+x,cnv.height/2-y);
  }
  ctx.stroke();
  
  ctx.strokeStyle = 'red';
  ctx.fillStyle = 'red';
  ctx.beginPath();
  ctx.moveTo(cnv.width/2,cnv.height/2);
  var where1 = scale*(amplitude1*Math.sin(Math.sign(phase1)*Math.abs(phase1)+omega1*time));
  var where2 = scale*(amplitude2*Math.sin(Math.sign(phase2)*Math.abs(phase2)+omega2*time));
  var where = where1+where2;
  ctx.lineTo(cnv.width/2,cnv.height/2-where);
  ctx.fillRect(cnv.width/2-3,cnv.height/2-where,6,6);
  ctx.stroke();
  
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.strokeText("y="+where.toPrecision(2)+"px",450,260);
}

var actx1,actx2;
var osc1,osc2;
var on1 = 0,on2 = 0;

function playfr1(){
  if(on1 == 1) stopfr1();
  on1 = 1;
  actx1 = new (window.AudioContext || window.webkitAudioContext)();
  osc1 = actx1.createOscillator();
  osc1.type = 'sine';
  osc1.frequency.setValueAtTime(fr1, actx1.currentTime);
  osc1.connect(actx1.destination);
  osc1.start();
}

function stopfr1(){
  on1 = 0;
  osc1.stop();
}

function playfr2(){
  if(on2 == 1) stopfr2();
  on2 = 1;
  actx2 = new (window.AudioContext || window.webkitAudioContext)();
  osc2 = actx2.createOscillator();
  osc2.type = 'sine';
  osc2.frequency.setValueAtTime(fr2, actx2.currentTime);
  osc2.connect(actx2.destination);
  osc2.start();
}

function stopfr2(){
  on2 = 0;
  osc2.stop();
}

function updatefr(){
  var f1 = document.getElementById("fr1").value;
  var f2 = document.getElementById("fr2").value;
  if(f1 < 10 || f1 > 1000){
  	document.getElementById("fr1").value = 440;
  }
  if(f2 < 10 || f2 > 1000){
  	document.getElementById("fr2").value = 441;
  }
  fr1 = f1;
  fr2 = f2;
  if(on1 == 1){
    stopfr1();
    playfr1();
  }
  if(on2 == 1){
    stopfr2();
    playfr2();
  }
}
