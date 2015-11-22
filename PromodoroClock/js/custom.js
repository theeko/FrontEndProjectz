$(function(){
  function setTime(){
    whichtimer == "w" ? timer = +($(".worktext").text()) : timer = +($(".breaktext").text());
  }
  function setMonitor(){
    var monitor;
    whichtimer == "w" ? monitor = wtimer : monitor = btimer;
    ptext = monitor + ":00" ;
    $(".paltext").text(ptext);
  }
  var whichtimer = "w", timerF = false,seconds = 0;
  var wtimer = 30, btimer = 5, timer;
  var ptext = "";
  setTime();
  var wInt = setInterval(function(){
    if(timerF){
      if( seconds == 0){ timer -= 1; seconds = 60;}
      seconds -= 1;
      if(seconds < 10){ ptext = timer + ":0" + seconds;}
      else {ptext = timer + ":" + seconds;}
      $(".paltext").text(ptext);
      if(timer == 0 && seconds == 0){
        whichtimer == "w" ? whichtimer = "b" : whichtimer = "w";
        setTime();
        whichtimer == "b" ?  $(".timertype").text("Break") : $(".timertype").text("Work");
      }
    }
  }, 1000);
  $(".timerpaltext").text(ptext);
  $(".minuswork").on("click", function(){
    if( wtimer == 1) { return false; }
    wtimer -= 1;
    $(this).siblings("span").text(wtimer);
    setTime();
    setMonitor();
  });
  $(".minusbreak").on("click", function(){
    if( btimer == 1) { return false; }
    btimer -= 1;
    $(this).siblings("span").text(btimer);
    setTime();
    setMonitor();
  });
  $(".pluswork").on("click", function(){
    if( wtimer == 720) { return false; }
    wtimer += 1;
    $(this).siblings("span").text(wtimer);
    setTime();
    setMonitor();
  });
  $(".plusbreak").on("click", function(){
    if( btimer == 720) { return false; }
    btimer += 1;
    $(this).siblings("span").text(btimer);
    setTime();
    setMonitor();
  });
  
  $(".pcounter").on("click", function(){
    timerF == false ? timerF = true : timerF = false;
  });
  
  
});

