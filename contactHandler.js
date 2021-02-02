var allContacts = [];
var currentResponsibleContactidref;


function responsibleContactSelect(element) {
  currentResponsibleContactidref = element.dataset.contactRef;
  var displayinput = $("input.dropdown-active-display")[0];
  displayinput.value = element.dataset.contactName;
}

function searchResponsibleContacts() {
  var searchElement = $("input.responsible-contact-searchbar")[0];
  sortResponsibleContacts(searchElement.value);
}

function sortResponsibleContacts(sortingKey) {
  var ContactHTML = makeContactList(sortingKey);
  setContactList(ContactHTML);
}

function setContactList(html) {
  var contactDropdown = $("div.contact-dropdown-select")[0];
  contactDropdown.innerHTML = html;
}

function makeContactList(sortingKey) {
  var buttonsHTML = "";
  if (sortingKey == "") {
    allContacts.forEach((element) => {
      buttonsHTML +=
        "<button class='btn dropdown-item' data-contact-ref='" +
        element.id +
        "'data-contact-name='" +
        element.Navn +
        "' onclick='responsibleContactSelect(this)'>" +
        element.Navn +
        "</button>";
    });
  } else {
    var relevantContacts = [];
    allContacts.forEach((element) => {
      if (element.hasOwnProperty("Navn")) {
        if (element.Navn.toLowerCase().includes(sortingKey.toLowerCase())) {
          relevantContacts.push(element);
        }
      }
    });
    relevantContacts.forEach((element) => {
      buttonsHTML +=
        "<button class='btn dropdown-item' data-contact-ref='" +
        element.id +
        "'data-contact-name='" +
        element.Navn +
        "' onclick='responsibleContactSelect(this)'>" +
        element.Navn +
        "</button>";
    });
  }
  return buttonsHTML;
}

async function loadAllContactsFromAirTable() {
  var url = "https://api.airtable.com/v0/appPu05N346JHlDTg/Kontakter";
  var options = {
    headers: {
      Authorization: "Bearer " + key,
    },
  };

  var resp;
  var data = [];
  var hasOffset = true;

  while (hasOffset) {
    await fetch(url, options)
      .then((res) => res.json())
      .then((data) => (resp = data));
    resp.records.forEach((element) => {
      data.push(element.fields);
    });
    if (resp.hasOwnProperty("offset")) {
      var url =
        "https://api.airtable.com/v0/appPu05N346JHlDTg/Kontakter?offset=" +
        resp.offset;
    } else {
      hasOffset = false;
    }
  }
  return data;
}
