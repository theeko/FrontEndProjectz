$(function(){

    var cnurl = "http://www.freecodecamp.com/news/hot/";
    var chtml = "";
    var timeconverter = function(n){
      var t = new Date(n) + "";
      return t.slice(4, 15);
    }
    $.ajax({
      dataType: "json",
      url: cnurl,
      success: function(data){
        data = data.filter(function(item, pos) {
          return data.indexOf(item) == pos;
        })
        for(var i = 0; i < data.length; i++){

         chtml += "<div class='user'><a href='http://www.freecodecamp.com/" + data[i].author.username + "' target='_blank'><img src='" + data[i].author.picture + "'/></a>"
         chtml += "<a href='" + data[i].link + "' target='_blank'><p>" + data[i].metaDescription.substr(0,24) + "...</p></a>"
         chtml += "<span>By -" + data[i].author.username + "<span>  +" + data[i].upVotes.length + "</span>"
         chtml += "<p>Posted on: " +  timeconverter(data[i].timePosted) + "</p></div>" 

         $(".users").append(chtml);
       }
      },
      method: "GET"
    });
    
    
});

