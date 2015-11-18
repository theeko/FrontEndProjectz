$(function () {
  $("#tabContainer").tabs({
    show: "fadeIn",
    hide: "fadeOut",
  });
  var hash = location.hash; //if there is a www.blabla.com/blabla#hash part takes is
  if (hash) { //if there is a hash
    $("#tabContainer").tabs("load", hash); //buildin jui command load for loading a tab and second which tab should load
  }
});