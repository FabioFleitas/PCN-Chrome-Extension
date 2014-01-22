$(document).ready(function() {
  chrome.storage.local.get('email', function (result) {
    email = result.email;
    $("#email-input").val(email);
  });

  $('form').submit(function (event){
    email = $('#email-input').val();
    chrome.storage.local.set({'email': email});
  });
});