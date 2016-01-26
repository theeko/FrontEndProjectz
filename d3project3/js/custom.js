var dataurl = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/global-temperature.json";

var months = ["January", "February", "March", "April", "May", "June", "July", 
             "August", "September", "October", "November", "December"];
var colors = ["#5e4fa2", "#3288bd", "#66c2a5", "#abdda4", "#e6f598", "#ffffbf", 
                "#fee08b", "#fdae61", "#f46d43", "#d53e4f", "#9e0142"];

d3.json(dataurl, function(error, data) {
    if(error){ throw error }
    vizualization(data);
});

function vizualization(data){
  var margin = { top: 10, right: 120, bottom: 80, left: 80 };
  var width = 1160 - margin.left - margin.right, height = 700 - margin.top - margin.bottom;
  
  var baseTemperature = data.baseTemperature;
  var monthzData = data.monthlyVariance;
  var yearz = monthzData.map(function(elem){
    return elem.year;
  });
  yearz = yearz.filter(function(elem,index){
    return yearz.indexOf(elem) == index;
  });
  var variances = monthzData.map(function(elem){
    return elem.variance;
  });
  
  var mins = {
    variance: d3.min(variances),
    year: d3.min(yearz)
  }
  var maxs = { 
        variance: d3.max(variances),
        year: d3.max(yearz)
      };

  var minDate = new Date(mins.year, 0);
  var maxDate = new Date(maxs.year, 0);
  
  
  var tooltip = d3.select(".app").append("div")
                .style("position", "absolute")
                .style("z-index", "10")
                .style("opacity", "0")
                .attr("class", "tooltip");
  
  var svg = d3.select(".app").append("svg")
            .attr("width", width + margin.left + margin.right )
            .attr("height", height + margin.bottom + margin.top )
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
  var colorScale = d3.scale.quantile()
      .domain([mins.variance+baseTemperature, maxs.variance + baseTemperature])
      .range(colors);
      
  var xScale = d3.time.scale()
    .domain([minDate, maxDate])
    .range([0, width]);

  var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom")
    .ticks(d3.time.years, 10);
              
  svg.selectAll(".datarects")
              .data(monthzData, function(d) { return (d.year + ':' + d.month)})
              .enter()
              .append("rect")
              .attr("x", function(d,i){
                return (d.year - mins.year) * width/yearz.length;
              })
              .attr("y",function(d){
                return (d.month - 1) * height/months.length;
              })
              .attr("width", width/yearz.length)
              .attr("height", height/(months.length+1))
              .on("mouseover", function () {
                return tooltip.style("opacity", 0.9);
              })
              .on("mousemove", function(d){
                tooltip.html( d.year + "-" + months[d.month-1] +"<br/>" 
                  +(Math.floor((d.variance + baseTemperature) * 1000) / 1000) +"&deg;C<br/>" + d.variance+"&deg;C");
                tooltip.style("top", (d3.event.pageY-40) +"px").style("left", (d3.event.pageX+20) + "px");
              })
              .on("mouseout", function () {
                return tooltip.style("opacity", 0);
              })
              .transition().duration(1000)
              .style("fill", function(d) {
                return colorScale(d.variance + baseTemperature);
              });
    
var monthLabel = svg.selectAll(".monthLabel")
                .data(months)
                .enter().append("text")
                .attr("class", ".monthLabel")
                .text(function(d) { return d;})
                .attr("class", "monthLabel yaxis")
                .attr("x", 0)
                .attr("y", function(d, i) { return i * (height/months.length); })
                .attr("transform", "translate(-6," + height/months.length / 1.5 + ")")
                .style("text-anchor", "end");
      
  svg.append("g")
     .attr("class", "axis")
     .attr("transform", "translate(0," + height + ")")
     .call(xAxis)
     .attr("class", "xaxis");
     
  svg.append("text")
    .attr("x", width /2 -30)
    .attr("y", height + 45)
    .attr("class", "yearlabel")
    .text("Years");
    
  var colordivz = svg.selectAll(".colordivz")
    .data([0].concat(colorScale.quantiles()), function(d) {
      return d;
    })
    .enter()
    .append("g");
    
  colordivz.append("rect")
    .attr("x", function(d,i){ return width /2 +100 + i*30})
    .attr("y", height + 30)
    .attr("width", "30px")
    .attr("height", "30px")
    .style("fill", function(d,i) { return colors[i]});
    
  colordivz.append("text")
    .text(function(d) {
      return (Math.floor(d * 10) / 10);
    })
    .attr("x", function(d,i){ return width /2 + 105 + i*30})
    .attr("y", height + 80);
    
  
  // svg.append("text")
  //   .attr("x", width - 360)
  //   .attr("y", height + 45)
  //   .attr("transform", "rotate(90)")
  //   .text("Months");
      
}