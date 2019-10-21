$(document).ready(function(){
    var socket = io();
    /*$("#addComment").click(function(event){
        var userName = $("#name").val();
        var userComment = $("#comment").val();
        if(userName === "" || userComment === "") {
            alert("Please fill the form.");
            return;
        }
        
    });*/
    //socket.emit('comment added',{user : userName, comment : userComment});
    socket.on('alert fired',function(msg){
        document.getElementById('alert').innerHTML ="<button type=\"button\" class=\"btn btn-danger\" id=\"btn-alert\">Alerta</button>";
        notifyMe(msg.id_ganado, msg.id_zona);
    });
});
function notifyMe(id_ganado, id_zona) {
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
// At last, if the user already denied any notification, and you
// want to be respectful there is no need to bother them any more.
}
