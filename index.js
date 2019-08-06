var w = 600;
var h = 800;

var margin = {
  top: 20,
  bottom: 20,
  left: 20,
  right: 20
}

var width = w - margin.left - margin.right
var height = h - margin.top - margin.bottom

var data = [23, 67, 34, 56, 89, 100, 234, 134, 97];

d3.dsv(';', 'kap.csv', function (d) {
  return d;
}).then(function (csv) {
  console.log(csv);
});

var w = 600;
var h = 800;





var x = d3.scaleLinear()
  .domain([0, d3.max(data)])
  .range([0, width]);

var y = d3.scaleLinear()
  .domain([0, data.length])
  .range([0, height]);

var svg = d3.select("body").append("svg")
  .attr("id", "svg")
  .attr("width", w)
  .attr("height", h);

var chart = svg.append('g')
chart.selectAll(".bar")
  .data(data)
  .enter()
  .append("rect")
  .classed('bar', true)
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
  .attr("x", 0)
  .attr("y", function (d, i) {
    return y(i);
  })
  .attr("width", function (d, i) {
    return x(d);
  })
  .attr("height", function (d, i) {
    return y(1) - 1
  });