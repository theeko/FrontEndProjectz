$(function(){
  var streamers = ["freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb",
                    "thomasballinger","noobs2ninjas","beohoff", "medrybw", "comster404"];

  var x;
  $.each(streamers, function (i, item) {
    var uhtml;
    var status;
    $.ajax({
      dataType: "json",
      url: "https://api.twitch.tv/kraken/streams/" + item,
      method: "GET",
      success: function(data){
        if( !!data.stream == false) { status = "offline"; }
        
        uhtml = "<div class='user" + i +"'><a href='http://www.twitch.tv/" + item +"' target='_blank'>" + item + "</a>";
        if( data.stream ){ status = "online"; uhtml += "<span class='streaminfo'>" + data.stream.game + "</span>"} 
        uhtml += "<p class='" +status +"'>" + status + "</p></div>";
        $(".users").append(uhtml);
      }
    });
  });

  $(".buttondiva").on("click", function(){
    $(".users > div").removeClass("hideit");
  });

  $(".buttondivon").on("click", function(){
    $(".users > div").addClass("hideit")
    $(".online").parent("div").removeClass("hideit")
  });

  $(".buttondivof").on("click", function(){
    $(".users > div").addClass("hideit")
     $(".offline").parent("div").removeClass("hideit")
  });

  $(".searchi").on("keydown",function(){
    $tval = $(this).val();
    for(var i=0; i < streamers.length; i++){
      if( $tval.length == 1){ $(".users > div").removeClass("hideit") }
      if ( streamers[i].indexOf($tval) == -1 ){
        $(".user" + i).addClass("hideit");
      }
    }
  })


});

