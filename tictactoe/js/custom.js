$(function(){
var table = [];
  var whichFellasTurn = "human";
  var signOfHuman , signOfNonHuman;
  
  function madeTable() {
    table = [];
    for(var i = 0; i<9; i++){
      table.push("e");
    }
    return table;
  };
  function hideMsg(){
    $(".msg").html(" ")
  }
  
  
  function aiPlay(board){
   if (checkWinner(signOfHuman,board) ) {
     clearGrid();
     playGame();
     $(".msg").show;
     $(".msg").text("You Won !!!");
     $(".msg").fadeOut(2000);
   }
   if (checkTie(board)){
     clearGrid();
     playGame();
     $(".msg").show();
     $(".msg").text("Tie !!!");
     $(".msg").fadeOut(2000);
   }
   var x = findMove(board);
   board[x] = signOfNonHuman;
   console.log(table);
   var y = +x+1;
   $(".pdiv" + y).children("p").text(signOfNonHuman);
     if (checkWinner(signOfNonHuman,board) ) {
     clearGrid();
     playGame();
     $(".msg").show();
     $(".msg").text("AI Won !!!");
     $(".msg").fadeOut(2000);
    }
    whichFellasTurn = "human";
  }
  
  function pupUp(){
    var popHtml = "<div class='popup'><p>X or O</p><button class='o'>O</button><button class='x'>X</button></div>";
    $(".popupfield").append(popHtml);
    
    $(".popup").on("click","button",function(e){
      var buttonval = $(this).text();
      makeChoice(buttonval);
      $(".popupfield").html(""); 
      drawGrind(); 
    });
  }
  
  
  
  function drawGrind(){
    for(var i = 1; i <= 9; i++){
      var phtml = "<div class='pdiv pdiv" + i + "'><p></p></div>";
        $(".playground").append(phtml).hide();
        $(".playground").fadeIn(500);
      }
  }
  function makeChoice(val){
    if( val == "X"){
      signOfHuman = "X";
      signOfNonHuman = "O";
    }
    if( val == "O") {
      signOfHuman = "O";
      signOfNonHuman = "X";
    }
  }
  
  function clearGrid(){
    $(".table").html("<div class='playground'></div>");
  }
  
  function playGame(){
    madeTable();
    pupUp();
    $("body").on("click", ".pdiv",function(){
      var $this = $(this);
      if(whichFellasTurn == "human"){
        if( $(this).children("p").text() != signOfNonHuman && $(this).children("p").text()!= signOfHuman ){
          $this.children("p").text(signOfHuman);
          if($this.hasClass("pdiv1")){ table[0] = signOfHuman }
          if($this.hasClass("pdiv2")){ table[1] = signOfHuman }
          if($this.hasClass("pdiv3")){ table[2] = signOfHuman }
          if($this.hasClass("pdiv4")){ table[3] = signOfHuman }
          if($this.hasClass("pdiv5")){ table[4] = signOfHuman }
          if($this.hasClass("pdiv6")){ table[5] = signOfHuman }
          if($this.hasClass("pdiv7")){ table[6] = signOfHuman }
          if($this.hasClass("pdiv8")){ table[7] = signOfHuman }
          if($this.hasClass("pdiv9")){ table[8] = signOfHuman }
          
          whichFellasTurn = "ai";
          aiPlay(table);
        }
      }
        
      });
  }
  playGame();
    
    function copyGdamnBoard(board){
      return board.slice(0);
    }
    
    function checkWinner(player, board){
      if( (board[0] == player && board[1] == player && board[2] == player) || 
          (board[3] == player && board[4] == player && board[5] == player) ||
          (board[6] == player && board[7] == player && board[8] == player) ||
          (board[0] == player && board[3] == player && board[6] == player) ||
          (board[1] == player && board[4] == player && board[7] == player) ||
          (board[2] == player && board[5] == player && board[8] == player) ||
          (board[0] == player && board[4] == player && board[8] == player) ||
          (board[2] == player && board[4] == player && board[6] == player) ) {
            return true;
          }
      return false;
    }
    
    function checkTie(board){
      for(var i = 0; i<board.length; i++){
        if( board[i] == "e"){
          return false;
        }
      }
      return true;
    }
    
    function makeMove(move, player, board){
      var newBoard = copyGdamnBoard(board);
      if(newBoard[move] == "e" ){
        newBoard[move] = player;
        return newBoard;
      } else {
        return null;
      }
    }
    
    function findMove(board){
      var bestMoveVal = -100;
      var move = 0;
      for (var i = 0; i < board.length; i++) {
        var newBoard = makeMove(i, signOfHuman, board);
        if (!!newBoard ) {
          var predictedMoveValue = maxValue(newBoard);
          if (predictedMoveValue > bestMoveVal) {
            bestMoveVal = predictedMoveValue;
            move = i;
          }
        }
      }
      return board[4] == "e" ? 4 : move;
    }
    
    function minValue(board){
      if( checkWinner(signOfNonHuman, board)){
        return 1;
      } else if( checkWinner(signOfHuman, board)){
        return -1;
      } else if( checkTie(board)){
        return 0;
      } else {
        var bestMoveValue = 100;
        var move = 0;
        for (var i = 0; i < board.length; i++) {
          var newBoard = makeMove(i, signOfNonHuman, board);
          if (newBoard) {
            var predictedMoveValue = maxValue(newBoard);
            if (predictedMoveValue < bestMoveValue) {
              bestMoveValue = predictedMoveValue;
              move = i;
            }
          }
        }
        return bestMoveValue;
      }
    }
      
      function maxValue(board){
      if( checkWinner(signOfHuman, board)){
        return 1;
      } else if( checkWinner(signOfNonHuman, board)){
        return -1;
      } else if( checkTie(board)){
        return 0;
      } else {
        var bestMoveValue = -100;
        var move = 0;
        for (var i = 0; i < board.length; i++) {
          var newBoard = makeMove(i, signOfHuman, board);
          if (newBoard) {
            var predictedMoveValue = minValue(newBoard);
            if (predictedMoveValue > bestMoveValue) {
              bestMoveValue = predictedMoveValue;
              move = i;
            }
          }
        }
        return bestMoveValue;
      }
    }
    
});