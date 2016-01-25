var dataurl = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json";
var dataSet;


var request = new XMLHttpRequest();
request.open("GET", dataurl);

request.onload = function(){
  if(request.status >= 200 && request.status <= 400 ){
    var dataSet = JSON.parse(request.responseText);
    vizualization(dataSet);
  } else {
    console.log(request.error);
  }
};

request.onerror = function(){
  console.log(request.error);
};

request.send();

function vizualization(data){
  
  var margin = { top: 80, right: 140, bottom: 60, left: 60 };
  var width = 800 - margin.left - margin.right, height = 600 - margin.top - margin.bottom;
  
  var tooltip = d3.select(".app").append("div")
                .style("position", "absolute")
                .style("z-index", "10")
                .style("visibility", "hidden")
                .text("a simple tooltip");
  
  var svg = d3.select(".app").append("svg")
            .attr("width", width + margin.left + margin.right )
            .attr("height", height + margin.bottom + margin.top )
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
  var xScale = d3.scale.linear()
      .domain([d3.max(data,function(d){ return d.Seconds; }),d3.min(data,function(d){return d.Seconds}) ])
      .range([0, width]);
      
  var yScale = d3.scale.linear()
      .domain([1,36])
      .range([0,height]);
  
  var xAxis = d3.svg.axis()
              .scale(xScale)
              .orient("bottom");
              
  var yAxis = d3.svg.axis()
              .scale(yScale)
              .orient("left");
              
  svg.selectAll("circle")
              .data(data)
              .enter()
              .append("circle")
              .attr("class", "circle")
              .attr("cx", function(d){
                return xScale(d.Seconds) +10
              })
              .attr("cy",function(d){
                return yScale(d.Place) 
              })
              .attr("r", 6)
              .attr("fill", function(d) {
                if (d.Doping == "") {
                  return "#333";
                }
                return "#f44";
              })
              .on("mouseover", function () {
                return tooltip.style("visibility", "visible")
              })
              .on("mousemove", function(d){
                tooltip.html(d.Doping ? d.Name + ":" + d.Nationality + "<br/>Year: " + d.Year + "Time: " + d.Time + "<br/>" + "Doping: " + d.Doping
                            : d.Name + ":" + d.Nationality + "<br/>Year: " + d.Year + "Time: " + d.Time )
                tooltip.style("top", (d3.event.pageY-40) +"px").style("left", (d3.event.pageX+20) + "px")
              })
              .on("mouseout", function (argument) {
                return tooltip.style("visibility", "hidden");
              });

  svg.append("g")
     .attr("class", "axis")
      .call(yAxis)
      .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Place");;
      
  svg.append("g")
     .attr("class", "axis")
     .attr("transform", "translate(0," + height + ")")
     .call(xAxis)
     .append("text")
      .attr("class", "label")
      .attr("x", width )
      .attr("y", -6)
      .style("text-anchor", "end")
      .text("Seconds");
     
  svg.append("circle")
    .attr("class", "circle")
    .attr("cx", width - 140)
    .attr("cy", height + 40)
    .attr("r", 6)
    .attr("fill", "#333")
  
  svg.append("text")
    .attr("x", width - 120)
    .attr("y", height + 45)
    .attr("class", "legend")
    .text("No doping allegations");
    
  svg.append("circle")
    .attr("class", "circle")
    .attr("cx", width - 380)
    .attr("cy", height + 40)
    .attr("r", 6)
    .attr("fill", "#f44")
  
  svg.append("text")
    .attr("x", width - 360)
    .attr("y", height + 45)
    .attr("class", "legend")
    .text("Riders with doping allegations");
    
      
}