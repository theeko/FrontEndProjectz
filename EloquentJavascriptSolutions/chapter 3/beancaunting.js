function countChar(str, char){
  if (typeof(str) != "string" || typeof(char) != "string"){
    console.log("use a string");
  }
  var result = 0;
  for(var i= 0; i<str.length; i++){
    if(str.charAt(i) == char){
      result +=1;
    }
  }
  console.log(result);
}