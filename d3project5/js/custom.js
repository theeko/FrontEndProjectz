var worldurl =  "https://raw.githubusercontent.com/mbostock/topojson/master/examples/world-50m.json";
var meteorurl = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/meteorite-strike-data.json";
var width = 960, height= 480, worlddata, meteordata;

var tooltip = d3.select(".app").append("div")
                  .style("position", "absolute")
                  .style("z-index", "10")
                  .style("opacity", 0)
                  .attr("class", "tooltip");

var svg = d3.select(".app")
            .append("svg")
            .attr("width", width)
            .attr("height", height);



  d3.json(worldurl, function(err, world){
    if(err){ throw err }

    var projection = d3.geo.mercator().scale(160).translate([width / 2, height / 2]);
    var path = d3.geo.path()
              .projection(projection);
              svg.append("path")
              .datum(topojson.feature(world,world.objects.land))
              .attr("d", path);

    d3.json(meteorurl, function(err, meteor) {
       if(err){ throw err }

      svg.selectAll(".areacircles")
      .data(meteor.features)
      .enter().append("circle")
      .style("stroke", "#CF000F")
      .style("stroke-width", 2)
      .style("fill", "rgba(0,0,0,0.3)")
      .attr("r", function(d) {
        var mass = Math.floor(+d.properties.mass / 50000);
        var left = mass - 40;
        return (left <= 0 ? (mass || 0) + 3 : 40 + Math.round(left/60));
      })
      .attr("transform", function(d) {
        return "translate(" + projection([
          d.properties.reclong,
          d.properties.reclat
        ]) + ")";
      })
      .on("mouseover", function () {
                return tooltip.style("opacity", 0.8)
              })
      .on("mousemove", function(d){
        tooltip.style("opacity", 0.8);
        tooltip.html(
            "mass: " + d.properties.mass + "<br/>name: " + d.properties.name
            + "<br/>recclass: " + d.properties.recclass
            + "<br/>reclat: " + d.properties.reclat + "<br/>year: " + d.properties.year.substr(0,4)
          )
        tooltip.style("top", (d3.event.pageY-40) +"px").style("left", (d3.event.pageX+30) + "px")
      })
      .on("mouseout", function (argument) {
        return tooltip.style("opacity", 0);
      });

    });

  });





