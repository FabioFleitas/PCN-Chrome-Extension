$(document).ready(function() {
  // Checking page title
  if (window.location.href.indexOf("pennintouch.apps.upenn.edu") > -1) {
    // Search for "Course search" in div tag to see if on correct page 
    if ($('div.headerRed').text().indexOf("Course search") != -1) {
      // Get table of courses when searching
      var courseTable = $('table.pitDarkDataTable');
      if (courseTable.length) {
        var courses = courseTable.children().children().next();
        $(courses).each(function() {
          var courseId = $(this).find('span.fastButtonLinkText:first').text();
          console.log(courseId);
        });
      }
    }
  }
});