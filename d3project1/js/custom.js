var dataurl = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json";
var dataSet;


var request = new XMLHttpRequest();
request.open("GET", dataurl, true);
request.onload = function(){
  if( request.status >= 200 && request.status <= 400 ){
    var dataSet = JSON.parse(request.responseText).data;
    var x = [];
    dataSet.forEach(function(a){
        x.push(a);
    });
    vizualize(dataSet);
  } else {
    console.log("Something went wrong");
  }
};

request.onerror = function(){
  console.log("error");
}

request.send();


function vizualize(data){
  var margin = {
        top: 5,
        right: 10,
        bottom: 30,
        left: 75
      },
      width = 1000 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    var barWidth = Math.ceil(width / data.length);
    
    var tooltip = d3.select(".app")
    .append("div")
    .style("position", "absolute")
    .style("z-index", "10")
    .style("visibility", "hidden")
    .text("a simple tooltip");
    
    minDate = new Date(data[0][0]);
    maxDate = new Date(data[274][0]);
    
    var x = d3.time.scale()
      .domain([minDate, maxDate])
      .range([0, width]);

    var y = d3.scale.linear()
      .range([height, 0])
      .domain([0, d3.max(data, function(d) {
        return d[1];
      })]);
      
      var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom")
      .ticks(d3.time.years, 5);

    var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left")
      .ticks(50);
      
    var app = d3.select(".app")
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
      
    app.selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", function(d,i) {
        return i * (width / data.length);
      })
      .attr("width", width/data.length + 1)
      .attr("y", function(d) {
        return y(d[1]);
      })
      .attr("height", function(d) {
        return height - y(d[1]);
      })
      .on("mouseover", function(){return tooltip.style("visibility", "visible");})
      .on("mousemove", function(d){
          tooltip.html(new Date(d[0]).toDateString() +'<br/>' +'USD: '+d[1] );
          tooltip.style("top",
          (d3.event.pageY-20)+"px").style("left",(d3.event.pageX-120)+"px");})
      .on("mouseout", function(){return tooltip.style("visibility", "hidden");});
    
    app.append("g")
    .attr("class", "yaxis")
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", "1em")
    .style("text-anchor", "end")
    .text("Gross Domestic Product, United States");
      
    app.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);
      
}

