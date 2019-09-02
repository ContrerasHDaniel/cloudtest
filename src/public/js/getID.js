
function getID(selectedOption)
{
    const tableDevicesTemplate = document.getElementById('tu').innerHTML;
    
    //var theUrl = 'http://localhost:3000/devices/'+selectedOption;
    //var xmlHttp = new XMLHttpRequest();
    //xmlHttp.open( "POST", theUrl, false); // false for synchronous request
    //xmlHttp.setRequestHeader('Content-Type', 'application/json');
    //xmlHttp.send(null);
    //var devices = xmlHttp.responseText;

    var xmlhttp = new XMLHttpRequest();
    var url = "http://localhost:3000/devices/"+selectedOption;

    xmlhttp.open('GET', url, false);
    xmlhttp.send();
    var devices = JSON.parse(xmlhttp.responseText);

    var out = "";
    var positions = [];

    devices.forEach(device => {
        out += "<tr><th scope ='row'>"+device.id_ganado+"</th><td>"+device.nombre+"</td>\n";        
        positions.unshift(device.position.map(function(position){
            position["id_ganado"] = device.id_ganado;
            return position}));
    });

    document.getElementById('tabDev').innerHTML = out;
    
    updateMap(positions);
}