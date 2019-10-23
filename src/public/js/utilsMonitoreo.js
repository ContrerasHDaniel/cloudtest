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
                out+='<tr><td id=\"tag\" value=\"'+ vaca._id +'\">' + vaca._id + '</td><td>'+vaca.alias+'</td><td>'+vaca.battery+'</td>';
            });

            // Se envían las filas al html
            document.getElementById('tabla_vacas').innerHTML = out;
            // Se actualiza el mapa, dibuja las vacas de la zona en el mapa dada su posición
            updateMap(ganado);
        },
        statusCode: {
            500: function (statusCode) {
                alert('Algo salió mal. Código: '+statusCode)
            }
        }
    });
}