
/**
 * Función para obtener los dispositivos asociados a una zona seleccionada
 * @param {string} selectedOption 
 */
function getVacas(selectedOption) {
    // Petición vía AJAX para obtener los dispositivos asociados a la zona
    $.ajax({
        url: "/monitoreo",
        type: "POST",
        data: {zone_id: selectedOption},
        dataType: 'json',
        success: function (ganado) {
            var out = "";
            // Por cada vaca se dibuja una fila en la tabla
            ganado.forEach(vaca => {
                out+='<tr role=\"row\" id=\"'+vaca._id+'\"><td>' + vaca._id + '</td><td id=\"name\">'+vaca.alias+'</td><td><img class=\"battery\" value=\"'+vaca.battery+'\" src=\"'+drawBattery(vaca.battery)+'\"></td>'
                + '<input type=\"hidden\" id=\"lat\" value=\"'+ vaca.position.lat +'\">'
                + '<input type=\"hidden\" id=\"lng\" value=\"'+ vaca.position.lng +'\">';
            });

            // Se envían las filas al html
            document.getElementById('tabla_vacas').innerHTML = out;
            $('#tabla_vacas > tr').click(function (){
                vaca = {_id: $(this).attr('id'), lat: $('#lat').val(), lng: $('#lng').val(), alias: $('#name').text()}
                updateMap(true, vaca);
            });
            // Se actualiza el mapa, dibuja las vacas de la zona en el mapa dada su posición
            updateMap(false, ganado);
        },
        statusCode: {
            500: function (statusCode) {
                alert('Algo salió mal. Código: '+statusCode);
            }
        }
    });
}

/**
 * Asigna una imagen de batería de acuerdo al nivel que recibe (0 - 4)
 * @param {string} batLevel 
 */
function drawBattery(batLevel) {
    var level = "";
    switch (batLevel) {
        case '0':
            level = "/img/battery_0.png";
            break;
    
        case '1':
            level = "/img/battery_1.png";
            break;
        
        case '2':
            level = "/img/battery_2.png";
            break;
        
        case '3':
            level = "/img/battery_3.png";
            break;
        
        default:
            level = "/img/battery_0.png";
            break;
    }

    return level;
}