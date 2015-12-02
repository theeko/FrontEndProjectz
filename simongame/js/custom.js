$(function(){
    var game = false;
    var turn = 2;
    var player = [];
    var simon = [];
    var strict = false;
  // function gameRun(){
  //       if(game === true){
  //           game = false;
  //           $("uleft").off();
  //           alert(game);
  //       }
  //       if(game === false){ 
  //         game = true; 
  //         bindClicks();
  //       } 
  //   }
    
  $(".on").on("click", function(){
    $(".on").toggleClass("active");
    $(".off").toggleClass("active");
    $(".on").toggleClass("passive");
    $(".off").toggleClass("passive");
    game = true;
    bindClicks();
    simonification();
  });
  $(".off").on("click", function(){
    $(".on").toggleClass("active");
    $(".off").toggleClass("active");
    $(".on").toggleClass("passive");
    $(".off").toggleClass("passive");
    game = false;
    unbindClicks();
  });
  
    function bindClicks(){
        $(".strict").on("click", function(){
          $(".strictlamb").toggleClass("slamb");
          strict = true;
          checkGameStatus();
        });
        $(".uleft").on("click", function(){
           $(".uleft").addClass("ulbright"); 
           setTimeout(function(){
             $(".uleft").removeClass("ulbright");
           },300);
           player.push(1);
           checkGameStatus();
        });
        $(".uright").on("click", function(){
           $(".uright").addClass("urbright"); 
           setTimeout(function(){
             $(".uright").removeClass("urbright");
           },300);
           player.push(2);
           checkGameStatus();
        });
        $(".bleft").on("click", function(){
           $(".bleft").addClass("blbright"); 
           setTimeout(function(){
             $(".bleft").removeClass("blbright");
           },300);
           player.push(3);
           checkGameStatus();
        });
        $(".bright").on("click", function(){
           $(".bright").addClass("brbright"); 
           setTimeout(function(){
             $(".bright").removeClass("brbright");
           },300);
           player.push(4);
           checkGameStatus();
        });
    }
    
    function unbindClicks(){
      $(".uleft").off();
      $(".uright").off();
      $(".bleft").off();
      $(".bright").off();
      $(".strict").off();
    }
    
    
    function Game(){
      simonification();
      $(".uleft").on("click",function(){
        player.push(1);
      });
      $(".uright").on("click",function(){
        player.push(2);
      });
      $(".bleft").on("click",function(){
        player.push(3);
      });
      $(".bright").on("click",function(){
        player.push(4);
      });
      $(".strict").on("click",function(){
        player.push(1);
      });
    }
    
    function randomification(){
      return Math.floor(Math.random() * 4 +1); //random num between 1-4
    }
    
    function simonification(){
      unbindClicks();
      var counter = 0;
      simon = [];
 
      function loop(){
        setTimeout(function(){
          var num = randomification();
          console.log(num);
          simon.push(num);
          switch(num) {
              case 1:
                  $(".uleft").addClass("ulbright"); 
                   setTimeout(function(){
                     $(".uleft").removeClass("ulbright");
                   },500);
                   
                  break;
              case 2:
                  $(".uright").addClass("urbright"); 
                   setTimeout(function(){
                     $(".uright").removeClass("urbright");
                   },500);
                   
                  break;
              case 3:
                  $(".bleft").addClass("blbright"); 
                   setTimeout(function(){
                     $(".bleft").removeClass("blbright");
                   },500);
                   
                  break;
              case 4:
                  $(".bright").addClass("brbright"); 
                   setTimeout(function(){
                     $(".bright").removeClass("brbright");
                   },500);
                   
                  break;
              default:
                 console.log("something wrong");
          }
          counter += 1;
          if (counter == turn){
            bindClicks();
          } else { loop(); }
        }, 2000);
        
      }
      loop();
    }
    
    function checkGameStatus(){
      var x = 0;
      for(var i = 0; i<player.length;i++){
        if( simon[i] == player[i]){
          x += 1;
        }
      }
      if( x == player.length){
        if( player.length == simon.length){
          turn += 1;
          simon = [];
          player = [];
          simonification();
        } else {
        return true;
        }
      } else { 
        if(strict){
          simon = [];
          player = [];
          turn = 1;
          simonification();
        } else {
          player = [];
          resimonification();
        }
      }
    }
    
    function resimonification() {
      unbindClicks();
      var counter = 0;
      function loop(){
        setInterval(function(){
          switch(simon[counter]) {
              case 1:
                  $(".uleft").addClass("ulbright"); 
                   setTimeout(function(){
                     $(".uleft").removeClass("ulbright");
                   },500);
                   
                  break;
              case 2:
                  $(".uright").addClass("urbright"); 
                   setTimeout(function(){
                     $(".uright").removeClass("urbright");
                   },500);
                   
                  break;
              case 3:
                  $(".bleft").addClass("blbright"); 
                   setTimeout(function(){
                     $(".bleft").removeClass("blbright");
                   },500);
                   
                  break;
              case 4:
                  $(".bright").addClass("brbright"); 
                   setTimeout(function(){
                     $(".bright").removeClass("brbright");
                   },500);
                   
                  break;
              default:
                 console.log("something wrong");
          }
          counter += 1;
          if( simon.length == counter){
            bindClicks();
          } else {
            loop();
          }
        }, 2000);
      }
      
        loop();
    }
    
    
    
});