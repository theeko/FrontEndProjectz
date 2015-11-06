$(function(){
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