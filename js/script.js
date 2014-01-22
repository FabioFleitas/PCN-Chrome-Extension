$(document).ready(function() {

  function sendRequest(button) {
    // Get courseId and replace all non-alphanumeric characters with space
    var courseId = $(button).val();
    courseId = courseId.replace(/(\W+)/g, ' ');
    console.log(courseId);

    $.ajax({
      type: 'POST',
      url: 'http://localhost:8080/',
      data: { 'course': courseId, 'email': 'cubanfabio@gmail.com'},
      dataType: 'json',
      statusCode: {
        200: function() {
          // Successful entry
          console.log("200: Successful entry");
          $(button).replaceWith("Success!");
        },
        400: function() {
          // Course-submission error
          console.log("400: Course submission error");
          $(button).replaceWith("Unable to add!");
        },
        406: function() {
          // User already was in database
          console.log("406: Course & email already in database");
          $(button).replaceWith("Already submitted!")
        },
        408: function() {
          // Invalid email, prompt to check email in extension options
          console.log("408: Invalid email");
          $(button).replaceWith("Please check Chrome Extension settings. Seems like you added an invalid email.");
        }
      }
    });
  }

  // Checking page title
  if (window.location.href.indexOf("pennintouch.apps.upenn.edu") > -1) {

    // Search for "Course search" in div tag to see if on correct page 
    if ($('div.headerRed').text().indexOf("Course search") != -1) {

      // Get table of courses when searching
      var courseTable = $('table.pitDarkDataTable');
      if (courseTable.length) {
        $(courseTable).children().children().first().append('<th style="font-weight: normal;" align="left">PennCourseNotify by <a href="http://fabiofleitas.com/">Fabio Fleitas</a></th>');
        var courses = courseTable.children().children().next();
        $(courses).each(function() {
          // Check if course is listed Open first
          var status = $(this).find('td:nth-child(6)').text();
          if (status.indexOf("Open") != -1) {
            $(this).append("<td>Already Open</td>");
          }
          else {
            var courseId = $(this).find('span.fastButtonLinkText:first').text();
            $(this).append("<td><button class='notify-button fastGreenButton' value='" + courseId + "'>Notify Me!</button></td>");
          }
        });
      }

      $('button.notify-button').click(function() {
        sendRequest($(this));
      })
    }
  }
});