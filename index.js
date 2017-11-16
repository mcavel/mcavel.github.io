// Get references to the tbody element and button for loading additional results
var $tbody = document.querySelector("tbody");
var $datetimeInput = document.querySelector("#datetime");
var $cityInput = document.querySelector("#city");
var $stateInput = document.querySelector("#state");
var $countryInput = document.querySelector("#country");
var $shapeInput = document.querySelector("#shape");
var $searchBtn = document.querySelector("#search");

// Add an event listener to the $searchButton, call handleSearchButtonClick when clicked
$searchBtn.addEventListener("click", handleSearchButtonClick);

// Set filteredAddresses to addressData initially
var filteredAddresses = dataSet;

// renderTable renders the filteredAddresses to the tbody
function renderTable() {
  $tbody.innerHTML = "";
  for (var i = 0; i < filteredAddresses.length; i++) {
    // Get the current address object and its fields
    var address = filteredAddresses[i];
    var fields = Object.keys(address);
    // Create a new row in the tbody, set the index to be i + startingIndex
    var $row = $tbody.insertRow(i);
    for (var j = 0; j < fields.length; j++) {
      // For every field in the address object, create a new cell and set its inner text to be the current value at the current address's field
      var field = fields[j];
      var $cell = $row.insertCell(j);
      $cell.innerText = address[field];
    }
  }
}

function handleSearchButtonClick() {
  // Format the user's search by removing leading and trailing whitespace, lowercase the string
  var filterState = $stateInput.value.trim().toLowerCase();
  var filterCity = $cityInput.value.trim().toLowerCase();
  var filtercountry = $countryInput.value.trim().toLowerCase();
  var filtershape = $shapeInput.value.trim().toLowerCase();
  var filterdatetime = $datetimeInput.value.trim().toLowerCase();


  // Set filteredAddresses to an array of all addresses who's "state" matches the filter
  filteredAddresses = dataSet.filter(function(address) {
    var addressState = address.state.substring(0, filterState.length).toLowerCase();
    var addressCity = address.city.substring(0, filterCity.length).toLowerCase();
    var addressdatetime = address.datetime.substring(0, filterdatetime.length).toLowerCase();
    var addresscountry = address.country.substring(0, filtercountry.length).toLowerCase();
    var addressshape = address.shape.substring(0, filtershape.length).toLowerCase();
    if (addressState === filterState && addressCity === filterCity && addressdatetime === filterdatetime && addresscountry === filtercountry && addressshape === filtershape) {
      return true;
    }
    return false;
  });
  renderTable();
}

// Render the table for the first time on page load
renderTable();


