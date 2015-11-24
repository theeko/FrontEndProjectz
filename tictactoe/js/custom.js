$(function(){
  var table = [];
  var whichFellasTurn = "human";
  var signOfHuman = "i", signOfNonHuman = "i";
  for(var i = 0; i<9; i++){
      table.push("e");
  }
  function pupUp(){
    var popHtml = "<div class='popup'><p>X XOR O?</p><button class='o'>O</button><button class='x'>X</button></div>";
    $(".playground").append(popHtml);
  };
  pupUp();
  $(".popup").on("click","button",function(e){
    var buttonval = $(this).text();
    makeChoice(buttonval);
    $(".popup").fadeOut(500); 
    drawGrind(); return false; 
    playGame();
  });
  
  function drawGrind(){
    for(var i = 1; i <= 9; i++){
      var phtml = "<div class='pdiv pdiv" + i + "'>e</div>";
        $(".playground").append(phtml).hide();
        $(".playground").fadeIn(500);
      }
  }
  function makeChoice(val){
    if( val == "X"){
      signOfHuman = "X";
      signOfNonHuman = "O";
      console.log(signOfHuman);
    }
    if( val == "O") {
      signOfHuman = "O";
      signOfNonHuman = "X";
      console.log(signOfHuman)
    }
  }
  
  function clearGrid(){
    $(".table").html("<div class='playground'></div>");
  }
  
  function playGame() {
  $("body").on("click", ".pdiv",function(){
      if(true){
        if( $(this).text() == "e"){
          $(this).text(signOfHuman);
        }
      }
    });
  }
  console.log(signOfHuman);
});