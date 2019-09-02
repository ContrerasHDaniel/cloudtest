
function getID(selectedOption){
       //var xmlhttp = new XMLHttpRequest();
    //var url = "http://localhost:3000/devices/"+selectedOption;
    //xmlhttp.open('GET', url);
    //xmlhttp.send();
    //var devices = xmlhttp.response;
    //console.log(devices);

    //var out = "";
    //var positions = [];

    //devices.forEach(device => {
        //out += "<tr><th scope ='row'>"+device.id_ganado+"</th><td>"+device.nombre+"</td>\n";
        //positions.unshift(device.position.map(function(position){
            //position["id_ganado"] = device.id_ganado;
            //return position}));
    //});

    //document.getElementById('tabDev').innerHTML = out;
    
    //updateMap(positions);

    var getJSON = function(url, successHandler, errorHandler){
        var xhr = typeof XMLHttpRequest != 'undefined'
            ? new XMLHttpRequest()
            : new ActiveXObject('Microsoft.XMLHTTP');
        xhr.open('get', url, true);
        xhr.responseType = 'json';
        xhr.onreadystatechange = function(){
            var status;
            var data;
            if (xhr.readyState == 4) {
                status = xhr.status;
                if (status == 200) {
                    data = xhr.response;
                    successHandler && successHandler(data);
                } else {
                    errorHandler && errorHandler(data);
                }
            }
        };
        xhr.send();
    };

    getJSON('http://localhost:3000/devices/'+selectedOption, function(devices) {
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
    }, function(status) {
	    alert('Something went wrong.');
    });
}