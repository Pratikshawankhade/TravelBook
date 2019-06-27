
// Business Logic for AddressBook ---------
function TravelBook() {
  this.records = [],
  this.currentId = 0
}

TravelBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.records.push(contact);
}

TravelBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

TravelBook.prototype.findContact = function(id) {
  for (var i=0; i< this.records.length; i++) {
    if (this.records[i]) {
      if (this.records[i].id == id) {
        return this.records[i];
      }
    }
  };
  return false;
}

TravelBook.prototype.deleteContact = function(id) {
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

// Business Logic for Contacts ---------
function Contact(firstName, lastName, phoneNumber) {
  this.firstName = firstName,
  this.lastName = lastName,
  this.phoneNumber = phoneNumber
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

// User Interface Logic ---------
var travelBook = new TravelBook();

function displayContactDetails(travelBookToDisplay) {
  var recordsList = $("ul#records");
  var htmlForContactInfo = "";
  travelBookToDisplay.records.forEach(function(contact) {
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
  });
recordsList.html(htmlForContactInfo);
};

function showContact(contactId) {
  var contact = travelBook.findContact(contactId);
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  var buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" + contact.id + ">Delete</button>");
}

function attachContactListeners() {
  $("ul#records").on("click", "li", function() {
    showContact(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function() {
    travelBook.deleteContact(this.id);
    $("#show-record").hide();
    displayContactDetails(travelBook);
  });
};

$(document).ready(function() {
  attachContactListeners();
  $("form#new-record").submit(function(event) {
    event.preventDefault();
    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();
    var inputtedPhoneNumber = $("input#new-phone-number").val();
    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input#new-phone-number").val("");
    var newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber);
    travelBook.addContact(newContact);
    displayContactDetails(travelBook);
  })
})
