var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var numSides = 25;
var center = [0,0]
var averageTime = 0;
var radius = 250;
var distancesFromCenter = declareDistancesFromCenter();
var move = false;
//var sidesChanging = setInterval(sideChange,50);

function sideChange(){
  numSides = (numSides++ == 75)? 3: numSides;
  distancesFromCenter = declareDistancesFromCenter();
  onClick({clientX:center[0], clientY:center[1]});
}

function declareDistancesFromCenter(){
  var angle = 0-(Math.PI*2/numSides);
  var temp = [];
  for(i = 0; i < numSides; i ++)
      temp.push([radius*Math.cos(angle*i-(Math.PI/2)), radius*Math.sin(angle*i-(Math.PI/2))]);
    return temp;
}

function onClick(e){
  move = !move;
}

function onDrag(e){
  if(move){
    console.time('drag');
    drag(e.clientX, e.clientY);
    console.timeEnd('drag');
  }
}

function drag(x, y){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  center[0] = x;
  center[1] = y;
  var verticies = [];
  for(i = 0; i < distancesFromCenter.length; i++)
    verticies.push([center[0]+distancesFromCenter[i][0], center[1]+distancesFromCenter[i][1]]);
  drawPolygon(verticies);
  connectPoints(verticies);
}

function drawPolygon(points){
  ctx.beginPath();
  ctx.moveTo(points[0][0], points[0][1]);
  for(i = 1; i < points.length; i++){
    ctx.lineTo(points[i][0], points[i][1]);
  }
  ctx.lineTo(points[0][0],points[0][1]);
  ctx.stroke();
}

function connectPoints(points){
  for(i = 0; i < points.length; i++){
    for(k = i + 1; k < points.length; k++){
      ctx.beginPath();
      ctx.moveTo(points[i][0], points[i][1]);
      ctx.lineTo(points[k][0], points[k][1]);
      ctx.stroke();
    }
  }
}
