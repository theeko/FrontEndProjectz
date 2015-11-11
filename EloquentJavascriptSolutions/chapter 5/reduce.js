function concatArray(arr){
  return arr.reduce(function(a,b){
    return a.concat(b);
  });
}

concatArray([[1,2,3],[4,5]]);