$(function(){

    var cnurl = "http://www.freecodecamp.com/news/hot/";
    var datar;
    $.ajax({
      dataType: "json",
      url: cnurl,
      success: function(data){
        datar = data;
      },
      method: "GET"
    });
    
    for(var i = 0; i< datar.length; i++){
      var html;
      html = "<div class='user'>< href='" + datar[i].link + "'<img src='" +
      <div class="user">
          <img src="https://avatars.githubusercontent.com/u/15031730">
          <a href="#">asdasdasd asdasd</a>
          <span class="username">asdfds</span><span class=likes>  +3</span>
          <p>Posted on: asdas dsad ds</p>
          </div>
    }
    
    
    
});

