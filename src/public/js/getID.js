function getID(selectedOption)
{
    const tableDevicesTemplate = "<tr><th scope=\"row\">{{id_ganado}}</th><td>{{nombre}}</td></tr>\n";
    const template = Handlebars.compile(tableDevicesTemplate);
    
    var theUrl = 'http://localhost:3000/devices/'+selectedOption;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "POST", theUrl, false); // false for synchronous request
    xmlHttp.setRequestHeader('Content-Type', 'application/json');
    xmlHttp.send(null);
    var devices = JSON.stringify(xmlHttp.responseText);

    var filler = template(devices);
    console.log(devices);

    document.getElementById('tu').innerHTML += filler;
}