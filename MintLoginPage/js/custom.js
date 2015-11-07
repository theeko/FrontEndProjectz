$(document).ready( function(){
  $("#email").focus();
  $("#jvalidatorform").validate({
    rules: {
      user_email: { //name used for identify
        required: true,
        remote: "check_username.json", //checking server for validation
        rangelength:[8,24]
      },
      user_email_confirm: {
        equalTo: "#email"
      },
      user_password: {
        required: true,
        rangelength: [8,20]
      },
      user_password_confirm: {
        equalTo: "#password"
      }
    },
    messages: {
      password: {
        required: "Please type the pass you'd like to use",
        minimumlength: "Your pass must be greater or equal to 8"
      },
      passconfirm: {
        equalTo: "passwords not match"
      }
    },
    //for error messages to appear after checkbox radios
    errorPlacement: function(error, element) {
      if(element.is(":radio") || element.is(":checkbox")) {
        error.appendTo(element.parent);
      } else { error.insertAfter(element); }
    }
  });
});