var key;

function setKey() {
    key = $("input.airTablePrivateKey").val();
    document.cookie = "key=" + key;
}

async function displayBase(){
    const url = "https://api.airtable.com/v0/appPu05N346JHlDTg/Tilbud";

    const options = {
      headers: {
        Authorization: "Bearer " + key
      }
    };
    
    var resp;
    await fetch(url, options).then( res => resp = res.json());
    console.log(resp);
}

function showKey() {
    key = document.cookie;
    var alertString = "you've have the following key: ";
    alertString += key;
    alert(alertString);
}