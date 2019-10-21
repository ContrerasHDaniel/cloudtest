/**
 * Obtiene los dispositivos asociados a un id de zona (selectedOption) y los dibuja en una tabla 'tabDev'.
 * @param {HTMLSelectElement.value} selectedOption 
 */
function getID(selectedOption){
    getJSON('http://148.217.94.130/devices/'+selectedOption, function(devices) {
        // SuccessHandler
        var out = "";
        
        devices.forEach(device => { // Se crea una nueva fila por cada dispositivo encontrado.
            out += "<tr><td>"+device.id_ganado+"</td><td>"+device.nombre+"</td><td>"+device.carga+"</td>";
        });
        document.getElementById('tabDev').innerHTML = out; // Se dibujan las filas en la tabla
        updateMap(devices); // Se actualizan los marcadores dentro del mapa
    }, function(status) {
        // ErrorHandler
	    alert('Something went wrong. Status: '+status);
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
		console.log(data);
                errorHandler && errorHandler(data);
            } 
        }
    };
    // Se envía un status code. No obligatorio.
    xhr.send();
}
