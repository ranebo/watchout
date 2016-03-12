// initially place?
//var dataset = [[100, 200], [300, 200]];
// Do we have to reference the same dataset to 'remember' the old set?
// It just doesn't make sense to me in the context of this BEING DATA
// that you would ever want to throw away all your 'visualized data'
// after 1 second and pull up a whole new set of visualized data, over and over
var dataSize = 30;

// not optimal to hard-code, but getting value on-the-fly would require
// sending that as a parameter to populateData and grabbing it within move
var padding = 50; 
var w = d3.select('svg').attr('width');
var h = d3.select('svg').attr('height');

var populateData = function() {
  var newDataSet = [];
  for (var i = 0; i < dataSize; i++) {
    // newDataSet[i][0] = Math.floor(Math.random() * w);//(h - 40) + 20);
    // newDataSet[i][1] = Math.floor(Math.random() * h);//(w - 40) + 20);
    var x = Math.floor(Math.random() * (w - 2 * padding) + padding);//(h - 40) + 20);
    var y = Math.floor(Math.random() * (h - 2 * padding) + padding);//(w - 40) + 20);
    newDataSet.push([x, y]);

  }
  return newDataSet;
};



// put a static circle in

// position the mouse and make it draggable
var mouse = d3.select('.mouse');
mouse.attr('x', w / 2).attr('y', h / 2);
var drag = d3.behavior.drag();
drag.on('drag', function() {
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







d3.select('svg').selectAll('circle')
  .data(populateData())
  .enter()
  .append('circle')
  .classed('circle', true)
  .attr('cx', function(d) { return d[0]; })
  .attr('cy', function(d) { return d[1]; })
  ;





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




// collision detection
// at the end setInterval with recursive call
var calculateDistance = function(mouseX, mouseY, nodeX, nodeY) {
  //return mouseX - nodeX;
  return Math.sqrt((mouseX - nodeX) * (mouseX - nodeX) + (mouseY - nodeY) * (mouseY - nodeY));
};


var checkCollision = function(enemy) {
  var enemies = d3.selectAll('circle').each(collisionWithNode);
};

var collisionWithNode = function() {
  var x = +mouse.attr('x');
  var y = +mouse.attr('y');
  var nodeX = this.cx.animVal.value;
  var nodeY = this.cy.animVal.value;
  //var nodeX = parseFloat(this.attr('cx'));
  //var nodeY = parseFloat(this.attr('cy'));
  // console.log('typeof mouse and enemy', typeof x, typeof nodeX);
  // console.log(x, y)
  var distance = calculateDistance(x, y, nodeX, nodeY);
 // console.log('distance',distance);
  if (distance < 20) {
    console.log('collision');
  }

  // if (x <= 440 && y <= 440) {
  // // if ( (nodeX >= x && nodeX <= x + 10)
  // //   && (nodeY >= y && nodeY <= y + 10)
  // //   ) {

  //   console.log('collision');
  //   console.log("mouse x and y", x, y);
  //   console.log("enemy x and y", nodeX, nodeY);
  // }
};
// initial call
checkCollision();
setInterval(checkCollision, 100);




// var enemies = d3.selectAll('circle');
// for (var i = 0; i < enemies[0].length; i++) {
//   //console.log('enemies[0][i] is', enemies[0][i]);
// }
// //console.log('enemies is', enemies);

// var checkCollision = function(mouse) {
//   return enemies[0].forEach(function(enemy) {
//     var x = mouse.attr('x');
//     var y = mouse.attr('y');
//     var nodeX = enemy;//.cy.animVal.value;
//     //var nodeX = parseFloat(enemy.attr('cx'));
//     //var nodeY = parseFloat(enemy.attr('cy'));
   
//     if ( (nodeX >= x && nodeX <= x + 10)
//       && (nodeY >= y && nodeY <= y + 10)
//       ) {
//       //console.log('collision');
//     }
//   });
// };

// checkCollision(mouse);

