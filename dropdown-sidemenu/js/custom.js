$(function(){
  $(".login").on("click", function(){
    $(".dform").slideToggle();
  });
  $(".hoversect").mouseenter(function(){
    $(this).animate({
      right: "0px"
    });
  });
  $(".hoversect").mouseleave(function(){
    $(this).animate({
      right: "-60px"
    });
  });
});