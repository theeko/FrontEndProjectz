$(function(){
    var game = false;
    var turn = 1;
    var player = [];
    var simon = [];
    var strict = false;
    var audio1 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
    var audio2 = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3");
    var audio3 = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3");
    var audio4 = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");
    
  $(".on").on("click", function(){
    $(".on").toggleClass("active");
    $(".off").toggleClass("active");
    $(".on").toggleClass("passive");
    $(".off").toggleClass("passive");
    game = true;
    $(".counter p").text("0");
    simon = [];
    player = [];
    simonification();
  });
  $(".off").on("click", function(){
    $(".on").toggleClass("active");
    $(".off").toggleClass("active");
    $(".on").toggleClass("passive");
    $(".off").toggleClass("passive");
    game = false;
    turn = 1;
    $(".counter p").text("--");
    unbindClicks();
    simon = [];
    player = [];
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
           audio1.play();
           checkGameStatus();
        });
        $(".uright").on("click", function(){
           $(".uright").addClass("urbright"); 
           setTimeout(function(){
             $(".uright").removeClass("urbright");
           },300);
           player.push(2);
           audio2.play();
           checkGameStatus();
        });
        $(".bleft").on("click", function(){
           $(".bleft").addClass("blbright"); 
           setTimeout(function(){
             $(".bleft").removeClass("blbright");
           },300);
           player.push(3);
           audio3.play();
           checkGameStatus();
        });
        $(".bright").on("click", function(){
           $(".bright").addClass("brbright"); 
           setTimeout(function(){
             $(".bright").removeClass("brbright");
           },300);
           player.push(4);
           audio4.play();
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
        if(game){
        setTimeout (function(){
          var num = randomification();
          console.log(num);
          simon.push(num);
          switch(num) {
              case 1:
                  $(".uleft").addClass("ulbright"); 
                    audio1.play();
                   setTimeout(function(){
                     $(".uleft").removeClass("ulbright");
                   },500);
                   
                  break;
              case 2:
                  $(".uright").addClass("urbright"); 
                  audio2.play();
                   setTimeout(function(){
                     $(".uright").removeClass("urbright");
                   },500);
                   
                  break;
              case 3:
                  $(".bleft").addClass("blbright"); 
                  audio3.play();
                   setTimeout(function(){
                     $(".bleft").removeClass("blbright");
                   },500);
                   
                  break;
              case 4:
                  $(".bright").addClass("brbright"); 
                  audio4.play();
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
      }
      loop();
    }
    
    function checkGameStatus(){
      if ( $(this) == $(".on") ||  $(this) == $(".off") ){ return true }
      var x = 0;
      for(var i = 0; i<player.length;i++){
        if( simon[i] == player[i]){
          x += 1;
        }
      }
      if( x == player.length){
        if( player.length == simon.length){
          $(".counter p").text(turn);
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
          $(".counter p").text("0");
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
        if (game){
          var b = setInterval(function(){
            switch(simon[counter]) {
                case 1:
                    $(".uleft").addClass("ulbright"); 
                    audio1.play();
                     setTimeout(function(){
                       $(".uleft").removeClass("ulbright");
                     },500);
                     
                    break;
                case 2:
                    $(".uright").addClass("urbright"); 
                    audio2.play();
                     setTimeout(function(){
                       $(".uright").removeClass("urbright");
                     },500);
                     
                    break;
                case 3:
                    $(".bleft").addClass("blbright"); 
                    audio3.play();
                     setTimeout(function(){
                       $(".bleft").removeClass("blbright");
                     },500);
                     
                    break;
                case 4:
                    $(".bright").addClass("brbright"); 
                    audio4.play();
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
            } else if ( game == false ){
              unbindClicks();
              } else {
              loop();
            }
          }, 2000);
        }
      }
        loop();
    }
    
    
});