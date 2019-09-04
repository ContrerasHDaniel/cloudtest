function getID(selectedOption){
    document.forms['submit'].action = "/update/edit/" + selectedOption;
}

function getDevices(selectedOption){
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
     out += "<option >Selecciona un dispositivo</option>";
     devices.forEach(device => {
         out += '<option value='+ device._id + '>'+ device.id_ganado+"</option>";
     });

     document.getElementById('idSelect').innerHTML = out;
 }, function(status) {
     alert('Something went wrong.');
 });
}