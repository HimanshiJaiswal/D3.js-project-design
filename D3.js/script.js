
$(document).ready(function(){
  $("#myInput").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $(".dropdown-menu li").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
});




// set the dimensions and margins of the graph
var margin = {top: 30, right: 30, bottom: 70, left: 60},
    width = 200 - margin.left - margin.right,
    height = 200 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Parse the Data
d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/7_OneCatOneNum_header.csv", function(data) {

// X axis
var x = d3.scaleBand()
  .range([ 0, width ])
  .domain(data.map(function(d) { return d.Country; }))
  .padding(0.2);
svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x))
  .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

// Add Y axis
var y = d3.scaleLinear()
  .domain([0, 13000])
  .range([ height, 0]);
svg.append("g")
  .call(d3.axisLeft(y));

// Bars
svg.selectAll("mybar")
  .data(data)
  .enter()
  .append("rect")
    .attr("x", function(d) { return x(d.Country); })
    .attr("y", function(d) { return y(d.Value); })
    .attr("width", x.bandwidth())
    .attr("height", function(d) { return height - y(d.Value); })
    .attr("fill", "#69b3a2")

})
//line chart

var dataset1 = [
  [1, 1],
  [12, 20],
  [24, 36],
  [32, 50],
  [40, 70],
  [50, 100],
  [55, 106],
  [65, 123],
  [73, 130],
  [78, 134],
  [83, 136],
  [89, 138],
  [100, 140],
];

// Step 3
var svg = d3.select("svg"),
  margin = 200,
  width = svg.attr("width") - margin, //300
  height = svg.attr("height") - margin; //200

// Step 4
var xScale = d3.scaleLinear().domain([0, 100]).range([0, width]),
  yScale = d3.scaleLinear().domain([0, 200]).range([height, 0]);

var g = svg
  .append("g")
  .attr("transform", "translate(" + 100 + "," + 100 + ")");

// Step 5
// Title
svg
  .append("text")
  .attr("x", width / 2 + 100)
  .attr("y", 100)
  .attr("text-anchor", "middle")
  .style("font-family", "Helvetica")
  .style("font-size", 20)
  .text("Line Chart");

// X label
svg
  .append("text")
  .attr("x", width / 2 + 100)
  .attr("y", height - 15 + 150)
  .attr("text-anchor", "middle")
  .style("font-family", "Helvetica")
  .style("font-size", 12)
  .text("Independant");

// Y label
svg
  .append("text")
  .attr("text-anchor", "middle")
  .attr("transform", "translate(60," + height + ")rotate(-90)")
  .style("font-family", "Helvetica")
  .style("font-size", 12)
  .text("Dependant");

// Step 6
g.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(xScale));

g.append("g").call(d3.axisLeft(yScale));

// Step 7
svg
  .append("g")
  .selectAll("dot")
  .data(dataset1)
  .enter()
  .append("circle")
  .attr("cx", function (d) {
    return xScale(d[0]);
  })
  .attr("cy", function (d) {
    return yScale(d[1]);
  })
  .attr("r", 3)
  .attr("transform", "translate(" + 100 + "," + 100 + ")")
  .style("fill", "#CC0000");

// Step 8
var line = d3
  .line()
  .x(function (d) {
    return xScale(d[0]);
  })
  .y(function (d) {
    return yScale(d[1]);
  })
  .curve(d3.curveMonotoneX);

svg
  .append("path")
  .datum(dataset1)
  .attr("class", "line")
  .attr("transform", "translate(" + 100 + "," + 100 + ")")
  .attr("d", line)
  .style("fill", "none")
  .style("stroke", "#CC0000")
  .style("stroke-width", "2");

