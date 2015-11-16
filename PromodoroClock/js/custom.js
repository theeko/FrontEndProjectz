$(function(){
  var wtimer = 30, btimer = 5, ptext = wtimer + ":00", seconds = 0;
  $(".timerpaltext").text(ptext);
  $(".minuswork").on("click", function(){
    if( wtimer == 1) { return false; }
    wtimer -= 1;
    $(this).siblings("span").text(wtimer);
  });
  $(".minusbreak").on("click", function(){
    if( btimer == 1) { return false; }
    btimer -= 1;
    $(this).siblings("span").text(btimer);
  });
  $(".pluswork").on("click", function(){
    if( wtimer == 720) { return false; }
    wtimer += 1;
    $(this).siblings("span").text(wtimer);
  });
  $(".plusbreak").on("click", function(){
    if( btimer == 720) { return false; }
    btimer += 1;
    $(this).siblings("span").text(btimer);
  });
  
  var timerF = false
  
  $(".pcounter").on("click", function(){
      if( wtimer == 0 && seconds ==0){
        return false;
      }
      
    setInterval(function(){
      if( seconds == 0){ wtimer -= 1; seconds = 61;}
      seconds -= 1;
      if(seconds < 10){ ptext = wtimer + ":0" + seconds;}
      else {ptext = wtimer + ":" + seconds;}
      
      $(".pcounter p").text(ptext);
    }, 1000);
  });
  
});
