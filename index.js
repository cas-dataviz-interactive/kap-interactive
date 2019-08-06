var w = 1200;
var h = 1000;

var margin = {
  top: 100,
  bottom: 20,
  left: 100,
  right: 20
}

var width = w - margin.left - margin.right;
var height = h - margin.top - margin.bottom;

var parseDate = d3.timeParse("%Y-%m-%d");
var startDate = parseDate("2019-04-01");
var endDate = parseDate("2019-08-01");

var data = [];
var dates = [];
var stations = [];

var x = d3.scaleTime();
var y = d3.scalePoint();
var r = d3.scaleLinear();

d3.dsv(',', 'kap.csv', function (d) {
  return {
    date: parseDate(d.Datum),
    name: d['Name Haltestelle'],
    kap: +d['Kundengewichtete Ankunftspünktlichkeit'],
    kapFern: +d['Kundengewichtete Ankunftspünktlichkeit Fernverkehr'],
    kapReg: +d['Kundengewichtete Ankunftspünktlichkeit Regionalverkehr'],
    kepAn: +d['Kundengewichtete Anschlüsse'],
    key: d['key']
  }
}).then(function (csv) {

  data = csv.filter(function (d) {
    return d.date > startDate && d.date < endDate;
  });

  console.log(data);

  dates = d3.set(data, function (d) {
    return d.date;
  }).values();

  console.log(dates);

  stations = d3.set(data, function (d) {
    return d.name;
  }).values();

  console.log(stations);

  var dateExtent = d3.extent(data, function (d) {
    return d.date;
  });

  console.log('dateExtent', dateExtent);
  x.domain(dateExtent)
    .range([0, width]);

  y.domain(stations)
    .range([0, height]);

  r.domain([0, 100])
    .range([5, 0.1]);

  var svg = d3.select("#chart").append("svg")
    .attr("id", "svg")
    .attr("width", w)
    .attr("height", h);

  var chart = svg.append('g').attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  chart.selectAll("circle")
    .data(data)
    .join("circle")
    .attr("cx", function (d) {
      return x(d.date);
    })
    .attr("cy", function (d, i) {
      return y(d.name);
    })
    .attr("r", function (d, i) {
      return r(d.kap);
    })
    .style('fill', function (d) {
      // if(d.kap == 100){
      //   return 'green';
      // }
      // else if(d.kap < 80){
      //   return 'red';
      // }
      // else return 'none';
      return 'black';
    })
    .style('stroke', 'black');

  chart.append('g').call(d3.axisLeft(y));
  chart.append('g')
    .call(d3.axisTop(x).ticks(d3.timeDay.every(7)))
    .selectAll("text")
    .attr("y", 0)
    .attr("x", 9)
    //.attr("dy", ".35em")
    .attr("transform", "rotate(-45)")
    .style("text-anchor", "start");;

});




