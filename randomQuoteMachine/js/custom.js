$(function(){
  var test = setInterval(function(){
    var color = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
    $("body").css("background-color", color);
  }, 5000);
  
  var quotes = ["When you point your finger at someone, three fingers are pointing back at you.",
                "No one is listening until you make a mistake.",
                "He who dies with the most toys is, nonetheless, still dead.",
                "It is wise to keep in mind that no success or failure is necessarily final.",
                "Marriage is the most expensive way to get your laundry done for free.",
                "The difference between genius and stupidity is that genius has its limits",
                "Give a man a fire and keep him warm for a day. Light a man on fire and he will be warm for rest of his life.",
                "Only Robinson Crusoe had everything done by Friday."
                ]
  
  $(".qgen").on("click", function(){
    var randomIndex = parseInt(Math.random() * (quotes.length + 1), 10);
    $(".quoteplace p").text(quotes[randomIndex]);
  });
});