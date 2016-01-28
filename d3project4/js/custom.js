var dataurl = "http://www.freecodecamp.com/news/hot";
var data = [], links = [], nodes = {};
// d3.json(dataurl, function(error, data) {
//     if(error){ throw error }
//     // vizualization(data);
// });

function getHost(url){ //new refactoring.premature
  var ind = url.indexOf(".");
  var newUrl = url.substr(ind+1);
  var ind2 = newUrl.indexOf(".");
  newUrl = newUrl.substr(0,ind2);
  return newUrl;
}

function getData(){
  d3.json(dataurl,function(err,resultz){
    if(err){ throw err }
    resultz.forEach(function(datum){
    });
  });
}

function vizualization(graph){
  var margin = { top: 10, right: 120, bottom: 80, left: 80 };
  var width = 1160 - margin.left - margin.right, height = 700 - margin.top - margin.bottom;
  
  
  
}
  