function range(a, b) {
  var x = [];
  for(var i = a; i<= b; i++){
    x.push(i);
  }
  return x;
}


function sum(arr){
  var args = arr;
  var total = 0;
  for(var i = 0; i < args.length; i++){
    total += args[i];
  }
  return total;
}

sum(range(1, 10));