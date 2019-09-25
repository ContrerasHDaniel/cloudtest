/**
 * Obtiene el dispositivo asociado a un id de dispositivo (id).
 * @param {HTMLSelectElement.value} id 
 */
function showDetails(id){
    getJSON('http://localhost:3000/devices/'+id, function(device) {
        // SuccessHandler
        var out = "";
        alert('Device name: '+device.nombre);    
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
    xhr.open('post', url, true);
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