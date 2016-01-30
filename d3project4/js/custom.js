var config = {
  dataUrl: "http://www.freecodecamp.com/news/hot"
}
var width= 750, height= 600;
var dataChamper = [];
var nodes = {};
var links = [];
       
function vizualization(){
   var colorScale = d3.scale.category20();
  
  var force = d3.layout.force()
    .nodes(d3.values(nodes))
    .links(links)
    .size([width, height])
    .gravity(0.2)
    .linkDistance(50)
    .charge(function(d) {
      return -((d.weight * 3) + 150);
    })
    .on("tick", tick)
    .start();

    var svg = d3.select(".app").append("svg")
    .attr("width", width)
    .attr("height", height);
    
    var tooltip = d3.select(".app").append("div")
      .style("position", "absolute")
      .style("z-index", "10")
      .style("opacity", "0")
      .attr("class", "tooltip");
    
    var link = svg.selectAll(".link")
    .data(force.links())
    .enter().append("line")
    .style("stroke-width", 3)
    .style("stroke", "#333");
    
    var node = svg.selectAll(".node")
    .data(force.nodes())
    .enter().append("g")
    .attr("class", "node")
    .call(force.drag)
    .on("mouseover", function () {
      return tooltip.style("opacity", 0.9);
    })
    .on("mousemove", function(d){
      tooltip.html(d.name);
      tooltip.style("top", (d3.event.pageY-40) +"px").style("left", (d3.event.pageX+20) + "px");
    })
    .on("mouseout", function () {
      return tooltip.style("opacity", 0);
    });
    
    node.append("circle")
    .attr("r", function(d) {
      return ((d.weight * 1.6) + 5);
    })
    .style("fill", function(d) {
      if (d.rank !== undefined) {
        return colorScale(d3.max(d.rank));
      } else {
        return d3.rgb("154");
      }
    });
    
    node.append("image")
    .attr("xlink:href", function(d) {
      return d.image;
    })
    .attr("x", -16)
    .attr("y", -16)
    .attr("width", 32)
    .attr("height", 32);
    
    function tick() {
      link
        .attr("x1", function(d) {
          return d.source.x;
        })
        .attr("y1", function(d) {
          return d.source.y;
        })
        .attr("x2", function(d) {
          return d.target.x;
        })
        .attr("y2", function(d) {
          return d.target.y;
        });
  
      node
        .attr("transform", function(d) {
          return "translate(" + d.x + "," + d.y + ")";
        });
    }
}

function getHost(url){ 
  var hName;
  url.indexOf("://") != -1 ? hName = url.split('/')[2] : hName = url.split('/')[0]
  return hName;
}

function getData(){
  d3.json(config.dataUrl, function(error, found) {
  if (error) throw error;

  found.forEach(function(d) {
    var udata = {
      image: d.image,
      url: d.link,
      userPic: d.author.picture,
      userName: d.author.username,
      rank: d.rank,
      hostName: getHost(d.link)
    };

    dataChamper.push(udata);

    var link = {
      "source": udata.userName,
      "target": udata.hostName,
      "image": udata.userPic,
      "rank": udata.rank
    };
    links.push(link);
  });

  links.forEach(function(link) {
    link.source = nodes[link.source] || (nodes[link.source] = {
      name: link.source,
      image: link.image
    });
    link.target = nodes[link.target] || (nodes[link.target] = {
      name: link.target,
      rank: []
    });
  });
  
  links.forEach(function(link) {
    nodes[link.target.name].rank.push(link.rank);
  });
  vizualization();
});}

getData();
// references-> http://bl.ocks.org/mbostock/4062045 , http://bl.ocks.org/sathomas/11550728 
//https://github.com/mbostock/d3/wiki/Force-Layout