$(function(){
  var table = [];
  var whichFellasTurn = "human";
  var signOfHuman, signOfNonHuman;
  for(var i = 0; i<9; i++){
      table.push("e");
  }
  function pupUp(){
    var popHtml = "<div class='popup'><p>X XOR O?</p><button class='o>O</button><button class='x>X</button></div>";
    $("body").append(popHtml);
  };
  pupUp();
  $(".popup").on("click",function(){
    
  });
  
  function drawGrind(){
    for(var i = 1; i <= 9; i++){
      var phtml = "<div class='pdiv" + i + "'></div>";
        $(".playground").append(phtml);
      }
  }
  drawGrind();
  
  function choiceXO(){
    if( ($this).text == "X"){
      signOfHuman = "X";
      signOfNonHuman = "O";
    }
    else{
      signOfHuman = "X";
      signOfNonHuman = "O";
    }
  }
  
  function clearGrid(){
    $(".table").html("<div class='playground'><p></p></div>");
  }
  
  $(".pdiv5").text("O");
  
  $(".table").on("click", function(){
    if(!signOfHuman) { return false };
    if(whichFellasTurn != "ai"){
      if( $(this).text() != "e"){
        
      }
    }
  })
  
});