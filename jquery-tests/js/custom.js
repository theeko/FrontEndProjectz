$(function(){
  var test = setInterval(function(){
    var color = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
    $("body").css("background-color", color);
  }, 5000);
  
  
  $(".login").on("click", function(){
    $(".dform").slideToggle();
  });
  $(".hoversect").mouseenter(function(){
    $(this).stop().animate({
      right: "0px"
    });
  });
  $(".hoversect").mouseleave(function(){
    $(this).stop().animate({
      right: "-60px"
    });
  });
});