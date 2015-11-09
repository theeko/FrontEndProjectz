function isEven(num){
  if ( num < 0 ) { return isEven(-num); }
  else if(num === 0){
    return true;
  } else if ( num === 1 ) { return false; } 
  return isEven(num - 2);
}

isEven(-2);