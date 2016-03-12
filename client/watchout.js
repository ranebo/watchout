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
var collisionCheck = function() {
  var enemies = d3.selectAll('circle').each(collisionWithNode);
};

var collisionWithNode = function() {
  var x = mouse.attr('x');
  var y = mouse.attr('y');
  console.log('this.cx', this.cx.animVal.value);
  if (this.cx === x ){//|| this.attr('cy') === y) {
    console.log("COLLISION!!");
  }
};
// initial call
collisionCheck();
//setInterval(collisionCheck, 100);



/*
setInterval( function() {
  d3.select('svg').selectAll('circle')
    .data([[100, 200], [300, 200]])
    .enter()
    .append('circle')
    .classed('circle', true)
    .attr('cx', function(d) {
      return d[0] + count * 40; // + Math.floor(Math.random() * 10 - 5)
    })
    .attr('cy', function(d) {
      return d[1] + count * 40; // + Math.floor(Math.random() * 10 - 5);
    })
    ;
  count++;
}, 1000);
*/