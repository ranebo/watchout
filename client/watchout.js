// start slingin' some d3 here.


/*
var h = d3.select('svg').attr('height');
var w = d3.select('svg').attr('width');
//d3.select('svg').attr('fill', 'grey');

// create data()
// Do we have to reference the same dataset to 'remember' the old set?
// It just doesn't make sense to me in the context of this BEING DATA
// that you would ever want to throw away all your 'visualized data'
// after 1 second and pull up a whole new set of visualized data, over and over
var dataSize = 30;
var dataset = [];
for (var i = 0; i < dataSize; i++) {
  dataset.push([]);
}
var transformData = function(dataset) {
  for (var i = 0; i < dataSize; i++) {
    dataset[i][0] = Math.floor(Math.random() * (h - 40) + 20);
    dataset[i][1] = Math.floor(Math.random() * (w - 40) + 20);
  }
};
transformData(dataset);

// Problem: circles don't appear for 1 second
setInterval( function() {
  //transformData(dataset);
  // D3 stuff
  d3.select('svg').selectAll('circle')
    .data(dataset)    
    .enter()
    .append('circle')
    .classed('circle', true)
    .attr('cx', function(d) {
      return d[0] + Math.floor(Math.random() * 10 - 5);
    })
    .attr('cy', function(d) {
      return d[1] + Math.floor(Math.random() * 10 - 5);
    })
    .transition()
    .duration(1000)
    //.attr('cx')
    ;
}, 1000 );

*/

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
//initial setting?

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
  .duration(2000)
  .attr('cx', function(d) {
    return d[0];
  })
  .attr('cy', function(d) {
    return d[1];
  })
  .each('end', move);
};

move();

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