$(function(){
  var apikey = "24e75b084aa0de4b90f0cffc6fe57bcd", lat, lon, keeperofdata;
  var streamers = ["freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb","thomasballinger","noobs2ninjas","beohoff"];

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
    $("#test").html("latitude: " + position.coords.latitude + "<br>longitude: " + position.coords.longitude);
    lat = position.coords.latitude.toFixed(3);
    lon = position.coords.longitude.toFixed(3);
    });
  }
  
  var wurl = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + apikey;
  $.ajax({
    method: "GET",
    dataType: "json",
    url: wurl,
    success: function(data){
      keeperofdata = data;
      $(".weath p").text(data.weather[0].description);
      $(".temp p").text(data.main.temp);
      $(".city p").text(data.sys["country"]);
    }
  });
  
});

