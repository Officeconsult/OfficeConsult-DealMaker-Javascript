var key;

function setKey() {
    key = $("input.airTablePrivateKey").val();
    var alertString = "you've entered the following key: ";
    alertString += key;
    alert(alertString);

    document.cookie = "key=" + key;
}

function showKey() {
    key = document.cookie;
    var alertString = "you've have the following key: ";
    alertString += key;
    alert(alertString);
}