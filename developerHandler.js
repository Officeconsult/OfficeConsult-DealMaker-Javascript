var allDevelopers = [];
var currentResponsibleDeveloperidref;


function responsibleDeveloperSelect(element) {
  currentResponsibleDeveloperidref = element.dataset.utviklerRef;
  var displayinput = $("input.dropdown-active-display")[0];
  displayinput.value = element.dataset.utviklerName;
}

function searchResponsibleDevelopers() {
  var searchElement = $("input.responsible-developer-searchbar")[0];
  sortResponsibleDevelopers(searchElement.value);
}

function sortResponsibleDevelopers(sortingKey) {
  var developerHTML = makeDeveloperList(sortingKey);
  setDeveloperList(developerHTML);
}

function setDeveloperList(html) {
  var utviklerDropdown = $("div.utvikler-dropdown-select")[0];
  utviklerDropdown.innerHTML = html;
}

function makeDeveloperList(sortingKey) {
  var buttonsHTML = "";
  if (sortingKey == "") {
    allDevelopers.forEach((element) => {
      buttonsHTML +=
        "<button class='btn dropdown-item' data-utvikler-ref='" +
        element.id +
        "'data-utvikler-name='" +
        element.name +
        "' onclick='responsibleSelect(this)'>" +
        element.name +
        "</button>";
    });
  } else {
    var relevantDevelopers = [];
    allDevelopers.forEach((element) => {
      if (element.name.toLowerCase().includes(sortingKey.toLowerCase())) {
        relevantDevelopers.push(element);
      }
    });
    relevantDevelopers.forEach((element) => {
      buttonsHTML +=
        "<button class='btn dropdown-item' data-utvikler-ref='" +
        element.id +
        "'data-utvikler-name='" +
        element.name +
        "' onclick='responsibleSelect(this)'>" +
        element.name +
        "</button>";
    });
  }
  return buttonsHTML;
}

async function loadAllDevelopersFromAirTable() {
  const url = "https://api.airtable.com/v0/appPu05N346JHlDTg/Utviklere";
  const options = {
    headers: {
      Authorization: "Bearer " + key,
    },
  };
  var resp;
  await fetch(url, options)
    .then((res) => res.json())
    .then((data) => (resp = data));
  var devs = [];
  resp.records.forEach((element) => {
    devs.push(element.fields.Utvikler);
  });
  return devs;
}
