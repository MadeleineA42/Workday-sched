// this will ensure that the code isn't run until the browser has finished rendering all the elements
// in the html.

$(document).ready(function () {
  // this is a variable to display the current date and display the current date in the header of the page.
  let currentHour = moment().format('H');
  let currentDateAndTime = moment().format('ddd' + ' ' + 'MMM' + ' ' + 'Do' + ',' + 'YYYY');
  $("#currentDay").text(currentDateAndTime);


  // this function allows the hour blocks to change color based on the current hour 
  function hourBlockColor() {

    $('.time-block').each(function () {
      const blockHour = parseInt(this.id.split('-')[1]);
      $(this).toggleClass('present', blockHour === currentHour);
      $(this).toggleClass('past', blockHour < currentHour);
      $(this).toggleClass('future', blockHour > currentHour)
    });
  }
 
  // event listener for clicks on the save buttons
  // this will allow you to save events to local storage 
  function saveEvent() {
    $('.saveBtn').on('click', function () {
      let key = $(this).parent().attr('id');
      let value = $(this).siblings('.description').val();
      localStorage.setItem(key, value);
    });
  }
  // This code will get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. 
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

