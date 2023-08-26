// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

$(document).ready(function () {
  // this is a variable to display the current date
  // TODO: Add code to display the current date in the header of the page.
  let currentHour = moment().format('H');
  let currentDateAndTime = moment().format('ddd' + ' ' + 'MMM' + ' ' + 'Do' + ',' + 'YYYY');
  $("#currentDay").text(currentDateAndTime);
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  // this function allows the hour blocks to change color based on the current hour 
  function hourBlockColor() {

    $('.time-block').each(function () {
      const blockHour = parseInt(this.id.split('-')[1]);
      $(this).toggleClass('present', blockHour === currentHour);
      $(this).toggleClass('past', blockHour < currentHour);
      $(this).toggleClass('future', blockHour > currentHour)
    });
  }
   // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // this will allow you to save events to local storage 
  function saveEvent() {
    $('.saveBtn').on('click', function () {
      let key = $(this).parent().attr('id');
      let value = $(this).siblings('.description').val();
      localStorage.setItem(key, value);
    });
  }
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  function loadEvent() {
  $('.time-block').each(function () {
    const key = $(this).attr('id');
    const value = localStorage.getItem(key);
    $(this).children('.description').val(value);
  });
}

// calls to previous functions 
  hourBlockColor();
  saveEvent();
  loadEvent();

  // this will update the hour blocks accordingly 
  setInterval(hourBlockColor, 60000);
});

