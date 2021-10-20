var countries = [
  "AU",
  "BR",
  "CA",
  "CH",
  "DE",
  "DK",
  "ES",
  "FI",
  "FR",
  "GB",
  "IE",
  "IR",
  "NO",
  "NL",
  "NZ",
  "TR",
  "US",
];

var formEl = $("form");
var numInputEl = $("#emp_num");
var selectEl = $("#emp_nat");
var containerEl = $("#emp_container");

// build the select (dropdown) options on page load
var init = function () {
  countries.forEach(function (country) {
    var optionEl = $("<option>");
    optionEl.val(country);
    optionEl.text(country);
    selectEl.append(optionEl);
  });
};

// Make the request to the randomUserMe API and build user cards
var makeRequest = function (number, country) {
  var requestUrl = `https://randomuser.me/api/?results=${number}&nat=${country}`;

  $.get(requestUrl).then(function (data) {
    var users = data.results;

    users.forEach(function (user) {
      var userCard = $("<div class='user_card'>");
      var userImg = $("<img>");
      userImg.attr("src", user.picture.large);

      var userInfo = $("<div>");
      var userName = $("<h3>");
      userName.text(`${user.name.first} ${user.name.last}`);

      var userEmail = $("<p>");
      userEmail.text(user.email);

      userInfo.append(userName, userEmail);

      userCard.append(userImg, userInfo);

      containerEl.append(userCard);
    });
  });
};

// When the user submits the form
formEl.on("submit", function (event) {
  event.preventDefault();
  makeRequest(numInputEl.val(), selectEl.val());
});

init();
