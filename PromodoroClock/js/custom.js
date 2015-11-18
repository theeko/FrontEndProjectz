var wtimer = 30, btimer = 5, seconds = 0, whichtimer = "w", timerF = false;
var ptext = "";
var timer;

  var wInt = setInterval(function(){
    if(timerF){
      if( seconds == 0){ wtimer -= 1; seconds = 60;}
      seconds -= 1;
      if(seconds < 10){ ptext = wtimer + ":0" + seconds;}
      else {ptext = wtimer + ":" + seconds;}
      $(".paltext").text(ptext);
      if(wtimer == 0 && seconds == 0){
        wtimer = btimer;
        whichtimer == "w" ? whichtimer = "b" : whichtimer = "w";
        whichtimer == "b" ?  $(".timertype").text("Break") : $(".timertype").text("Work");
      }
    }
  }, 1000);
  
  // var bInt = setInterval(function(){
  //   if(timerF){
  //     if( seconds == 0){ btimer -= 1; seconds = 60;}
  //     seconds -= 1;
  //     if(seconds < 10){ 
  //       ptext = btimer + ":0" + seconds;}
  //     else {ptext = btimer + ":" + seconds;}
      
  //     $(".paltext").text(ptext);
  //     if( btimer == 0 && seconds == 0){
  //       whichtimer = "w";
  //       ptext = wtimer + ":00";
  //       $(".timertype").text("break");
  //       wInt();
  //       clearInterval(bInt);
  //     }
  //   }
  // }, 1000);

$(function(){
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
  
  $(".pcounter").on("click", function(){
    timerF == false ? timerF = true : timerF = false;
  });
  
});

