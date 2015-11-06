$(document).ready(function () {
	$("button").click(function() {
	  $(this).siblings().removeClass('selected');
	  $(this).toggleClass('selected');
	  $(".changing").remove();
	  var cont = $(".changable");
	  var bid = $(this).attr('id');
	  if( bid === "b1") {
	    cont.append('<img class="changing" src="http://91ef69bade70f992a001-b6054e05bb416c4c4b6f3b0ef3e0f71d.r93.cf3.rackcdn.com/mixed-lettuce-salad-and-tomatoes-100277581.jpg" />');
		} else if ( bid === "b2") {
			cont.append("<p class='changing'>Menu</p>");
		  cont.append("<p class='changing'>Hot Potatos</p>");
	  } else if ( bid === "b3") {
	    cont.append("<p class='changing'>Coming Soon...</p>");
	  }
	  console.log( "event object:" );
    console.dir( event );
	});

});