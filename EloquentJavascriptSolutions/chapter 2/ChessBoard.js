//my solution
var board = ""; 
function chessBoard(val){
  for(var i = 0; i < val; i++){
    for(var j=0; j < val; j++) {
      if((i+j) % 2 === 0) {
        board += "#";
      } else { board += " "; }
    }
    board += "\n";
  }
  console.log(board);
}

chessBoard(8);

//author's solution
var size = 8;

var board = "";

for (var y = 0; y < size; y++) {
  for (var x = 0; x < size; x++) {
    if ((x + y) % 2 == 0)
      board += " ";
    else
      board += "#";
  }
  board += "\n";
}

console.log(board);