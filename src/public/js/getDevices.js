function getID(selectedOption){
    document.forms['submit'].action = "/update/edit/" + selectedOption;
}

/**
 * Get devices associated to a zone (selectedOption) y rellena el select 'idSelect' de la página.
 * 
 * @param {HTMLSelectElement.value} selectedOption 
 */
function getDevices(selectedOption){

    getJSON('http://localhost:3000/devices/'+selectedOption, function(devices) {
        // SuccessHandler

        var out = "";
        out += "<option value=\"0\"selected>Selecciona un dispositivo</option>";   // Establece la opción por default del select
        devices.forEach(device => {                                                 // Recorre el arreglo de dispositivos obtenidos
            out += '<option value='+ device._id + '>'+ device.id_ganado+"</option>"; // y los muestra como opciones en el select
        });
            
        document.getElementById('idSelect').innerHTML = out;                    // Dibuja las opciones.
        document.getElementById('idSelect').removeAttribute('disabled');        // Activa el select
        },function(status) {
            // ErrorHandler
            alert('Something went wrong. Status: ' + status);
    });
}

/**
 * Obtiene un objeto JSON desde el servidor (ruta) especificado via XMLHttpRequest.
 * @param {String} url 
 * @param {function} successHandler 
 * @param {function} errorHandler 
 */
function getJSON(url, successHandler, errorHandler){
    // Crea el objeto de petición
    var xhr = typeof XMLHttpRequest != 'undefined'
        ? new XMLHttpRequest()
        : new ActiveXObject('Microsoft.XMLHTTP');
    // Abre la conexión síncrona con el servidor especificado en la url
    xhr.open('get', url, true);
    // Se establece que la respuesta esperada es un JSON por lo que se tratará la respuesta como tal
    xhr.responseType = 'json';
    // Si la interfaz está cargada se abre el hilo de petición al servidor.
    xhr.onreadystatechange = function(){
        var status;
        var data;
        if (xhr.readyState == 4) {
            status = xhr.status;
            // Si el estatus obtenido es de exito pasa la información al successHandler
            if (status == 200) {
                data = xhr.response;
                successHandler && successHandler(data);
            } else { // De lo contrario lo pasa al errorHandler
                errorHandler && errorHandler(data);
            } 
        }
    };
    // Se envía un status code. No obligatorio.
    xhr.send();
}