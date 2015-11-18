$(function(){
  var apikey, lat, lon;
  var streamers = ["freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb","thomasballinger","noobs2ninjas","beohoff"];

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
    $("#test").html("latitude: " + position.coords.latitude + "<br>longitude: " + position.coords.longitude);
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    });
  }
  
  var wurl = "http://api.openweathermap.org/data/2.5/weather?lat=" + 39 + "&lon=" + 32 + "&appid=" + apikey;
  $.ajax({
    method: "GET",
    dataType: "json",
    url: wurl,
    success: function(data){
      $("#test").text(data)
    }
  });
  

});

