$(function(){
   $("#confirm").dialog({
       autoOpen: false,
       modal: true,
       position: {
           my: 'center top', //my refers to dialog box
           at: 'center bottom', //at refers to window
           of: '#actbutton' //of refers to selector
       },
       buttons: {
           "Confirm": function() {
               $("#actdiv p").remove();
               $(this).dialog("close");
           },
            "Cancel": function(){
                $(this).dialog("close");
            }
       }
   }); 
   
   $("#actbutton").on("click", function(){
      $("#confirm").dialog("open");
      
   });
   
});