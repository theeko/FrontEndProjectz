//my solutions

var i = 0, text = "#";
while(i < 6){
    console.log(text);
    i++;
    text += "#";
}

//author's solution
for (var line = "#"; line.length < 8; line += "#")
  console.log(line);