$(function(){
  var streamers = ["freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb",
                    "thomasballinger","noobs2ninjas","beohoff", "medrybw"];

  var x;
  for(var i = 0; i < streamers.length; i++){
    var status, streamer = streamers[i], tburl;
    tburl = "https://api.twitch.tv/kraken/streams/" + streamer;
      $.ajax({
        dataType: "json",
        url: tburl,
        method: "GET",
        success: function(data){
          var status;
          var uhtml;
          if( data.stream ){
            status = "online";
          } else { status = "offline"; }
          uhtml = "<div class='user" + i +"'><a href='http://www.twitch.tv/" + streamers[i] +"'>" + streamers[i] + "</a>";
          uhtml += "<p class='status'>" + status + "</p></div>";
          $(".users").append(uhtml);
        }
      });
    
    }
});

