$(document).ready(function() {

  function sendRequest(courseId) {
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
        },
        400: function() {
          // Course-submission error
          console.log("400: Course submission error");
        },
        406: function() {
          // User already was in database
          console.log("406: Course & email already in database");
        },
        408: function() {
          // Invalid email, prompt to check email in extension options
          console.log("408: Invalid email");
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
        $(courseTable).children().children().first().append('<th align="left">PennCourseNotify</th>');
        var courses = courseTable.children().children().next();
        $(courses).each(function() {
          var courseId = $(this).find('span.fastButtonLinkText:first').text();
          $(this).append("<td><button class='notify-button' value='" + courseId + "'>Click</button></td>");
        });
      }

      $('button.notify-button').click(function() {
        // Get courseId and replace all non-alphanumeric characters with space
        var courseId = $(this).val();
        courseId = courseId.replace(/(\W+)/g, ' ');

        sendRequest(courseId);
      })
    }
  }
});