function arrayToList(arr){
  var list = null;
  for(var i=arr.length-1; i>=0; i--){
    list = { value: arr[i], rest: list };
  }
  return list;
}

arrayToList([1,2,3]);

function listToArray(list){
  var arr = [];
  for(var i = list; i; i = i.rest){
    arr.push(i.value);
  }
  return arr;
}

function prepend(val, list){
  return { value: val, rest: list };
}

function nth(list, n){
  if (!list) { return undefined; }
  else if ( n === 0) { return list.value; }
  return nth(list.rest, n-1);
}
