// Business Logic for TravelBook ---------
function TravelBook() {
  this.records = [],
  this.currentId = 0
}

TravelBook.prototype.addDetail = function(track) {
  track.id = this.assignId();
  this.records.push(track);
}

TravelBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

TravelBook.prototype.findDetail = function(id) {
  for (var i=0; i< this.records.length; i++) {
    if (this.records[i]) {
      if (this.records[i].id == id) {
        return this.records[i];
      }
    }
  };
  return false;
}

TravelBook.prototype.deleteDetail = function(id) {
  for (var i=0; i< this.records.length; i++) {
    if (this.records[i]) {
      if (this.records[i].id == id) {
        delete this.records[i];
        return true;
      }
    }
  };
  return false;
}

// Business Logic for Records ---------
function Book(cityName, newDescription, newYear) {
  this.cityName = cityName,
  this.newDescription = newDescription,
  this.newYear = newYear
}

Book.prototype.cityName = function() {
  return this.citytName + " " + this.newDescription;
}

// User Interface Logic ---------
var travelBook = new TravelBook();

function displayBookDetails(travelBookToDisplay) {
  var recordsList = $("ul#records");
  var htmlForContactInfo = "";
  travelBookToDisplay.records.forEach(function(track) {
    htmlForContactInfo += "<li id=" + track.id + ">" + track.cityName + " " + track.newDescription + "</li>";
  });
recordsList.html(htmlForContactInfo);
};

function showContact(trackId) {
  var track = travelBook.findDetail(trackId);
  $("#show-record").show();
  $(".city-name").html(track.cityName);
  $(".description").html(track.newDescription);
  $(".year").html(track.newYear);
  var buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" + track.id + ">Delete</button>");
}

function attachContactListeners() {
  $("ul#records").on("click", "li", function() {
    showContact(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function() {
    travelBook.deleteDetail(this.id);
    $("#show-record").hide();
    displayBookDetails(travelBook);
  });
};

$(document).ready(function() {
  attachContactListeners();
  $("form#new-record").submit(function(event) {
    event.preventDefault();
    var inputtedCityName = $("input#new-city-name").val();
    var inputtedDescription = $("input#new-description").val();
    var inputtedYear = $("input#new-year").val();
    $("input#new-city-name").val("");
    $("input#new-description").val("");
    $("input#new-year").val("");
    var newContact = new Book(inputtedCityName, inputtedDescription, inputtedYear);
    travelBook.addDetail(newContact);
    displayBookDetails(travelBook);
  })
})
