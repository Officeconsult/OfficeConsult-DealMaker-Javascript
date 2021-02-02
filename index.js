var key;


async function loadBase() {
  // load all developers
  allDevelopers = await loadAllDevelopersFromAirTable();
  // parse response and make button for each developer
  sortResponsibleDevelopers("");

  // load up and make a dropdown for all the clients
  allContacts = await loadAllContactsFromAirTable();
  // parse response and make button for each contact
  sortResponsibleContacts("");
}

function setKey() {
  key = $("input.airTablePrivateKey").val();
  document.cookie = "key=" + key;
  loadBase();
}

function showKey() {
  var alertString = "you've have the following key: ";
  alertString += key;
  alert(alertString);
}
