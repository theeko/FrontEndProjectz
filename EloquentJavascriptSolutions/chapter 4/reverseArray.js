function reverseArray(arr){
  var result= [];
  for(var i = arr.length-1;i >=0; i--){
    result.push(arr[i]);
  }
  return result;
}

function reverseArrayInPlace(array){
  for(var i= 0; i<(Math.ceil(array.length/2));i++){
    var rem = array[i];
    array[i] = array[array.length - 1 -i];
    array[array.length -1 -i]= rem;
  }
  return array;
}