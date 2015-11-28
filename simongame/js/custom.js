$(function(){
  
  var game = false;
  
  $(".onoff").on("click", function(){
    $(".on").toggleClass("active");
    $(".off").toggleClass("active");
    $(".on").toggleClass("passive");
    $(".off").toggleClass("passive");
    if(game == true){ game = false;} 
    if(game == false){ game = true; } //game always true
  });

  $(".strict").on("click", function(){
    $(".strictlamb").toggleClass("slamb"); //class not added but click works
  });
  $(".uleft").on("click", function(){
     $(".uleft").addClass("ulbright"); 
     setTimeout(function(){
       $(".uleft").removeClass("ulbright");
     },300);
  });
  $(".uright").on("click", function(){
     $(".uright").addClass("urbright"); 
     setTimeout(function(){
       $(".uright").removeClass("urbright");
     },300);
  });
  $(".bleft").on("click", function(){
     $(".bleft").addClass("blbright"); 
     setTimeout(function(){
       $(".bleft").removeClass("blbright");
     },300);
  });
  $(".bright").on("click", function(){
     $(".bright").addClass("brbright"); 
     setTimeout(function(){
       $(".bright").removeClass("brbright");
     },300);
  });

  
});