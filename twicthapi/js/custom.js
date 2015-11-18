$(function(){
  var apikey = "24e75b084aa0de4b90f0cffc6fe57bcd", lat, lon;
  var streamers = ["freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb",
                    "thomasballinger","noobs2ninjas","beohoff", "medrybw"];

  var x;
  for(var i = 0; i < streamers.length; i++){
    var status, streamer = streamers[i], uhtml, tburl;
    tburl = "https://api.twitch.tv/kraken/streams/" + streamer;
      $.ajax({
        dataType: "json",
        url: tburl,
        success: function(data){
          if( data.stream ){
            status = "online";
          } else { status = "offline"; }
          uhtml = "<div class='user'" + i +"><a href='http://www.twitch.tv/'></a>";
          uhtml += "<p class='status'></p></div>";
          
        },
        method: "GET"
      });
    
    }
    for(var j = 0; j < streamers.length; i++){

      $(".users a").attr("href",streamers[j]);
      $(".users a").text("href",streamers[j]);
    
    }
});

