$(document).ready(function(){
    // Inicalización del socket
    var socket = io();
    // Evento de alerta desde el servidor
    socket.on('alert fired', function(msg){

        var d = new Date();
        
        // Se crea la alerta en el botón de notificaciones y se da la información del dispositivo que envió la alerta
        document.getElementById('alert').innerText = "1";
        document.getElementById('alert-msg').innerHTML 
        = '<div class=\"icon-circle bg-warning\">'
        + '<i class=\"fas fa-exclamation-triangle text-white\"></i>'          
        + '</div><div class=\"small text-gray-500\">' + d.toString()
        + '</div> ¡Alerta! El animal ' + msg.id_ganado + ' ha salido del rancho ' + msg.zona;

        // Si existe en la tabla el dispositivo con alerta, colorea de rojo
        // y su estado cambia a desconectado
        if (document.getElementById(msg._id)) {
            updateTable(msg._id);
        }
        // Se envía una notificación de escritorio al usuario
        notifyMe(msg.id_ganado, msg.zona);
    });
});

/**
 * Función para cambiar el estado de un dispositivo en la tabla si se dispara la alerta
 * @param {string} _id 
 */
function updateTable(_id){
    var id = "#"+_id;
    $(id).find('#status').addClass('table-danger').removeClass('table-success');
    $(id).find('#status').html('Desconectado');
}

function notifyMe(id_ganado, zona) {
    // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
    }
    // Let's check if the user is okay to get some notification
    else if (Notification.permission === "granted") {
        // If it's okay let's create a notification
        var options = {
            body: "El animal "+ id_ganado + " se desconectó",
            dir : "ltr"
        };
        var notification = new Notification("Alerta en la zona: " + zona, options);
    }
  
    // Otherwise, we need to ask the user for permission
    // Note, Chrome does not implement the permission static property
    // So we have to check for NOT 'denied' instead of 'default'
    else if (Notification.permission !== 'denied') {
        Notification.requestPermission(function (permission) {
        // Whatever the user answers, we make sure we store the information
        if (!('permission' in Notification)) {
            Notification.permission = permission;
        }
        // If the user is okay, let's create a notification
        if (permission === "granted") {
            var options = {
                body: "El animal "+ id_ganado + " se desconectó",
                dir : "ltr"
            };
            var notification = new Notification("Alerta en la zona: " + id_zona, options);
        }
        });
    }
}