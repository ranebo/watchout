// stick in the shuriken
//d3.select('body').append('<img src="shuriken.png" height="20px" width="20px">');

// high score variables
var score = 0;
var scoreNode = d3.select(".current").select('span');
var highScore = 0;
var highScoreNode = d3.select('.highscore').select('span');
var collisionCount = 0;
var collisionNode = d3.select('.collisions').select('span');


var updateCurrentScore = function() {
  score++;
  if (score > highScore) {
    highScore = score;
    highScoreNode.text(highScore);
  }
  scoreNode.text(score);
};
// how many seconds have you survived without a collision?
//    --- maybe refactor to start this setInterval when the mouse is clicked
setInterval(updateCurrentScore, 1000);


// populate data
var dataSize = 30;
// not optimal to hard-code, but getting value on-the-fly would require
// sending that as a parameter to populateData and grabbing it within move
var padding = 50; 
var w = d3.select('svg').attr('width');
var h = d3.select('svg').attr('height');

var populateData = function() {
  var newDataSet = [];
  for (var i = 0; i < dataSize; i++) {
    var x = Math.floor(Math.random() * (w - 2 * padding) + padding);
    var y = Math.floor(Math.random() * (h - 2 * padding) + padding);
    newDataSet.push([x, y]);

  }
  return newDataSet;
};

d3.select('svg').selectAll('image')
  .data([100])
  .enter()
  .append('image')
  .classed('shuriken', true)
  .attr('xlink:href', 'shuriken.svg')
  .attr('x', Math.floor(Math.random() * (w - 2 * padding) + padding))
  .attr('y', Math.floor(Math.random() * (h - 2 * padding) + padding))
  ;


// populates new circle nodes
d3.select('svg').selectAll('circle')
  .data(populateData())
  .enter()
  .append('circle')
  .classed('circle', true)
  .attr('cx', function(d) { return d[0]; })
  .attr('cy', function(d) { return d[1]; })
  ;


// position the mouse and make it draggable
var mouse = d3.select('.mouse');
mouse.attr('x', w / 2).attr('y', h / 2);
var drag = d3.behavior.drag();
drag.on('drag', function() {
  // bounds check - if player drags mouse out of board, reset position
  if (d3.event.x < 0) {
    d3.event.x = 0;
  } 
  if (d3.event.x > w - 10) {
    d3.event.x = w - 10;
  } 
  if (d3.event.y < 0) {
    d3.event.y = 0;
  }  
  if (d3.event.y > h - 10) {
    d3.event.y = h - 10;
  }
  mouse.attr('x', d3.event.x);
  mouse.attr('y', d3.event.y);
});
mouse.call(drag);



// move animates our enemies (calls itself in .each)
var move = function() {
  var dataSet = populateData();
  d3.select('svg').selectAll('circle')
  .data(dataSet)
  .transition()
  .duration(3000)
  .attr('cx', function(d) {
    return d[0];
  })
  .attr('cy', function(d) {
    return d[1];
  })
  .each('end', move);
};

move();


// collision detection with helper calculateDistance
var calculateDistance = function(mouseX, mouseY, nodeX, nodeY) {
  return Math.sqrt((mouseX - nodeX) * (mouseX - nodeX) + (mouseY - nodeY) * (mouseY - nodeY));
};

var checkCollision = function(enemy) {
  var enemies = d3.selectAll('circle').each(collisionWithNode);
};

// we don't want to update collisionCount for maybe 0.3 seconds after one collision
var checkCollisionCount = 0;
var collisionsAllowed = true;

var collisionWithNode = function() {
  var x = +mouse.attr('x');
  var y = +mouse.attr('y');
  var nodeX = this.cx.animVal.value;
  var nodeY = this.cy.animVal.value;
  var distance = calculateDistance(x, y, nodeX, nodeY);

  // if there was a collision in the last 300ms (3 * the 100 in setInterval),
  // don't allow collision count to update
  // if (!collisionsAllowed) {
  //   checkCollisionCount++;
  // }
  // if (checkCollisionCount >= 10) {
  //   checkCollisionCount = 0;
  //   collisionsAllowed = true;
  // }

  // if collision then update score
  if (distance < 20) {// && collisionsAllowed) {
    
    collisionCount++;
    collisionNode.text(collisionCount);
    score = 0;

    // collisionsAllowed = false;
  }

};
// initial call, then setInterval keeps it going
checkCollision();
setInterval(checkCollision, 400);
