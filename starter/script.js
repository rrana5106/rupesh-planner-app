// Display the current day at the top of the calender when a user opens the planner.

// Present timeblocks for standard business hours when the user scrolls down.

// Color-code each timeblock based on past, present, and future when the timeblock is viewed.

// Allow a user to enter an event when they click a timeblock

// Save the event in local storage when the save button is clicked in that timeblock.

// Persist events between refreshes of a page

// selecting the container class

const container = $(".container");

// defining the hours in object within Array
const hours = [
  { display: "9AM", value: 9 },
  { display: "10AM", value: 10 },
  { display: "11AM", value: 11 },
  { display: "12PM", value: 12 },
  { display: "1PM", value: 13 },
  { display: "2PM", value: 14 },
  { display: "3PM", value: 15 },
  { display: "4PM", value: 16 },
  { display: "5PM", value: 17 },
];

// current hour, but changing it from strint to number
const currentHour = parseInt(dayjs().format("H"));

const current = dayjs().format("dddd, MMMM DD");

//selecting the currentday
const currentDay = $("#currentDay");
// adding the text
// currentDay.text = today;
// appending the currentDay
currentDay.append(current);

for (let i = 0; i < hours.length; i++) {
  // creating the div element for timeblock
  const divTimeBlock = $("<div>");

  // adding the class
  divTimeBlock.addClass("time-block");
  divTimeBlock.addClass("row");
  //appending the element
  container.append(divTimeBlock);

  // creating the another div for hour
  const divHours = $("<div>");
  //adding the class

  divHours.addClass("hour");
  divHours.addClass("col-sm-1");
  // adding the text
  divHours.text(hours[i].display);
  //appending the element
  divTimeBlock.append(divHours);

  // creating the textarea element
  const textArea = $("<textarea>");
  //setting attributes
  textArea.attr("cols", "20");
  textArea.attr("rows", "3");
  // adding the class
  textArea.addClass("col-sm-10");
  //appending the element
  divTimeBlock.append(textArea);

  // creating the button element
  const saveButton = $("<button>");
  // to generate uniques id everytime it loops
  const saveButtonId = "saveBtn" + (i + 1);
  saveButton.attr("id", saveButtonId);
  // adding the class
  saveButton.addClass("saveBtn");
  saveButton.addClass("btn");
  saveButton.addClass("col-sm-1");

  // appending the button element
  divTimeBlock.append(saveButton);

  //creating the i element
  const icon = $("<i>");
  //adding the class
  icon.addClass("fas");
  icon.addClass("fa-save");
  //appending the element
  saveButton.append(icon);

  // color codint the each time block based on the present futrue and past
  if (hours[i].value < currentHour) {
    divTimeBlock.addClass("past");
  } else if (hours[i].value === currentHour) {
    divTimeBlock.addClass("present");
  } else {
    divTimeBlock.addClass("future");
  }

  // adding the click event to the save button
  saveButton.on("click", function () {
    // getting the text typed by the user in text area
    const eventText = textArea.val();
    // geeting the id of the clicked save button
    const saveBtnId = $(this).attr("id");
    // saving the event text in localStorage with respective id
    localStorage.setItem(saveBtnId, eventText);
  });

  // Restore the saved event text from local storage
  const saveBtnId = "saveBtn" + (i + 1);
  const savedEvent = localStorage.getItem(saveBtnId);
  if (savedEvent) {
    //setting the value of the text area to save the event text
    textArea.val(savedEvent);
  }
}
