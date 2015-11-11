function every(arr,func){
 for(var i = 0; i < arr.length; i++){
   if (!func(arr[i])){
     return false;
    }
  }
 return true;
}

function some(arr, func){
  for(var i = 0; i<arr.length; i++){
    if (func(arr[i])){
      return true;
    }
  }
  return false;
}